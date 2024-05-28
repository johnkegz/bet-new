import { useDispatch } from 'react-redux';
import tokml from 'tokml';
import * as shpwrite from '@mapbox/shp-write';
import { download,  plotsCSVData, plotsJsonData } from '../download';

export const downloadShapeFile = async (shapeFileURL) => {
    try {
        window.open(shapeFileURL, '_blank');
    } catch (error) {
        console.error('Error opening the file:', error.message);
    }
};

function createGeoJSON(response) {
    return {
        type: "FeatureCollection",
        features: response.map(item => ({
            type: "Feature",
            geometry: item.polygon,
            properties: {
                id: item.id,
                area: item.area,
                externalId: item.externalId,
                status: item.status,
                plotName: item.plotName,
                plotLabels: item.plotLabels,
                plotNote: item.plotNote,
                plotVillage: item.plotVillage,
                plotDistrict: item.plotDistrict,
                plotAdditionalData: item.plotAdditionalData,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                owner: item.owner?.firstName + ' ' + item.owner?.lastName,
                activity: item.activity
            }
        }))
    };
}

export const useExportPlotsData = () => {
    const dispatch = useDispatch();

    const convertToKMLAndDownload = (geoJson) => {
        try {
            if (!geoJson || typeof geoJson !== 'object') {
                throw new Error('Invalid GeoJSON data');
            }
    
            const kmlData = tokml(geoJson);
            const blob = new Blob([kmlData], { type: 'application/vnd.google-earth.kml+xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'plot.kml';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error converting to KML:', error.message);
        }
    };

    const convertToShapefileAndDownload = async (geoJson) => {
        try {
            if (!geoJson || typeof geoJson !== 'object') {
                throw new Error('Invalid GeoJSON data');
            }

            const options: any = { 
                folder: 'plots',
                types: {
                    point: 'points',
                    polygon: 'polygons',
                    polyline: 'lines',
                },
                compression: 'STORE' as any,
                outputType: 'blob',
            };

            const blob = await shpwrite.zip<"blob">(geoJson, options);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'plots_shapefile.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error converting to Shapefile:', error.message);
        }
    };

    
    
    const callback = (exportFormat, setIsExporting, handleNotification) => {
        setIsExporting(true);
        dispatch.plots.getPlotsExportIds({
            onSuccess: (res) => {
                dispatch.plots.getPlotsDetails({
                    onSuccess: (response) => {
                        setIsExporting(false);
                        try {
                            let convertedData;
                            if (response && response.length !== 0) {
                                switch (exportFormat) {
                                    case 'kml':
                                        convertedData = createGeoJSON(response);
                                        convertToKMLAndDownload(convertedData);
                                        break;
                                    case 'GeoJSON':
                                        convertedData = plotsJsonData(response);
                                        download(convertedData, exportFormat);
                                        break;
                                    case 'csv':
                                        convertedData = plotsCSVData(response);
                                        download(convertedData, exportFormat);
                                        break;
                                    case 'shapefile':
                                        convertedData = createGeoJSON(response);
                                        convertToShapefileAndDownload(convertedData);
                                        break;
                                    default:
                                        convertedData = plotsJsonData(response);
                                        download(convertedData, exportFormat);
                                }
                            }
                        } catch (e) {
                            setIsExporting(false);
                            handleNotification(e, 'error');
                        }
                    },
                    onError: (e) => {
                        setIsExporting(false);
                        handleNotification(e, 'error');
                    },
                    ids: res.join(','),
                });
            },
            onError: (e) => {
                setIsExporting(false);
                handleNotification(e, 'error');
            },
        });
    };
    return callback;
};
