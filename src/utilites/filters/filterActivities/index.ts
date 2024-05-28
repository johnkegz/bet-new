import { Dispatch, SetStateAction } from "react";
import { switchGlobalAvailableChipDispatches } from "../switchGlobalAvailableChipDispatches";
import { generateUrlWthSearchParams } from "../../generateUrlWthSearchParams";

interface HandlefilterActivitiesProps {
    filters: any;
    dispatch: any;
    setIsGettingActivties: Dispatch<SetStateAction<boolean>>;
    page: number;
    handleAfterFilter: (arg: boolean) => boolean;
    setIsfiltering?: Dispatch<SetStateAction<boolean>>;
    availableChips?: any;
    setRefreshFilter?: Dispatch<SetStateAction<boolean>>;
    checked?: any;
    router?: any;
}

export const handlefilterActivities = ({
    filters,
    dispatch,
    setIsGettingActivties,
    page,
    handleAfterFilter,
    setIsfiltering,
    setRefreshFilter,
    availableChips,
    checked,
    router
}: HandlefilterActivitiesProps
) => {
    setIsGettingActivties(true)
    handleAfterFilter(false)
    let activityFilterData: any = ""
    activityFilterData += `projectId=${filters.projects}`;
    activityFilterData += `&nameKeyword=${filters.performedBy ? filters.performedBy : ""}`;
    activityFilterData += `&plotId=${filters.plotID ? filters.plotID : ""}`;
    activityFilterData += `&status=${filters.activityStatus}`;
    activityFilterData += `&label=${filters.label}`;
    activityFilterData += `&activityType=${filters.activityType}`;
    activityFilterData += `&page=${page}`;
    activityFilterData += `&userId=${filters.userId ? filters.userId : ""}`;
    activityFilterData += `&syncDate=${filters.syncDate ? filters.syncDate : ""}`;
    activityFilterData += `&startDate=${filters.startDate ? filters.startDate : ""}`;
    activityFilterData += `&endDate=${filters.endDate ? filters.endDate : ""}`;

    if(filters.sort){
        activityFilterData += `&sort=${filters.sort}`;
    }

    dispatch.activities.filterActivities({
        onSuccess: (data) => {
            try{
            const ids: number[] = data.map(item => item.id);
            dispatch.activities.getActivitiesAggregateData({
                onSuccess: () => {
                    //
                },
                onError: () => {
                    //
                },
                data: {
                    "activities": [...ids]
                }
            });
            setIsGettingActivties(false)
            handleAfterFilter(true)
            setIsfiltering(false)
            dispatch.activities.setActivityChips({ availableChips: availableChips })
            dispatch.activities.setActivityFilters({ activityFilters: filters })
            dispatch.activities.setActivityFiltersChecked({ activityFiltersChecked: checked })
            const screen = 'activities'
            switchGlobalAvailableChipDispatches(screen, availableChips, filters, checked, dispatch)
            setRefreshFilter(false)
            let filterChips;
                if (Object.keys(availableChips).length !== 0) {
                    filterChips = Object.keys(availableChips).map((key) => ({ label: `${key}: ${availableChips[key]}` }));
                }
                else {
                    filterChips = []
                }
            router.replace(generateUrlWthSearchParams(
                            router.location.pathname, 
                            filterChips, 
                            filters, 
                            page
                            ))
        }catch(e){
            console.log(e)
        }
        },
        onError: () => {
            setIsGettingActivties(false)
            handleAfterFilter(true)
            setIsfiltering(false)
            setRefreshFilter(false)
        },
        data: activityFilterData
    })
}
