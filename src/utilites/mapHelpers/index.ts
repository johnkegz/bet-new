import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import './style.css';
import { roundOff } from '../roundOff';

//Fits map screen to bounds
export const fitBoundsOnMap = (bounds, map) => {
        try {
            map.fitBounds(bounds, { padding: 20 });
        } catch (e) {
            console.log(e)
        }
    }

// Get bounds and return an object of lat, lng, distance
type Bounds = {
            lat: string; 
            lng: string; 
            distance: string;
        }
export const handleGetBounds = (map, turf): Bounds => {
        var center = map.getCenter();
        var bounds = map.getBounds();
        const toDistance: any = [center.lng, center.lat]
        const fromDistance: any = [bounds["_sw"].lng, bounds["_sw"].lat]
        const options: any = {
            units: 'kilometers'
        };
        const distance: any = turf.distance(toDistance, fromDistance, options);
        return {
            lat: center.lat, 
            lng: center.lng, 
            distance: distance
        }
    }

// Get bounds from feature collection to fit bounds
export const handleGetBoundsFromPolygon = (data) => {
        var hull: any = turf.convex(data);
        var line: any = turf.polygonToLine(hull);
        const coordinates: any = line.geometry.coordinates;
        const bounds: any = new mapboxgl.LngLatBounds(
            coordinates[0],
            coordinates[0]
        );
        for (const coord of coordinates) {
            bounds.extend(coord);
        }
        return bounds
    }

//Displays plots inform of layers for each plot
export const displayPlots = (data, map) => {
        for (let i of data) {
            try {
                map.addSource(i.id.toString(), {
                    type: "geojson",
                    data: i.polygon,
                })
                map.addLayer({
                    "id": i.id.toString(),
                    "type": "fill",
                    'paint': {
                        'fill-color': 'rgba(235, 137, 104, 0.5)',
                    },
                    "source": i.id.toString(),
                });
            } catch (e) {
                console.log(e)
            }
        }
    }

