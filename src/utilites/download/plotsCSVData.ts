const plotsCSVData = (response) => {
    const result = [];
    const additionalDataKeys = new Set<string>();

    response.forEach(item => {
        const additionalData = item.plotAdditionalData || {};
        Object.keys(additionalData).forEach(key => additionalDataKeys.add(key));
    });

    result.push([
        "Plot ID",
        "Farmer Village",
        "Farmer District",
        "Farmer Username",
        "Farmer Surname",
        "Farmer Phone",
        "Farmer Email",
        "Farmer Country",
        "Plot Name",
        "Plot Labels",
        "Plot Status",
        "Plot Note",
        "Plot Area",
        "Plot ExternalId",
        "Land Survey Date",
        "Land Survey Performed By",
        "Land Survey Labels",
        "Land Survey Note",
        ...[...additionalDataKeys],
    ]);

    response.forEach(item => {
        let timeStamp = item.activity[0] ? new Date(item.activity[0].endDate) : null;
        let newDate = timeStamp ? `${timeStamp.getFullYear()}-${timeStamp.getMonth() + 1}-${timeStamp.getDate()}` : null;

        const additionalData = item.plotAdditionalData || {};
        
        const rowData = [
            item.id,
            item.plotVillage,
            item.plotDistrict,
            item.owner?.userName,
            item.owner?.surname,
            item.owner?.phoneNumber,
            item.owner?.email,
            item.owner?.country,
            item.plotName,
            item.plotLabels && `"${item.plotLabels.join(',')}"`,
            item.status,
            item.plotNote && `"${item.plotNote.replace("\n", " ").split(',').join(',')}"`,
            item.area,
            item.externalId,
            newDate,
            item.activity[0] && item.activity[0]?.perfomedBy && item.activity[0]?.perfomedBy?.username,
            item.activity[0] && item.activity[0]?.labels && `"${item.activity[0]?.labels.join(',')}"`,
            item.activity[0] && item.activity[0]?.note && `"${item.activity[0]?.note.replace("\n", " ").split(',').join(',')}"`
        ];

        [...additionalDataKeys].forEach(key => rowData.push(additionalData[key] || ""));

        result.push(rowData);
    });

    return result;
};

export default plotsCSVData;
