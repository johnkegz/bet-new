const plotsJsonData = (response, addItem = null) => {
    const result = [];

    response.forEach(item => {

        let newPostQuestionnaireData = {};
        let newPreQuestionnaireData = {};
        let data = {};

        if (item.activity && item.activity.length && item.activity[0].postQuestionnaireData) {
            const postData = JSON.parse(item.activity[0].postQuestionnaireData);
            for (let i in postData) {
                newPostQuestionnaireData[`Land_Survey_PostQ_${i}`] = postData[i];
            }
        }

        if (item.activity && item.activity.length && item.activity[0].preQuestionnaireData) {
            const preData = JSON.parse(item.activity[0].preQuestionnaireData);
            for (let i in preData) {
                newPreQuestionnaireData[`Land_Survey_PreQ_${i}`] = preData[i];
            }
        }

        if (addItem) {
            data['item'] = item;
        }

        let timeStamp = item.activity && item.activity[0] ? new Date(item.activity[0].endDate) : null;
        let newDate = item.activity && item.activity[0] ? `${timeStamp.getFullYear()}-${timeStamp.getMonth() + 1}-${timeStamp.getDate()}` : null;

        const additionalData = item.plotAdditionalData || {};

        const properties = {
            Farmer_Village: item.plotVillage,
            Farmer_District: item.plotDistrict,
            Farmer_Username: item.owner && item.owner.userName,
            Farmer_Surname: item.owner && item.owner.surname,
            Farmer_Phone: item.owner && item.owner.phoneNumber,
            Farmer_Email: item.owner && item.owner.email,
            Farmer_Country: item.owner && item.owner.country,
            Plot_Name: item.plotName,
            Plot_Labels: item.plotLabels,
            Plot_Status: item.status,
            Plot_Note: item.plotNote,
            Plot_Area: item.area,
            Plot_ExternalId: item.externalId,
            Plot_ID: item.id,
            Land_Survey_Date: newDate,
            Land_Survey_Performed_By: item.activity && item.activity[0] && item.activity[0]?.perfomedBy?.username,
            Land_Survey_Labels: item.activity && item.activity[0] && item.activity[0]?.labels,
            Land_Survey_Note: item.activity && item.activity[0] && item.activity[0]?.note,
            ...newPostQuestionnaireData,
            ...newPreQuestionnaireData,
            ...data,
            ...additionalData
        };

        result.push({
            type: "Feature",
            properties: properties,
            geometry: {
                type: "Polygon",
                coordinates: item.polygon.coordinates
            }
        });
    });

    const res = {
        type: "FeatureCollection",
        name: "export plots",
        crs: {
            type: "name",
            properties: {
                name: "EPSG:4326"
            }
        },
        features: result
    };

    return res;
};

export default plotsJsonData;
