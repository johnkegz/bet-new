import React, { ReactNode } from 'react'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import { Button, MenuItem, TextField } from '@material-ui/core'

//import ShareIcon from '@material-ui/icons/Share'
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess'
//import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import SimpleTabs from '../views/users/secondNavTabs'

import { useStyles } from '../views/common/utils'
import MenuDrawer from '../views/common/menuDrawer'
//import SecondMenuBreadcrumbs from '../views/common/secondMenuBreadcrumbs'

import '../views/dashboard/styles.scss'
// import { checkMultipleViewUIElementPermission } from '../utilites/permissionCheck'
// import { pagePermissions } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { checkForWarn } from '../utilites/warnBeforeExit'
// import WarnDialog from '../components/WarnModal'
import { useTranslation } from 'react-i18next'

interface IProps {
    children?: ReactNode;
    page?: string;
    handleMainTabValueChange?: (
        event: React.ChangeEvent<{}>,
        newValue: number
    ) => void;
    mainTabValue?: number;
    tabLabels?: {};
    drawerAction?: string;
    handleAdminResetPassword?: () => void;
    isAdminResetingUserpassword?: boolean;
    preferedLogin?: string;
    breadCrumb?: Array<string>;
    handleSetChips?: any;
    handleFilterChange?: any;
    checkedOption?: any;
    checked?: any;
    setChecked?: any;
    filters?: any;
    setSetFilter?: any;
    handleClearFilters?: any;
    isFetchingUsers?: boolean;
    handleClearFiltersOnSearch?: any;
    handleAfterFilter?: any;
    refreshFilter?: boolean;
    setRefreshFilter?: any;
    hideDrawerActionButton?: boolean;
    isFetchingPlots?: boolean;
    filterOptionData?: any;
    setFilterOptionData?: any;
    updateDateActivityLabels?: any;
    setSearchKeyWord?: any;
    filterUsers?: any;
    isfiltering?: any;
    searchKeyWord?: any;
    activitySummary?: any;
    handleSetActivitySummary?: (value: any) => void;
    sortBy?: any;
    setSortby?: any;
    orderBy?: any;
    setOrderby?: any;
    handleSetSortTable?: any;
    sortTable?: any;
    measurementSummary?: any;
    showMeasurementsTab?: any;
    showCreateMaTab?: any;
    updateMeasurement?: any;
    handleGetSingleActivity?: any;
    setIsGettingSingleActivity?: any;
    clearFiltersWithOutFetching?: () => void;
    plannedActivitySummary?: any;
    handleApproveRejectActivity?: (id: string, data: { status: string }) => void;
    isAcceptingOrRejecting?: string;
    isApprovingOrRejectingMeasurement?: string;
    singleActivity?: any;
    setIsAcceptingOrRejectingActivity?: any;
    handleMeasurementBatchApprovalOrReject?: () => void;
    batchActionStatus?: string;
    setBatchActionStatus?: any;
    isBatchApproving?: boolean;
    measurementData?: any;
    tableBatch?: any;
    showEditMapTab?: boolean;
    exportData?: () => void;
    isExporting?: boolean;
    setExportFormat?: any;
    exportFormat?: string;
    updatePlotLabels?: any;
    viewingProfile?: any;
    handleDeleteConfirmation?: () => void;
    isDeleting?: boolean;
    isExportTreeSurvey?: boolean;
    exportTreeSurveyData?: (exportFormat: string) => void;
}

