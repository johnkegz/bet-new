import { Dispatch, SetStateAction } from "react";
import { generateUrlWthSearchParams } from "../../generateUrlWthSearchParams";


interface HandlefilterActivitiesProps {
    filters: any;
    page: number;
    dispatch: any;
    setIsPlannedActivties: Dispatch<SetStateAction<boolean>>;
    availableChips: any;
    checked: boolean;
    router: any,
}

interface HandlefilteruserPlannedActivitiesProps {
    page: number;
    dispatch: any;
    setIsGettingUserPlannedActivties: Dispatch<SetStateAction<boolean>>;
    userId: string;
}

interface HandlefilterPlotPlannedActivitiesProps {
    page: number;
    dispatch: any;
    setIsGettingPlotPlannedActivties: Dispatch<SetStateAction<boolean>>;
    plotId: string;
}

export const handlefilterPlannedActivities = ({
    filters,
    page,
    dispatch,
    setIsPlannedActivties,
    availableChips,
    checked,
    router,
}: HandlefilterActivitiesProps
) => {
    setIsPlannedActivties(true);
    let plannedActivityFilterData: any = ""
    plannedActivityFilterData += `page=${page}`;
    if(filters.Projects){
        plannedActivityFilterData += `&projectId=${filters.Projects}`;
    }
    if(filters.PerformedBy){
        plannedActivityFilterData += `&nameKeyword=${filters.PerformedBy}`;   
    }
    if(filters.plannedStatus){
        plannedActivityFilterData += `&status=${filters.plannedStatus}`;
    }
    if (filters.activityType){
        plannedActivityFilterData += `&activityType=${filters.activityType}`;
    }
    if (filters.PlotId){
        plannedActivityFilterData += `&plotId=${filters.PlotId}`;
    }
    if (filters.plannedType){
        plannedActivityFilterData += `&type=${filters.plannedType}`;
    }

    if (filters.TemplateID){
        plannedActivityFilterData += `&activityTemplateId=${filters.TemplateID}`;
    }
  

    dispatch.plannedActivities.filterPlannedActivities({
        onSuccess: () => {
            setIsPlannedActivties(false)
            dispatch.plannedActivities.setAvailablePlannedChips({ availablePlannedChips: availableChips })
            dispatch.plannedActivities.setPlannedFilters({ plannedFilters: filters })
            dispatch.plannedActivities.setPlannedFiltersChecked({ plannedFiltersChecked: checked })
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
                            null
                            ))
        },
        onError: () => {
            setIsPlannedActivties(false)
        },
        data: plannedActivityFilterData
    })
}



export const handlefilterUserPlannedActivities = ({
    page,
    dispatch,
    setIsGettingUserPlannedActivties,
    userId
}: HandlefilteruserPlannedActivitiesProps
) => {
    setIsGettingUserPlannedActivties(true);
    let plannedActivityFilterData: any = ""
    plannedActivityFilterData += `&page=${page}`;
    dispatch.plannedActivities.getuserPlannedActivities({
        onSuccess: () => {
            setIsGettingUserPlannedActivties(false)
        },
        onError: () => {
            setIsGettingUserPlannedActivties(false)
        },
        data: plannedActivityFilterData,
        userId: userId,
    })
}

export const handlefilterPlotPlannedActivities = ({
    page,
    dispatch,
    setIsGettingPlotPlannedActivties,
    plotId
}: HandlefilterPlotPlannedActivitiesProps
) => {
    setIsGettingPlotPlannedActivties(true);
    let plannedActivityFilterData: any = ""
    plannedActivityFilterData += `&page=${page}`;
    dispatch.plannedActivities.getPlotPlannedActivities({
        onSuccess: () => {
            setIsGettingPlotPlannedActivties(false)
        },
        onError: () => {
            setIsGettingPlotPlannedActivties(false)
        },
        data: plannedActivityFilterData,
        plotId: plotId,
    })
}
