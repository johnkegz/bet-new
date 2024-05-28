export const generateGeoPaths = (data)  => {
        return data.map(item => ({ lat: item[0], lng: item[1] }))
    };
