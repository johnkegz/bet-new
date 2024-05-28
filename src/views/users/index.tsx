import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../redux/rematch'
import { VariantType, useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import DataTable from './table'
import {
    Button,
    Chip,
    Tab,
    Tabs,
    Typography,
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import AddIcon from '@material-ui/icons/Add'
import { RolesAndCapabilitiesHeader } from './rolesAndCapabilities'
import TransitionAlerts from './alert'
import ControlledAccordions from './accordion'
import { useStyles, TabPanel } from '../common/utils'
import BodyLayout from '../../layouts/BodyLayout'
// import { checkValidToken } from '../common/auth'
import FilterChips from '../common/FilterCips'
import Content from '../../components/Content';
import ContentTop from '../../components/ContentTop';
import ContentTopHeading from '../../components/ContentTopHeading';
import '../dashboard/styles.scss'
import { getUniqueUrlsFilters } from '../common/uniqueUrlFilters/index'
import Pagination from '@material-ui/lab/Pagination'

import { pagePermissions } from '../../constants'
import { checkViewUIElementPermission } from '../../utilites/permissionCheck'
import ErrorPage from '../../components/ErrorPage'
import { useTranslation } from 'react-i18next'

export default function index() {
    const classes = useStyles()
    const [roleCapabilityValue, setRoleCapabilityValue] = React.useState(0)
    const [breadCrumbs, setBreadCrumbs] = React.useState([])
    const dispatch = useDispatch()
    const state = useSelector((state): any => state)
    const [rolesCapabilities, setRolesCapabilities] = React.useState([])
    const [availabbleChips, setAvailabbleChips] = React.useState({})
    const [filterChips, setFilterChips] = React.useState([])
    const [hasSearched, setHasSearched] = React.useState(false)
    const [afterSearchData, setAfterSearchData] = React.useState([])
    const [refreshFilter, setRefreshFilter] = React.useState(false)
    const [searchKeyWord, setSearchKeyWord] = React.useState('')
    const [isfiltering, setIsfiltering] = React.useState(false)
    const [urlParemeterFilter, setUrlParemeterFilter] = React.useState(false)
    const [currentPage, setCurrentPage] = React.useState(1)


    const { enqueueSnackbar } = useSnackbar()
    const router = useHistory()
    const { t } = useTranslation();

    /** Menu drawer logic */
    const [checked, setChecked] = React.useState({
        project: false,
        eligibility: false,
        status: false,
        checkedA: true,
        checkedB: false,
        checkedF: false,
        checkedG: false,
        created: false,
        firstName: false,
        lastName: false,
        email: false,
        isActive: false,
    })

    const [filters, setSetFilter] = React.useState<any>({
        project: false,
        eligibility: false,
        status: '',
        checkedA: true,
        checkedB: false,
        checkedF: false,
        checkedG: false,
        created: false,
        firstName: '',
        lastName: '',
        email: '',
    })

    const [isFetchingUsers, setIsFetchingUsers] = React.useState<any>(false)
    const [fetchDataStatus, setFetchDataStatus] = React.useState<any>('')
    const checkedOption = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked({ ...checked, [event.target.name]: event.target.checked });
        if (!event.target.checked) {
            setSetFilter({ ...filters, [event.target.name]: "" })
            setRefreshFilter(true)
            let newAvailableChips = availabbleChips;
            let newFilterChips = filterChips.filter(item => item.label.split(": ")[0] !== event.target.name);
            delete newAvailableChips[event.target.name];
            setAvailabbleChips(newAvailableChips);
            setFilterChips(newFilterChips);
        }
    }

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSetFilter({ ...filters, [event.target.name]: event.target.value })
        handleSetChips({ [event.target.name]: event.target.value })
    }

    const clearFiltersWithOutFetching = () => {
        setSetFilter({
            project: false,
            eligibility: false,
            status: '',
            checkedA: true,
            checkedB: false,
            checkedF: false,
            checkedG: false,
            created: false,
            firstName: '',
            lastName: '',
            email: '',
            isActive: '',
        })
        setChecked({
            project: false,
            eligibility: false,
            status: false,
            checkedA: true,
            checkedB: false,
            checkedF: false,
            checkedG: false,
            created: false,
            firstName: false,
            lastName: false,
            email: false,
            isActive: false,
        })
        setAvailabbleChips({})
        setFilterChips([])
        return
    }


    const handleClearFilters = () => {
        clearFiltersWithOutFetching()
        fetchUsers(1)
        router.push(`/users`)
    }



    /** End of Menu drawer logic */

    const handleNotification = (message: string, variant: VariantType) => {
        enqueueSnackbar(message, { variant })
    }

    const fetchUsers = (Page: number) => {
        setIsFetchingUsers(true);
        dispatch.users.getUsers({
            onSuccess: () => {
                setIsFetchingUsers(false);
            },
            onError: (e: string) => {
                setIsFetchingUsers(false);
                router.push('/')
                handleNotification(`${e} for users list`, 'error')
            },
            page: Page
        })
    }

    useEffect(() => {
        const authenticated =
            (store && store.getState().users.auth.token) ||
            localStorage.getItem('token') ||
            false
        if (!authenticated ) {
            // router.push(`/auth/login?url=${router.location.pathname}`)
        } else {
            dispatch.organizations.getOrganizations({
                onSuccess: () => { },
                onError: () => {
                    router.push('/')
                    // handleNotification(`${e} for organizations list`, 'error')
                },
            })

            dispatch.modules.getModules({
                onSuccess: () => { },
                onError: () => {
                    router.push('/')
                    handleNotification('Unauthorized', 'error')
                },
            })
        }
        setBreadCrumbs(['People', 'users'])

        if (router.location.search !== "") {
            setUrlParemeterFilter(true)
            let filterOptionData = {...state.activities.activityFilterOptionData }
            getUniqueUrlsFilters({
                router,
                filterOptionData
            })
        }
        else {
            fetchUsers(1)
        }
    }, []);

    useEffect(() => {
        if (urlParemeterFilter) {
            filterUsers(1)
        }
    }, [urlParemeterFilter])

    const filterUsers = (page) => {
        setIsfiltering(true)
        let finalQuery2 = ''
        if (searchKeyWord === '') {
            let finalString2 = `page=${page}`
            if (filters.firstName !== '' && checked.firstName) {
                finalString2 += `&firstName=${filters.firstName}`
            }
            if (filters.email !== '' && checked.email) {
                finalString2 += `&email=${filters.email}`
            }
            if (filters.lastName !== '' && checked.lastName) {
                finalString2 += `&lastName=${filters.lastName}`
            }
            if (filters.status !== '' && checked.status) {
                finalString2 += `&status=${filters.status}`
            }
            // let finalQuery2 = ''
            if (
                filters.firstName === '' &&
                filters.lastName === '' &&
                filters.email === '' &&
                filters.status === ''
            ) {
                finalQuery2 = ''
            } else {
                finalQuery2 = finalString2
            }

        } else {
            let finalString2 = `page=${page}`
            finalString2 += `&keyWord=${searchKeyWord}`
            finalQuery2 = finalString2
        }
        return dispatch.users.filterUsersREST({
            onSuccess: () => {
                setIsfiltering(false)
                handleAfterFilter(true)
                setRefreshFilter(false)
                setUrlParemeterFilter(false)
            },
            onError: () => {
                setIsfiltering(false)
                handleAfterFilter(false)
                setRefreshFilter(false)
                setUrlParemeterFilter(false)
            },
            data: finalQuery2
        })
    }

    const handleRoleCapabilityValueChange = (
        event: React.ChangeEvent<{}>,
        newValue: number
    ) => {
        // newValue === 0
        //     ? setBreadCrumbs(['People', 'roles&capabilites', 'roles'])
        //     : setBreadCrumbs(['People', 'roles&capabilites', 'capabilites'])
        // setBreadCrumbs(['People', 'roles&capabilites', 'roles'])
        setBreadCrumbs(['People', 'roles&capabilites', 'capabilites'])
        setRoleCapabilityValue(newValue)
    }

    const handleDelete = (data: any) => {
        let newAvailableChips = availabbleChips;
        let newFilterChips = filterChips.filter(item => item.label.split(": ")[1] !== data.split(": ")[1]);
        delete newAvailableChips[data.split(": ")[0]]
        setAvailabbleChips(newAvailableChips);
        setFilterChips(newFilterChips);
        setChecked({ ...checked, [data.split(": ")[0]]: false })
        setSetFilter({ ...filters, [data.split(": ")[0]]: '' })
        setRefreshFilter(true)
    }

    const tabNames = { tab1: 'users', tab2: 'Roles & Capabilities' }

    const [mainTabValue, setMainTabValue] = React.useState(0)

    const handleMainTabValueChange = (
        event: React.ChangeEvent<{}>,
        newValue: number
    ) => {
        setMainTabValue(newValue)
        newValue === 0
            ? setBreadCrumbs(['People', 'users'])
            : setBreadCrumbs(['People', 'roles&capabilites', 'roles'])
        return
    }

    const syncPermisionsToRoles = () => {
        let result = state.modules.modules.map((item: any) => {
            item.role = state.roles.roles
            return item
        })
        return result
    }

    React.useEffect(() => {
        setRolesCapabilities(syncPermisionsToRoles())
    }, [state.roles.roles])

    const handleSetChips = (data: any) => {
        setAvailabbleChips({ ...availabbleChips, [Object.keys(data)[0]]: Object.values(data)[0] })
    }
    React.useEffect(() => {
        if (Object.keys(availabbleChips).length !== 0) {
            let result = Object.keys(availabbleChips).map((key) => ({ label: `${key}: ${availabbleChips[key]}` }));
            setFilterChips(result)
        }


    }, [availabbleChips]);

    React.useEffect(() => {
        if (Object.keys(filterChips).length !== 0 && hasSearched) {
            setAfterSearchData(filterChips)
        }


    }, [hasSearched]);

    const handleClearFiltersOnSearch = () => {
        return clearFiltersWithOutFetching()
    }

    const handleAfterFilter = (value) => {
        setHasSearched(value)
        setAfterSearchData(filterChips)

        let filterParameterString = "";
        for (let x in availabbleChips) {
            filterParameterString += `${x}=${availabbleChips[x]}&`
        }

        router.push(`/users?${filterParameterString.slice(0, filterParameterString.length - 1)}`)
        return
    }

    const haveSameData = function (obj1, obj2) {
        const obj1Length = Object.keys(obj1).length;
        const obj2Length = Object.keys(obj2).length;
        if (obj1Length === obj2Length) {
            return Object.keys(obj1).every(
                key => obj2[key] === obj1[key]);
        }
        return false;
    }

    const handlePagination = (event, value) => {
        if (!isFetchingUsers) {
            let test = {
                project: false,
                eligibility: false,
                status: '',
                checkedA: true,
                checkedB: false,
                checkedF: false,
                checkedG: false,
                created: false,
                firstName: '',
                lastName: '',
                email: '',
            }

            if (haveSameData(filters, test)) {
                return fetchUsers(value)
            }
            else {
                return filterUsers(value)
            }
        }
    }

    React.useEffect(() => {
        setCurrentPage(state.users.users.currentPage)
    }, [state.users.users.currentPage])

    return (
        <BodyLayout
            page="users"
            handleMainTabValueChange={handleMainTabValueChange}
            mainTabValue={mainTabValue}
            tabLabels={tabNames}
            breadCrumb={breadCrumbs}
            handleSetChips={handleSetChips}
            handleFilterChange={handleFilterChange}
            checkedOption={checkedOption}
            checked={checked}
            setChecked={setChecked}
            filters={filters}
            setSetFilter={setSetFilter}
            drawerAction={breadCrumbs.join('')}
            handleClearFilters={handleClearFilters}
            isFetchingUsers={isFetchingUsers}
            handleClearFiltersOnSearch={handleClearFiltersOnSearch}
            handleAfterFilter={handleAfterFilter}
            refreshFilter={refreshFilter}
            setRefreshFilter={setRefreshFilter}
            setSearchKeyWord={setSearchKeyWord}
            filterUsers={filterUsers}
            isfiltering={isfiltering}
            searchKeyWord={searchKeyWord}
            hideDrawerActionButton={true}
        >
            <TabPanel value={mainTabValue} index={0}>
                <ContentTop
                    nav={checkViewUIElementPermission(pagePermissions.people.users[1], state.users.user.userProject)?<Button
                        variant="contained"
                        className="addPlotBtn"
                        onClick={()=>{
                            router.push('/users/assign-project')
                        }}
                        startIcon={<AddIcon />}>
                        {t('addUser')}
                    </Button>:""}
                    
                    >
                        <ContentTopHeading>
                            <Typography variant="h2" style={{ height: '100%' }}>{t('users')}</Typography>
                        </ContentTopHeading>
                        {(checkViewUIElementPermission(pagePermissions.people.users[0], state.users.user.userProject) || state.users?.user?.email?.slice(-9) === 'treeo.one') && <div className="contentTopChips">
                            {hasSearched && filterChips.length !== 0 ? (
                                <FilterChips
                                    filterData={afterSearchData}
                                    handleDelete={handleDelete}
                                />
                            ) : (
                                ''
                            )}
                            {/* {addFilterStatus ? "" : <Chip
                            className="contentAddIcon"
                            icon={<AddCircleIcon />}
                            label="Add Filter"
                            variant="outlined"
                            onClick={handleAddFilterStatus}
                        />} */}
                        </div>}
                    </ContentTop>
                    {state.users?.user?.email?.slice(-9) === 'treeo.one' && state.users.isGettingUser && <ErrorPage statusText={t("loading")} />}
                    {(!checkViewUIElementPermission(pagePermissions.people.users[0], state.users.user.userProject) && state.users?.user?.email?.slice(-9) !== 'treeo.one') 
                    && <ErrorPage statusText={state.users.isGettingUser ? t("loading") : t("unauthorized")} />
                    }
                    { (checkViewUIElementPermission(pagePermissions.people.users[0], state.users.user.userProject) || state.users?.user?.email?.slice(-9) === 'treeo.one' ) && <Content>
                        <DataTable
                            data={state.users.users.rows}
                            className={classes.userTab}
                            setFetchDataStatus={setFetchDataStatus}
                            fetchDataStatus={fetchDataStatus}
                        />
                        <div className={'activityTableSectionFooter'}>
                            <Pagination
                                count={state.users.users.totalPages}
                                page={currentPage}
                                onChange={handlePagination}
                                color="primary"
                            />
                        </div>
                    </Content>}
            </TabPanel>
            <TabPanel value={mainTabValue} index={1}>
                {/* {checkViewUIElementPermission(pagePermissions.people.roleAndPermissions[0], state.users.user.userProject) && <><ContentTop */}
                <ContentTop
                    nav={<Button
                        style={{ display: 'none' }}
                        variant="contained"
                        className="addPlotBtn"
                        startIcon={<AddIcon />}>
                        {t('addCapability')}
                    </Button>}>
                    <ContentTopHeading>
                        <Typography variant="h2" style={{ height: '100%' }}>{t('roles')} &amp; {t('capabilities')}</Typography>
                    </ContentTopHeading>
                    <div className="contentTopChips">
                        {hasSearched && filterChips.length !== 0 ? (
                            <FilterChips
                                filterData={afterSearchData}
                                handleDelete={handleDelete}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </ContentTop>
                <Tabs
                    value={roleCapabilityValue}
                    onChange={handleRoleCapabilityValueChange}
                    className={`${classes.tabs} sizeSmall`}
                    indicatorColor="primary"
                >
                    {/* <Tab label="Roles" /> */}
                    <Tab label="Capabilities" />
                </Tabs>
                <Content>
                    {/* <TabPanel value={roleCapabilityValue} index={0}>
                        Roles
                    </TabPanel> */}
                    <TabPanel value={roleCapabilityValue} index={0}>
                        <TransitionAlerts />
                        <RolesAndCapabilitiesHeader
                            roles={state.roles.roles}
                        />
                        <ControlledAccordions
                            modules={rolesCapabilities}
                            id="rolesCapabilitesBody"
                        />
                    </TabPanel>
                    {/* </Content></>} */}
                </Content>
            </TabPanel>
        </BodyLayout>
    )
}
