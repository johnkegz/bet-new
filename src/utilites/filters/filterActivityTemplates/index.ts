import { useDispatch } from "react-redux";

export const useFilterActivityTemplates = () => {
    const dispatch = useDispatch();
    const callBack = (page) =>{
        let templeteFilterData: any = ""
        templeteFilterData += `&page=${page}`;
        dispatch.activityTemplates.filterActivityTemplate({
            onSuccess: () => {
            },
            onError: () => {
            },
            data: templeteFilterData
        })
    }

    return callBack;
};