export default function BodyLayout({
    children,
    page,
    handleMainTabValueChange,
    mainTabValue,
    tabLabels,
    drawerAction,
    handleAdminResetPassword,
    isAdminResetingUserpassword,
    preferedLogin,
    breadCrumb,
    handleSetChips,
    handleFilterChange,
    checkedOption,
    checked,
    setChecked,
    filters,
    setSetFilter,
    handleClearFilters,
    isFetchingUsers,
    handleClearFiltersOnSearch,
    handleAfterFilter,
    refreshFilter,
    setRefreshFilter,
    hideDrawerActionButton,
    isFetchingPlots,
    filterOptionData,
    setFilterOptionData,
    updateDateActivityLabels,
    setSearchKeyWord,
    filterUsers,
    isfiltering,
    searchKeyWord,
    activitySummary,
    sortBy,
    setSortby,
    orderBy,
    setOrderby,
    handleSetSortTable,
    sortTable,
    measurementSummary,
    showMeasurementsTab,
    showCreateMaTab,
    updateMeasurement,
    handleGetSingleActivity,
    setIsGettingSingleActivity,
    handleSetActivitySummary,
    clearFiltersWithOutFetching,
    plannedActivitySummary,
    handleApproveRejectActivity,
    isAcceptingOrRejecting,
    isApprovingOrRejectingMeasurement,
    singleActivity,
    setIsAcceptingOrRejectingActivity,
    handleMeasurementBatchApprovalOrReject,
    batchActionStatus,
    setBatchActionStatus,
    isBatchApproving,
    measurementData,
    tableBatch,
    showEditMapTab,
    exportData,
    isExporting,
    setExportFormat,
    exportFormat,
    updatePlotLabels,
    viewingProfile,
    handleDeleteConfirmation,
    isDeleting,
    isExportTreeSurvey,
    exportTreeSurveyData
}: IProps) {
    const classes = useStyles()
    // const [openWarnModal, setOpenWarnModal] = React.useState({
    //     url: '',
    //     status: false
    // })
    const state = useSelector((state): any => state)
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const handleDrawerOpen = () => {
        dispatch.general.setSideBarOpen({open: !state.general.sideBarOpen})
    }

    React.useEffect(() => {
        const handleBeforeUnload = (e) => {
        if (checkForWarn(state.general.warnBeforeExit)) {
            e.preventDefault();
            e.returnValue = '';
        }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [state.general.warnBeforeExit]);
    return (
        <div className={classes.root}>
            <div className={classes.toolBarMenu}>
                <div className={classes.navigationMenu}>
                    <Typography variant="h6" className={classes.SubNavtitle}>
                        <SimpleTabs
                            page={page}
                            value={mainTabValue}
                            handleChange={handleMainTabValueChange}
                            tabLabels={tabLabels}
                            showMeasurementsTab={showMeasurementsTab}
                            showCreateMaTab={showCreateMaTab}
                            showEditMapTab={showEditMapTab}
                            handleAfterFilter={handleAfterFilter}
                            setRefreshFilter={setRefreshFilter}
                            handleSetActivitySummary={handleSetActivitySummary}
                            // setOpenWarnModal={setOpenWarnModal}
                        />
                    </Typography>
                    {drawerAction === 'Dashboardactivities' && <div className={classes.breadCrumbsList}>
                        <TextField
                            select
                            label={t('selectTimePeriod')}
                            value={state.dashboard.duration}
                            onChange={(e) => {
                                dispatch.dashboard.duration(e.target.value)
                                return dispatch.dashboard.getProjectActivities({
                                    onSuccess: () => {
                                        //
                                    },
                                    onError: (error) => {
                                        //
                                    },
                                    organizationId: state.organizations?.selectedOrganization.id,
                                    duration: e.target.value
                                })
                            }
                            }
                            style={{
                                width: '10.25rem',
                            }}
                        >
                            {[
                                {id: 'day', name: 'day'},
                                {id: 'week', name: 'week'},
                                {id: 'month', name: 'month'},
                                {id: '3months', name: '3months'},
                                {id: '6months', name: '6months'},
                                {id: '1year', name: 'year'},
                            ].map((option: any) => (
                                <MenuItem
                                    key={option.id}
                                    // className="menuItemDrawer"
                                    value={option.id}
                                >
                                    {t(option.name)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>}
                </div>
                <div className={classes.rightSection}>
                    
                    <div className={classes.breadCrumbsList}>
                        {/* <SecondMenuBreadcrumbs data={breadCrumb} /> */}
                    </div>
                    {!['Dashboardactivities', 'Dashboardtab2', 'DashboardmissingMeasurements'].includes(drawerAction) && <div className={classes.drawerDiv}>
                        {mainTabValue !== 6 && <Button
                            variant="outlined"
                            startIcon={<UnfoldLessIcon />}
                            onClick={handleDrawerOpen}
                            className="success"
                        >
                            <span className={classes.drawerName}>
                            {t('dataAction')}
                            </span>
                        </Button>}
                    </div>}
                </div>
            </div>

            <MenuDrawer
                drawerAction={drawerAction}
                handleAdminResetPassword={handleAdminResetPassword}
                isAdminResetingUserpassword={isAdminResetingUserpassword}
                preferedLogin={preferedLogin}
                handleSetChips={handleSetChips}
                handleFilterChange={handleFilterChange}
                checkedOption={checkedOption}
                checked={checked}
                setChecked={setChecked}
                filters={filters}
                setSetFilter={setSetFilter}
                handleClearFilters={handleClearFilters}
                isFetchingUsers={isFetchingUsers}
                handleClearFiltersOnSearch={handleClearFiltersOnSearch}
                handleAfterFilter={handleAfterFilter}
                refreshFilter={refreshFilter}
                setRefreshFilter={setRefreshFilter}
                isFetchingPlots={isFetchingPlots}
                filterOptionData={filterOptionData}
                setFilterOptionData={setFilterOptionData}
                updateDateActivityLabels={updateDateActivityLabels}
                setSearchKeyWord={setSearchKeyWord}
                filterUsers={filterUsers}
                isfiltering={isfiltering}
                searchKeyWord={searchKeyWord}
                activitySummary={activitySummary}
                handleSetActivitySummary={handleSetActivitySummary}
                sortBy={sortBy}
                setSortby={setSortby}
                orderBy={orderBy}
                setOrderby={setOrderby}
                handleSetSortTable={handleSetSortTable}
                sortTable={sortTable}
                measurementSummary={measurementSummary}
                updateMeasurement={updateMeasurement}
                handleGetSingleActivity={handleGetSingleActivity}
                setIsGettingSingleActivity={setIsGettingSingleActivity}
                clearFiltersWithOutFetching={clearFiltersWithOutFetching}
                plannedActivitySummary={plannedActivitySummary}
                handleApproveRejectActivity={handleApproveRejectActivity}
                isAcceptingOrRejecting={isAcceptingOrRejecting}
                isApprovingOrRejectingMeasurement={isApprovingOrRejectingMeasurement}
                singleActivity={singleActivity}
                setIsAcceptingOrRejectingActivity={setIsAcceptingOrRejectingActivity}
                handleMeasurementBatchApprovalOrReject={handleMeasurementBatchApprovalOrReject}
                batchActionStatus={batchActionStatus}
                setBatchActionStatus={setBatchActionStatus}
                isBatchApproving={isBatchApproving}
                viewingProfile={viewingProfile}
                measurementData={measurementData}
                tableBatch={tableBatch}
                exportData={exportData}
                isExporting={isExporting}
                setExportFormat={setExportFormat}
                exportFormat={exportFormat}
                updatePlotLabels={updatePlotLabels}
                handleDeleteConfirmation={handleDeleteConfirmation }
                isDeleting={isDeleting}
                isExportTreeSurvey={isExportTreeSurvey}
                exportTreeSurveyData={exportTreeSurveyData}
            />
            <main
                className={`${clsx(classes.contentWrapper, {
                    [classes.contentShift]: ['Dashboardactivities', 'Dashboardtab2', 'DashboardmissingMeasurements'].includes(drawerAction) ? false: state.general.sideBarOpen,
                    [classes[`content-left`]]: ['Dashboardactivities', 'Dashboardtab2', 'DashboardmissingMeasurements'].includes(drawerAction) ? false: state.general.sideBarOpen,
                })} ${classes.bodyLayoutMain}`}
                style={{
                    marginLeft: 0,
                    paddingLeft: 0,
                    backgroundColor: '#ffffff',
                }}
            >
                {children}
            </main>
            {/* <WarnDialog open={state.general.openWarnModal} />; */}
        </div>
    )
}
