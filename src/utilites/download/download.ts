const download = (data, format) => {
    let downloadData;
    switch (format) {
        case 'GeoJSON':
            downloadData = `data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(data, null, 2)
            )}`;
            break;
        case 'csv':
            downloadData = `data:text/csv;charset=utf-8,${encodeURIComponent(data.map(e => e.join(",")).join("\n"))}`;
            break;
        default:
            downloadData = `data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(data, null, 2)
            )}`;
    }
    const link = document.createElement("a");
    link.href = downloadData;
    link.download = `plots.${format === "GeoJSON" ? 'geojson' : format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadData);
};

export default download;
