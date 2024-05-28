export const zoneFeatureCollections = (data) =>
    data.map((item) => ({
        type: 'FeatureCollection',
        name: item.zoneProject.name,
        features: [
            {
                type: 'Feature',
                properties: {
                    id: item.id,
                    subType: item.subType,
                    type: item.type
                },
                geometry: {
                    type: 'MultiPolygon',
                    coordinates: item.polygon.coordinates,
                },
            },
        ],
    }));
