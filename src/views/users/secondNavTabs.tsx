import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import DashBoardNav from '../dashboard/dashboardNav';
import { useHistory } from 'react-router-dom'
import { checkMultipleViewUIElementPermission, checkViewUIElementPermission } from '../../utilites/permissionCheck';
import { initialChecked, initialFilters, pagePermissions } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { handlefilterActivities } from '../../utilites/filters/filterActivities';
import { ForestryContextType } from '../forestry/types';
import ForestryContext from '../forestry/ForestryContext';
import { checkForWarn, useOpenWarnModal } from '../../utilites/warnBeforeExit';
import { useFilterActivityTemplates } from '../../utilites/filters/filterActivityTemplates';
import { useTranslation } from 'react-i18next';

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const useStyles = makeStyles(() => ({
    roleTab: {
        minWidth: '4.0625rem',
    },
    rolesAndCapabilitiesTab: {
        minWidth: 'auto',
    },
}))


export default function SimpleTabs(props: any) {
    const classes = useStyles()
    const router = useHistory()
    const [isfiltering, setIsfiltering] = React.useState(false);

    const state = useSelector((state): any => state)
    const { general } = state;
    const dispatch = useDispatch()
    const handleOpenWarnModal = useOpenWarnModal()
    const handlefilterTemplates = useFilterActivityTemplates()

    const {
        setIsGettingActivties,
        handleChange,
        handleSetPlotSummary,
    }: ForestryContextType = useContext(ForestryContext)

    function convertToCamelCase(inputString) {
        return inputString.replace(/\s+(\w)/g, (_, c) => c.toUpperCase()).replace(/\s/g, '').replace(/^(.)/, (match, c) => c.toLowerCase());
    }

    const { t } = useTranslation()

    const displayTabs = () => {
        if (props.page && props.page === 'organization') {
            return (
                <Tabs
                    value={props.value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    TabIndicatorProps={{ style: { background: '#00802B' } }}
                >
                    <Tab
                        label="Organization"
                        {...a11yProps(0)}
                        className={classes.roleTab}
                    />
                </Tabs>
            )
        }
        if (props.page && props.page === 'users') {
            return (
                <Tabs
                    value={props.value}
                    onChange={props.handleChange}
                    aria-label="simple tabs example"
                    TabIndicatorProps={{ style: { background: '#00802B' } }}
                >
                    {(checkViewUIElementPermission(pagePermissions.people.users[0], state.users.user.userProject) || state.users?.user?.email?.slice(-9) === 'treeo.one') ? <Tab
                        label={t(convertToCamelCase(props.tabLabels.tab1))}
                        {...a11yProps(0)}
                        className={classes.roleTab}
                    />: null}
                    {(checkViewUIElementPermission(pagePermissions.people.roleAndPermissions[0], state.users.user.userProject) ||state.users?.user?.email?.slice(-9) === 'treeo.one') ? <Tab
                        label={ t(convertToCamelCase(props.tabLabels.tab2))}
                        {...a11yProps(1)}
                        className={classes.rolesAndCapabilitiesTab}
                        id="capabillitesSecondMenu"
                    />: null}
                </Tabs>
            )
        }
        if (props.page && props.page === 'dashboard') {
            return <DashBoardNav 
            {...props}
            //ToDO: To be removed 'isfiltering'
            isfiltering={isfiltering}
             />
        }
        
        // condition for forestry page.
        if (props.page && props.page === 'forestry') {
            const tabRoutes = state.users.forestryTabRoutes;
            return (
                <Tabs
                    value={props.value}
                    onChange={props.handleChange}
                    aria-label="simple tabs example"
                    TabIndicatorProps={{ style: { background: '#00802B' } }}
                >
                    
                    
                    {checkViewUIElementPermission(pagePermissions.forestry.activities[0], state.users.user.userProject) || state.users?.user?.email?.slice(-9) === 'treeo.one' ? <Tab
                        label={t(convertToCamelCase(props.tabLabels.tab1))}
                        {...a11yProps(tabRoutes.indexOf('/forestry/activities'))}
                        className={classes.roleTab}
                        id="activities"
                        value={tabRoutes.indexOf('/forestry/activities')}
                        onClick={() => {
                                if(checkForWarn(general.warnBeforeExit)) return handleOpenWarnModal('/forestry/activities', true);
                                const filters = { ...initialFilters }
                                const checked = { ...initialChecked }
                                const page = 1
                                const availableChips = {}
                                const handleAfterFilter = props.handleAfterFilter;
                                const setRefreshFilter = props.setRefreshFilter;
                                dispatch.table2.resetTable2();
                                handlefilterActivities({
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
                                })
                                props.handleSetActivitySummary({})
                            router.push('/forestry/activities')
                        }}
                    />: null}
                    {!checkMultipleViewUIElementPermission(pagePermissions.forestry.plannedActivities, state.users.user.userProject) || state.users?.user?.email?.slice(-9) === 'treeo.one'? <Tab
                        label={t(convertToCamelCase(props.tabLabels.tab2))}
                        {...a11yProps(tabRoutes.indexOf('/forestry/planned-activities'))}
                        className={classes.roleTab}
                        id="planned-activities"
                        value={tabRoutes.indexOf('/forestry/planned-activities')}
                        onClick={() => {
                            if(checkForWarn(general.warnBeforeExit)) return handleOpenWarnModal('/forestry/planned-activities', true);
                            return router.push('/forestry/planned-activities')
                        }}
                    />: null}
                    {!checkMultipleViewUIElementPermission(pagePermissions.forestry.plots, state.users.user.userProject) || state.users?.user?.email?.slice(-9) === 'treeo.one'? <Tab
                        label={t(convertToCamelCase(props.tabLabels.tab3))}
                        {...a11yProps(tabRoutes.indexOf('/forestry/plots'))}
                        className={classes.rolesAndCapabilitiesTab}
                        id="plots"
                        value={tabRoutes.indexOf('/forestry/plots')}
                        onClick={() => {
                            if(checkForWarn(general.warnBeforeExit)) return handleOpenWarnModal('/forestry/plots', true);
                            dispatch.plots.setPlotChips({availableChips: {}})
                            //TODO:table2
                            dispatch.table2.resetTable2();
                            router.push('/forestry/plots')
                        }}
                    />: null}

                    {checkViewUIElementPermission(pagePermissions.forestry.activityTemplates[0], state.users.user.userProject) || state.users?.user?.email?.slice(-9) === 'treeo.one' ? <Tab
                        label={t(convertToCamelCase(props.tabLabels.tab7))}
                        {...a11yProps(tabRoutes.indexOf('/forestry/activity-templates'))}
                        className={classes.roleTab}
                        id="activity-templates"
                        value={tabRoutes.indexOf('/forestry/activity-templates')}
                        onClick={() => {
                            handlefilterTemplates(1)
                            if(checkForWarn(general.warnBeforeExit)) return handleOpenWarnModal('/forestry/activity-templates', true);
                            return router.push('/forestry/activity-templates')
                        }}
                    />: null}
                    {checkViewUIElementPermission(pagePermissions.forestry.zones[0], state.users.user.userProject) || state.users?.user?.email?.slice(-9) === 'treeo.one' ? <Tab
                        label={t(convertToCamelCase(props.tabLabels.tab8))}
                        {...a11yProps(tabRoutes.indexOf('/forestry/zones'))}
                        className={classes.roleTab}
                        id="zones"
                        value={tabRoutes.indexOf('/forestry/zones')}
                        onClick={() => {
                                if(checkForWarn(general.warnBeforeExit)) return handleOpenWarnModal('/forestry/zones', true);
                            router.push('/forestry/zones')
                        }}
                    />: null}
                    {props.showMeasurementsTab && <Tab
                        label={t(convertToCamelCase(props.tabLabels.tab4))}
                        {...a11yProps(tabRoutes.indexOf('/forestry/:id/measurements'))}
                        className={classes.roleTab}
                        id="Measurements"
                        value={tabRoutes.indexOf('/forestry/:id/measurements')}
                    />}
                    {props.showCreateMaTab && <Tab
                        label={t(convertToCamelCase(props.tabLabels.tab5))}
                        {...a11yProps(tabRoutes.indexOf('/forestry/createplot'))}
                        className={classes.roleTab}
                        id="createplot"
                        value={tabRoutes.indexOf('/forestry/createplot')}
                    />}
                    {props.showEditMapTab && <Tab
                        label={t(convertToCamelCase(props.tabLabels.tab6))}
                        {...a11yProps(tabRoutes.indexOf('/forestry/editplot'))}
                        className={classes.roleTab}
                        id="editplot"
                        value={tabRoutes.indexOf('/forestry/editplot')}
                    />}
                </Tabs>
            )
        }
        if (props.page && props.page === 'assign-project') {
            return (
                <Tabs
                    value={props.value}
                    aria-label="simple tabs example"
                    TabIndicatorProps={{ style: { background: '#00802B' } }}
                >
                    {checkViewUIElementPermission(pagePermissions.people.users[1], state.users.user.userProject) || state.users?.user?.email?.slice(-9) === 'treeo.one' ? <Tab
                        label={props.tabLabels.tab1}
                        {...a11yProps(0)}
                        className={classes.roleTab}
                    />: null}
                </Tabs>
            )
        }
    }

    return (
        <div>
            {displayTabs()}
        </div>
    )
}