//Loads Plots
export const loadPlots = (plotsData: any, map, plotsJsonData, turf, mapboxgl, editType, handleGetPlotSummary, displayPlots) => {
        try {
            let result: any = plotsData;
            let res = result.map(i => i.id.toString());
            for (let x in map.getStyle().sources) {
                if (!res.includes(x) && !['composite', 'mapbox-gl-draw-hot', 'mapbox-gl-draw-cold', 'polygon2', 'plotClusters'].includes(x)) {
                    map.removeLayer(x)
                    map.removeSource(x)
                }
            }
            if (result && result.length !== 0) {
                const featureCollection: any = plotsJsonData(result)
                var hull: any = turf.convex(featureCollection); 
                var line: any = turf.polygonToLine(hull);
                const coordinates: any = line.geometry.coordinates;
                // Create a 'LngLatBounds' with both corners at the first coordinate.
                const bounds: any = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);
                // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
                for (const coord of coordinates) {
                    bounds.extend(coord);
                }
                
                // if(!editType) fitBoundsOnMap(bounds, map);
                displayPlots(result, map);
            }
            else {
                
                for (let x in map.getStyle().sources) {
                    if (!['composite', 'mapbox-gl-draw-hot', 'mapbox-gl-draw-cold', 'polygon2', 'plotClusters'].includes(x)) {
                        map.removeLayer(x)
                        map.removeSource(x)
                    }
                }
            }
            if (handleGetPlotSummary) {
                for (let x in map.getStyle().sources) {
                    if (x !== 'composite') {
                        map.on('click', x, function (e) {
                            handleGetPlotSummary(e.features[0].layer.id)
                        });
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

//Generate color code
export const generateColorCodes = (colors, status = false) => Object.keys(colors).map(item => [item, status? 'yellow' :colors[item]])

//Loads Plots v2
export const loadPlotsV2 = (plotsData: any, map, handleOnClick, column,polygonColors, borderColors, labelColors, checkedLayer, highlighted): void => {      
        try {
            // const polygonColorCodes = !checkedLayer.polygonColor? []: generateColorCodes(polygonColors);
            const borderColorCodes = !checkedLayer.polygonBorderColor? []: generateColorCodes(borderColors)
            const labelColorCodes = generateColorCodes(labelColors)

            let polygonColorCodes = [];
            if(!highlighted){
                polygonColorCodes = !checkedLayer.polygonColor? []: generateColorCodes(polygonColors)
            }

            if (map.getLayer('plotLabels')) {
                map.removeLayer('plotLabels');
            }

            removeLayerAndSource('plotsV2', ['plotsV2',], map)
            map.addSource('plotsV2', {
                'type': 'geojson',
                'data': plotsData,
            });

            map.addLayer({
                'id': 'plotsV2',
                'type': 'fill',
                'source': 'plotsV2',
                'paint': {
                    'fill-color': [
                    'match',
                    ['get', column],
                    ...polygonColorCodes.length ===0 ? ["default", 'rgba(235, 137, 104, 0.5)']:polygonColorCodes.flat(),
                    'rgba(235, 137, 104, 0.5)'
                ],
                'fill-outline-color': [
                    'match',
                    ['get', column],
                    ...borderColorCodes.length ===0 ? ["default", 'rgba(235, 137, 104, 0.5)']:borderColorCodes.flat(),
                    'rgba(235, 137, 104, 0.5)'
                ],
            }
        });

        
        if(!checkedLayer.polygonLabel) {
            if (map.getLayer('plotLabels')) {
                map.removeLayer('plotLabels');
            }
        }
        else{
            map.addLayer({
                    id: 'plotLabels',
                    type: 'symbol',
                    source: 'plotsV2',
                    layout: {
                        'text-field': ['get', column],
                        'text-size': 10,
                        'text-offset': [0, 0],
                    },
                    paint: {
                        'text-color': [
                        'match',
                        ['get', column], 
                        ...labelColorCodes.length ===0 ? ["default", 'black']:labelColorCodes.flat(), 'black'
                    ],       
                    },
                });
        }

    map.on('mouseenter', 'plotsV2', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const properties = e.features[0].properties;
        const popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<div>
                <div style="display: flex">
                    <strong class="property">Id</strong>: <div class="property"> ${properties.id}</div>
                </div>
                <div style="display: flex">
                    <strong class="property">Name</strong>: <div class="property"> ${properties.plotName}</div>
                </div>
                <div style="display: flex">
                    <strong class="property">Village</strong>: <div class="property"> ${properties.plotVillage || ''}</div>
                </div>
                <div style="display: flex">
                    <strong class="property">District</strong>: <div class="property"> ${properties.plotDistrict || ''}</div>
                </div>
                <div style="display: flex">
                    <strong class="property">External Id</strong>: <div class="property"> ${properties.externalId || ''}</div>
                </div>
                <div style="display: flex">
                    <strong class="property">Area</strong>: <div class="property"> ${properties.area || ''}</div>
                </div>
                <div style="display: flex">
                    <strong class="property">Status</strong>: <div class="property"> ${properties.status}</div>
                </div>
                <div style="display: flex">
                    <strong class="property">Owner</strong>: <div class="property"> ${properties.username || ''}</div>
                </div>
                <div style="display: flex">
                    <strong class="property">Note</strong>: <div class="property"> ${properties?.plotNote?.length > 10?`${properties?.plotNote?.slice(0, 10)}...`: properties?.plotNote || ''}</div>
                </div>
                <div style="display: flex">
                    <strong class="property">Lables</strong>: <div class="property"> ${properties.plotLabels || ''}</div>
                </div>
            </div>`)
            .addTo(map);
        
        // Remove the popup when the mouse leaves the feature
        map.on('mouseleave', 'plotsV2', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });


            map.on('click', 'plotsV2', handleOnClick);
            const bounds = handleGetBoundsFromPolygon(plotsData)
            fitBoundsOnMap(bounds, map);

        } catch (e) {
            console.log(e)
        }
    }
//Loads Plots v2
export const loadPlotsV3 = (plotsData: any, map): void => {      
        try {
            
            removeLayerAndSource('plotsV3', ['plotsV3',], map)
            map.addSource('plotsV3', {
                'type': 'geojson',
                'data': plotsData,
            });

            map.addLayer({
                'id': 'plotsV3',
                'type': 'fill',
                'source': 'plotsV3',
                'paint': {
                    'fill-color': 'red'
            }
        });
    }
    catch(e){

    }
}

// Removes source and layers 
export const removeLayerAndSource = (source: string, layers: string[], map): void => {
        const currentSource = map.getSource(source);
        if (currentSource) {
            layers.forEach((item) => map.removeLayer(item))
            map.removeSource(source)
        }
    }

//Create polygon for edit or from geo coordinates
export const createArea = (Draw, turf, handleCapture, handleNotification) => {
        const data = Draw.getAll();
        const selectedPolygon = Draw.getSelected()
        if (data.features[0].id && !selectedPolygon.features[0]){
            const area = turf.area(data);
            const hactares = area * 0.0001
            const rounded_area = Math.ceil(Math.round(hactares * 100) / 100);
            handleCapture(data.features[0].id, data.features[0].geometry.coordinates, rounded_area)
        }
        if (data.features.length > 0) {
            //
        } else {
            handleNotification("Plot created", 'error')
        }
    }

//Clears markers
export const clearMarkers = (markers, setMarkers) => {
        markers.forEach((marker) => marker.remove());
        setMarkers([])
    }

//Generate Feature collection
export const plotsFeatureCollection = (response) => {
        const result = [];
        response.forEach(item => {
            const {  cluster_id, polygon, plotAdditionalData, ...properties} = item;
            result.push({
                type: "Feature",
                properties: {...properties, area: roundOff(properties.area/10000, 3).toString(), id: properties.id.toString(), plotType: plotAdditionalData && Object.keys(plotAdditionalData).filter(item => ['production', 'conservation','management_unit'].includes(item))[0]},
                geometry: {
                    type: "Polygon",
                    coordinates: item.polygon.coordinates
                }
            })
        })
    const res = {
        type: "FeatureCollection",
        name: "plots",
        crs: {
            type: "plots",
            properties: {
                name: "EPSG:4326"
            }
        },
        features: result
    }
    return res
}

//Set map width to trigger map resizing
export const upddateWidthForResizing = (mapContainerRef, setWidth) => {
        let updateWidth = setInterval(()=> {
            if(mapContainerRef && mapContainerRef.current){
                setWidth(mapContainerRef.current.offsetWidth)
            }
          if (mapContainerRef && mapContainerRef.current && mapContainerRef.current.offsetWidth !== 0) {
              clearInterval(updateWidth);
            }
      }, 100);
}

//Resize map
export const resizeMap = (map) => {
        try {
            map.resize()
        } catch (e){
            console.log(e)
        }
}

//Add Zones
export const addZones = (zones, turf, mapboxgl, allMarkers, setZoneMarkers, map) => {
            try {
                zones.length !== 0 && zones.map((zone) => {
            const currentSource = map.getSource('zone-'+zone.features[0].properties.id);
            if (!currentSource) {
                    const type = zone.features[0].properties.subType
                    map.addSource('zone-'+zone.features[0].properties.id, {
                        type: 'geojson',
                        data: zone,
                    });
                    map.addLayer({
                        id: 'zone-'+zone.features[0].properties.id,
                        type: 'fill',
                        source: 'zone-'+zone.features[0].properties.id,
                        paint: {
                            'fill-color':
                                type === 'no_go_zone'
                                    ? '#ff0000'
                                    : 'green',
                            'fill-opacity': 0.5,
                        },
                    });
                    //Center
                    const center: any = turf.center(zone.features[0]).geometry.coordinates;
                    const newMarker = new mapboxgl.Marker({ "color": type === 'no_go_zone'
                                    ? '#ff0000'
                                    : 'green' })
                            .setLngLat(center)
                            .addTo(map);
                    allMarkers.push(newMarker);
                    setZoneMarkers(allMarkers);
                }
                });
            } catch (e) {
                console.log(e)
            }
    }

//Fetch Plots or clusters
type FetchProps = {
    map: any;
    handleSetVisibleMapSection: (lat: string, lng: string, distance: string) => void;
    mapLikedWithSelectedRows: boolean;
    handleFilterPlotsBySelectedProjects: (lat: string | null, 
        lng: string | null, 
        distance: string | null,
        getClustered: boolean) => void;
    handelfilterClusteredPlots: (lat: string, lng: string, distance: string, getClustered: boolean) => void;
    options: Bounds
}

export const fetchPlotsOrClusters = (data: FetchProps) => {
    const {
        map, 
        handleSetVisibleMapSection, 
        mapLikedWithSelectedRows, 
        handleFilterPlotsBySelectedProjects,
        handelfilterClusteredPlots,
        options
    } = data
    const lat = options.lat.toString()
    const lng = options.lng.toString()
    let distance = options.distance.toString()
    if(+distance < 2) distance = '100'
    
    handleSetVisibleMapSection(lat, lng, distance);
    let getClustered = true;
    const zoom = map.getZoom();
    if(zoom > 10){
        getClustered = false
        removeLayerAndSource('plotClusters', ['plotClusters', 'plot-count'], map); 
    }
    if(mapLikedWithSelectedRows){
        handleFilterPlotsBySelectedProjects && handleFilterPlotsBySelectedProjects(lat, lng, distance, getClustered)
    }
    else{
        handelfilterClusteredPlots && handelfilterClusteredPlots(lat, lng, distance, getClustered);
    }
}

//Display errors when uploading polygons on the map
export const displayErrors = (data, map) => {
    try {
        let featuresN = [];
        Object.keys(data).forEach((key) => {
            featuresN = [
                ...featuresN,
                ...data[key].map((item) => item.feature),
            ];
        });

        removeLayerAndSource('error', ['error'], map);
        removeLayerAndSource('plotsUpdate', ['plotsUpdate'], map);
        map.addSource('error', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: featuresN,
            },
        });

        map.addLayer({
            id: 'error',
            type: 'fill',
            source: 'error',
            paint: {
                'fill-color': 'red',
                'fill-opacity': 0.4,
                'fill-outline-color': 'red',
            },
            filter: ['==', '$type', 'Polygon'],
        });
    } catch (e) {
        console.log(e);
    }
};

//Display polygons when uploading
export const displayPolygons = (data, map) => {
    try {
        removeLayerAndSource('plotsUpdate', ['plotsUpdate'], map);
        map.addSource('plotsUpdate', {
            type: 'geojson',
            data: data,
        });

        map.addLayer({
            id: 'plotsUpdate',
            type: 'fill',
            source: 'plotsUpdate',
            paint: {
                'fill-color': 'blue',
                'fill-opacity': 0.4,
            },
            filter: ['==', '$type', 'Polygon'],
        });

        var hull: any = turf.convex(data);
        var line: any = turf.polygonToLine(hull);
        const coordinates: any = line.geometry.coordinates;
        // Create a 'LngLatBounds' with both corners at the first coordinate.
        const bounds: any = new mapboxgl.LngLatBounds(
            coordinates[0],
            coordinates[0]
        );
        // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
        for (const coord of coordinates) {
            bounds.extend(coord);
        }
        fitBoundsOnMap(bounds, map);
    } catch (e) {
        console.log(e);
    }
};

//Display successfull and unsuccessly uploaded polygons
export const displayPlotsSuccessfullyUpdated = (data, map) => {
    try {
        let featuresN2 = data.map((item) => item.feature);
        removeLayerAndSource(
            'successfullyUpdated',
            ['successfullyUpdated'],
            map
        );
        removeLayerAndSource('plotsUpdate', ['plotsUpdate'], map);
        map.addSource('successfullyUpdated', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: featuresN2,
            },
        });

        map.addLayer({
            id: 'successfullyUpdated',
            type: 'fill',
            source: 'successfullyUpdated',
            paint: {
                'fill-color': 'green',
                'fill-opacity': 0.4,
                'fill-outline-color': 'yellow',
            },
            filter: ['==', '$type', 'Polygon'],
        });
    } catch (e) {
        console.log(e);
    }
};
// //Paint plot polygon
// export const paintPlotPolygons = () => ({
//     'fill-color': [
//         'match',
//         ['get', 'status'], 
//         'recorded', plotColorCodes.recorded,
//         'verified_tpi', plotColorCodes.verified_tpi, 
//         'verified_treeo', plotColorCodes.verified_treeo,
//         'prepared', plotColorCodes.prepared,
//         'planted', plotColorCodes.planted,
//         'closed', plotColorCodes.closed,
//         'cancelled', plotColorCodes.cancelled,
//         'rejected', plotColorCodes.rejected,
//         plotColorCodes.default
//     ],
//     // 'fill-outline-color': 'black'
// });
