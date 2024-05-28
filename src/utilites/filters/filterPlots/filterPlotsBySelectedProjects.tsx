export const filterPlotsBySelectedProjects = (
    lat: string | null,
    lng: string | null,
    distance: string | null,
    dispatch: any,
    getClustered: boolean
) => {
    dispatch.plots.getPlotsExportIds({
        onSuccess: (res) => {
            let plotFilterData: string = `getClustered=${getClustered}&lat=${lat}&lng=${lng}&distance=${distance}`;
            dispatch.plots.setfilterBySelectedIds({
                plotFilterData: plotFilterData,
                ids: res
            });
        },
        onError: () => {
            //
        },
    });
};
