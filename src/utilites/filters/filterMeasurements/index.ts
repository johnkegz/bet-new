import { generateUrlWthSearchParams } from "../../generateUrlWthSearchParams";

export const filterMeasurements = (dispatch, id, filters, checked, availableChips, router, handleNotification, setIsfiltering) => {
    

    let activityMeasurementFilterData: any = "";
    if(filters.measurementStatus){
        activityMeasurementFilterData += `status=${filters.measurementStatus}`;
    }
    if(filters.measurementType){
        activityMeasurementFilterData += `&measurement_type=${filters.measurementType}`;
    }

    if ( filters.measurementDate){
        activityMeasurementFilterData += `&dateTime=${filters.measurementDate}`;
    }

    if ( filters.treeHealth){
        activityMeasurementFilterData += `&treeHealth=${filters.treeHealth}`;
    }

    if ( filters.treeSpecies){
        activityMeasurementFilterData += `&treeSpecies=${filters.treeSpecies}`;
    }

    setIsfiltering(true);
    return dispatch.activities.filterActivityMeasurement({
        onSuccess: (res) => {
            dispatch.measurements.setMeasurementSummary({measurementSummary: {}})
            dispatch.measurements.setActivityChips({ availableChips: availableChips })
            dispatch.measurements.setActivityFilters({ activityFilters: filters })
            dispatch.measurements.setActivityFiltersChecked({ activityFiltersChecked: checked })
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
                            ));
            setIsfiltering(false);
            if(res.message) handleNotification(res.message, 'error');

        },
        onError: (e) => {
            setIsfiltering(false);
            handleNotification(e, 'error')
            dispatch.measurements.setMeasurementSummary({measurementSummary: {}})
        },
        data: activityMeasurementFilterData,
        activityId: id,
        includeIgnored: checked.includeIgnored
    })
}
