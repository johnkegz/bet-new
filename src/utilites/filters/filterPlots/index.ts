import { generateUrlWthSearchParams } from "../../generateUrlWthSearchParams";
import { switchGlobalAvailableChipDispatches } from "../switchGlobalAvailableChipDispatches";

export const filterPlots = (
    setIsfiltering,
    searchKeyWord,
    filters,
    dispatch,
    checked,
    handleAfterFilter,
    setRefreshFilter,
    availableChips,
    handleSetPlotSummary,
    page,
    router
) => {
    setIsfiltering(true)
    if (searchKeyWord === '') {
        let plotFilterData: any = {}
        if (filters.organizations !== '' && checked.organizations) {
            plotFilterData.organizationId = filters.organizations;
        }
        if (filters.projects !== '' && checked.projects) {
            plotFilterData.projectId = filters.projects;
        }
        if (filters.plotStatus !== '' && checked.plotStatus) {
            plotFilterData.status = filters.plotStatus;
        }
        if (filters.owner !== '' && checked.owner) {
            plotFilterData.nameKeyword = filters.owner;
        }
        if (filters.externalId !== '' && checked.externalId) {
            plotFilterData.externalId = filters.externalId;
        }

        if (filters.name !== '' && checked.name) {
            plotFilterData.plotName = filters.name;
        }
        if (filters.district !== '' && checked.district) {
            plotFilterData.plotDistrict = filters.district;
        }
        if (filters.village !== '' && checked.village) {
            plotFilterData.plotVillage = filters.village;
        }
        if (filters.note !== '' && checked.note) {
            plotFilterData.plotNote = filters.note;
        }
        if (filters.label !== '' && checked.label) {
            plotFilterData.plotLabels = filters.label;
        }
        if (filters.plotID !== '' && checked.plotID) {
            plotFilterData.id = filters.plotID;
        }

        return dispatch.plots.filterPlots({
            onSuccess: () => {
                setIsfiltering(false);
                handleAfterFilter(true)
                setRefreshFilter(false)
                handleSetPlotSummary({})
                dispatch.plots.setPlotChips({availableChips: availableChips})
                dispatch.plots.setPlotFilters({ plotFilters: filters })
                dispatch.plots.setPlotFiltersChecked({ plotFiltersChecked: checked })
                dispatch.table.setMapLikedWithSelectedRows({status: false})
                const screen = 'plots'
                switchGlobalAvailableChipDispatches(screen, availableChips, filters, checked, dispatch)
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
            },
            onError: () => {
                setIsfiltering(false)
                handleAfterFilter(false)
                setRefreshFilter(false)
                handleSetPlotSummary({})
            },
            data: plotFilterData,
            page: page
        })
    }
}

export const filterClusteredPlots = (
    lat: string | null, 
    lng: string | null, 
    distance: string | null,
    dispatch:any,
    filters: any,
    checked: any,
    getClustered: boolean
    ) => {
    let plotFilterData: string = `getClustered=${getClustered}&lat=${lat}&lng=${lng}&distance=${distance}`
        if (filters.projects !== '' && checked.projects) {
            plotFilterData += `&projectId=${filters.projects}`;
        }
        if (filters.plotStatus !== '' && checked.plotStatus) {
            plotFilterData += `&status=${filters.plotStatus}`;
        }
        if (filters.owner !== '' && checked.owner) {
            plotFilterData += `&nameKeyword=${filters.owner}`;
        }
        if (filters.externalId !== '' && checked.externalId) {
            plotFilterData += `&externalId=${filters.externalId}`;
        }

        if (filters.name !== '' && checked.name) {
            plotFilterData += `&plotName=${filters.name}`;
        }
        if (filters.district !== '' && checked.district) {
            plotFilterData += `&plotDistrict=${filters.district}`;
        }
        if (filters.village !== '' && checked.village) {
            plotFilterData += `&plotVillage=${filters.village}`;
        }
        if (filters.note !== '' && checked.note) {
            plotFilterData += `&plotNote=${filters.note}`;
        }
        if (filters.label !== '' && checked.label) {
            plotFilterData += `&plotLabels=${filters.label}`;
        }
        if (filters.plotID !== '' && checked.plotID) {
            plotFilterData += `&id=${filters.plotID}`;
        }
    dispatch.plots.filterClusteredPlots({
        plotFilterData: plotFilterData
    })
}
