import { ReactElement } from "react";

export const createSidebarTableData = (key: string | ReactElement, value: any) => {
    return [key, value];
};

export const createData = (parameter: string | ReactElement, value: any) => {
    return { parameter, value }
}

export const generateAnswersArray = (data) => {
    let result = JSON.parse(data);
    if (result && Object.keys(result).length !== 0) {
        let finalData = Object.keys(result).map((key) => createData(
            key, result[key],
        ));
        return finalData;
    }
    return [];
};
