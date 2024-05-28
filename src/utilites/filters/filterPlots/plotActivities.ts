import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { generateUrlWthSearchParams } from "../../generateUrlWthSearchParams";

export const useGetPlotActivities = () => {
    const dispatch = useDispatch();
    const router = useHistory();
    const callBack = (page, orderBy = null, currentOrder = null, plotId, availableChips,checked,filters, drawerAction) => {
        let activityFilterData: any = ""

        activityFilterData += `projectId=${filters.Projects}`;
        activityFilterData += `&nameKeyword=${filters.PerformedBy ? filters.PerformedBy : ""}`;
        activityFilterData += `&status=${filters.activityStatus}`;
        activityFilterData += `&label=${filters.label}`;
        activityFilterData += `&activityType=${filters.activityType}`;
        activityFilterData += `&userId=${filters.userId ? filters.userId : ""}`;
        activityFilterData += `&syncDate=${filters.syncDate ? filters.syncDate : ""}`;
        activityFilterData += `&startDate=${filters.startDate ? filters.startDate : ""}`;
        activityFilterData += `&endDate=${filters.endDate ? filters.endDate : ""}`;

        activityFilterData += `&plotId=${plotId}`;
        activityFilterData += `&page=${page}`;
        if(orderBy && currentOrder){
            activityFilterData += `&sort=${orderBy}:${currentOrder}`;
        }

        dispatch.plots.getPlotActivities({
            onSuccess: (data) => {
                const ids: number[] = data.map(item => item.id);
                dispatch.plots.getPlotActivitiesAggregateData({
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

                dispatch.plots.plotActivitiesChips(availableChips)
                dispatch.plots.availablePlotActivitiesChips(availableChips)
                dispatch.plots.plotActivitiesFilters(filters)
                dispatch.plots.plotActivitiesFiltersChecked(checked)
               
                let filterChips;
                if (Object.keys(availableChips).length !== 0) {
                    filterChips = Object.keys(availableChips).map((key) => ({ label: `${key}: ${availableChips[key]}` }));
                }
                else {
                    filterChips = []
                }

                filterChips = [...filterChips.filter(item => item.label !== `tab: activities`), ]
                if(drawerAction === "Forestryplotsactivities") {
                    filterChips.push({ label: `tab: activities` })
                }
                else{
                    filterChips.push({ label: `tab: info` })
                }

                router.replace(generateUrlWthSearchParams(
                            router.location.pathname, 
                            filterChips, 
                            filters, 
                            page
                            ))
            },
            onError: () => {
                // setIsGettingActivities(false)
            },
            data: activityFilterData,
        });   
    }
    return callBack;
}
