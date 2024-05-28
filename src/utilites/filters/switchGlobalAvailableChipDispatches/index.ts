export const switchGlobalAvailableChipDispatches = (
    screen,
    availableChips,
    filters,
    checked,
    dispatch
) => {
    switch (screen) {
        case 'activities':
            dispatch.activities.setAvailableChips({ availableChips: availableChips })
            dispatch.activities.setActivityFilters({ activityFilters: filters })
            dispatch.activities.setActivityFiltersChecked({ activityFiltersChecked: checked })
            break;
        case 'plots':
            dispatch.plots.setAvailablePlotChips({ availableChips: availableChips })
            dispatch.plots.setPlotFilters({ plotFilters: filters })
            dispatch.plots.setPlotFiltersChecked({ plotFiltersChecked: checked })
            break;
        case 'plannedActivities':
            dispatch.plannedActivities.setAvailablePlannedChips({ availablePlannedChips: availableChips })
            dispatch.plannedActivities.setPlannedFilters({ plannedFilters: filters })
            dispatch.plannedActivities.setPlannedFiltersChecked({ plannedFiltersChecked: checked })
            break;
        default:
    }
}
