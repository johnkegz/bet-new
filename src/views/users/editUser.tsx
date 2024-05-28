import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    FormControl,
    Tab,
    Tabs,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    TextField,
    Grid,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import {
    useDispatch, useSelector,
} from 'react-redux'
import BodyLayout from '../../layouts/BodyLayout';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AssignRoleDrawer from '../common/AssignRoleDrawer';
import { VariantType, useSnackbar } from 'notistack';
import UpdateRoleDrawer from '../common/UpdateRoleDrawer';
import { useStyles, TabPanel } from '../common/utils';
import Content from '../../components/Content';
import ContentTop from '../../components/ContentTop';
import ContentTopHeading from '../../components/ContentTopHeading';
import { useHistory } from 'react-router-dom';

import '../dashboard/styles.scss';
import { pagePermissions } from '../../constants';
import { checkViewUIElementPermission, doAnyProjectsExistForPermission, projectIds } from '../../utilites/permissionCheck';
import ErrorPage from '../../components/ErrorPage';
import UserPlannedActivities from './UserPlannedActivities';
import * as _ from 'lodash';
import { checkForWarn, useOpenWarnModal } from '../../utilites/warnBeforeExit';
import { useTranslation } from 'react-i18next';

const initialUserEditData = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    }

function EditUser(props: any) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [roleCapabilityValue, setRoleCapabilityValue] = React.useState(0)
    const [openAssignDrawer, setOpenAssignDrawer] = useState(false);
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    const [isAdminResetingUserpassword, setIsAdminResetingUserpassword] = useState(false);
    const [organizations, setOrganizations] = useState([])
    const [projectID, setProjectID] = useState()
    const [userDetail, setUserDetail] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: "",
        preferedLogin: ""
    })
    const [editUser, setEditUser] = useState(false);
    const [editUserDetails, setEditUserDetails] = useState(initialUserEditData);
    const [initialEditUserDetails, setInitialEditUserDetails] = useState(initialUserEditData);
    const [userRoles, setUserRoles] = useState([]);
    const [currentUserRoleDetails, setCurrentUserRoleDetails] = useState({});
    const [fetchDataStatus, setFetchDataStatus] = React.useState<any>('');
    const [breadCrumbs, setBreadCrumbs] = React.useState([])

    const router = useHistory();
    const state = useSelector((state: any) => state);
    const { t } = useTranslation();

    const [viewingProfile, setViewingProfile] = useState({})
    const [editedFields, setEditedFields] = useState({});

    useEffect(() => {
        getUserRoleDetails()
        setBreadCrumbs(['User', 'information']);
    }, [])

    const getUserRoleDetails = () => {
        dispatch.users.getSingleUser({
            user: {
                id: props.match.params.selectedID,
            },
            onSuccess: (data) => {
                setViewingProfile(data);
                setUserDetail({
                    userName: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    country: data.country,
                    preferedLogin: data.preferedLogin
                });
                setEditUserDetails({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email || '',
                    phoneNumber: `+${data.phoneNumber}`,
                });
                setInitialEditUserDetails({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email || '',
                    phoneNumber: `+${data.phoneNumber}`,
                });
                setUserRoles([...data.userProject])
            },
            onError: () => {
            },
        });
    }

    useEffect(() => {
        if (state.users.user && state.users.user.organizationsAndProjects) {
            const dataOrganizations = [...state.users.user.organizationsAndProjects.map(item => item.organization)]
            setOrganizations(dataOrganizations)
        }
    }, [state])

    const getSubmitData = () => {
        const editedDetails = {};
      
          Object.entries(editedFields).forEach(([fieldName, edited]) => {
            if (edited) {
              editedDetails[fieldName] = editUserDetails[fieldName];
            }
          });

          return {
              username: props.match.params.selectedID,
              editedDetails
            }
    }

    const submitData = (data) => {
        dispatch.users.updateUserDetail({
            user: data,
            onSuccess: () => {
                dispatch.users.getSingleUser({
                    user: {
                        id: props.match.params.selectedID,
                    },
                    onSuccess: ({ username, firstName, lastName, email, phoneNumber, country, preferedLogin }) => {
                        setUserDetail({
                            userName: username,
                            firstName,
                            lastName,
                            email,
                            phoneNumber,
                            country,
                            preferedLogin
                        });
                        setEditUser(false)
                        
                    },
                    onError: () => {
                    },
                });
                handleNotification(t("User details updated successfully"), 'success')
            },
            onError: (message) => {
              handleNotification(message, 'error');
            },
          });
    }

    const handleEditUser = (data) => {
        setEditUser(prevEditUser => !prevEditUser);
        if (editUser) {
          submitData(data);
          setEditedFields({});
        } else {
          setEditUserDetails({
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
            email: userDetail.email || '',
            phoneNumber: `+${userDetail.phoneNumber}`,
          });
        }
      };
      
    const handleCancelEdit = () => {
        getUserRoleDetails()
        setEditUser(false)
        setEditUserDetails(initialEditUserDetails)
    }

    const fetchUpdateData = () => {
        getUserRoleDetails()
        setOpenEditDrawer(false)
    }

    const fetchAssignData = () => {
        setOpenAssignDrawer(false)
        getUserRoleDetails()
    }

    const dispatch = useDispatch()

    const editDrawer = (content, pID) => {
        setCurrentUserRoleDetails(content)
        setProjectID(pID)
        setOpenAssignDrawer(false)
        setOpenEditDrawer(!openEditDrawer)
    }

    const assignDrawer = () => {
        setOpenEditDrawer(false)
        setOpenAssignDrawer(!openEditDrawer)
    }

    const tabNames = { tab1: "users", tab2: "roles" }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleOpenWarnModal = useOpenWarnModal()

    const handleUserTabChanges = (
        event: React.ChangeEvent<{}>,
        newValue: number
    ) => {
        event.preventDefault();
        if(checkForWarn(state.general.warnBeforeExit)) return handleOpenWarnModal(() => setRoleCapabilityValue(newValue), true);
        setRoleCapabilityValue(newValue)
    }

    const { enqueueSnackbar } = useSnackbar();

    const handleNotification = (message: string, variant: VariantType) => {
        enqueueSnackbar(message, { variant });
    };

    const handleAdminResetPassword = () => {
        setIsAdminResetingUserpassword(true)
        dispatch.users.adminResetUserPassowrd({
            onSuccess: (res) => {
                setIsAdminResetingUserpassword(false)
                handleNotification(`${res} `, 'success')
            },
            // email: I am trying to register but I am getting this any idea on what is going on.location.search.substring(1).split('&')[0].split('=')[1],
            email: userDetail.email,
            onError: (e: string) => {
                setIsAdminResetingUserpassword(false)
                handleNotification(`${e} `, 'error')
            },
        })
    }

    const handlePlannedActivitySummmary = (plannedActivityData) => {
        return dispatch.plannedActivities.setPlannedActivitySummary({
            onSuccess: () => {
                //
            },
            onError: () => {
                //
            },
            plannedActivitySummary: plannedActivityData,
            page: 'user'
        })
    }

    const permissionName = "Edit User Profile";
    const assignRolePermissionName = "Assign User Role";
    const editUserRolePermissionName = "Edit User Role";
    const removeUserRolePermissionName = "Remove User Role";
    const viewingProjectIds = projectIds( viewingProfile );
    const canEdit = doAnyProjectsExistForPermission(state.users.user, permissionName, viewingProjectIds);
    const canAssignRole = doAnyProjectsExistForPermission(state.users.user, assignRolePermissionName, viewingProjectIds);
    const canEditUserRole = doAnyProjectsExistForPermission(state.users.user, editUserRolePermissionName, viewingProjectIds);
    const canRemoveUserRole = doAnyProjectsExistForPermission(state.users.user, removeUserRolePermissionName, viewingProjectIds);

    const handleOnChange = event => {
        const fieldName = event.target.name;
        let fieldValue = event.target.value;
      
        if (fieldName === 'phoneNumber') {
          fieldValue = `+${fieldValue}`; // Add + symbol to phoneNumber
        }
      
        setEditUserDetails({
          ...editUserDetails,
          [fieldName]: fieldValue,
        });
      
        setEditedFields({
          ...editedFields,
          [fieldName]: true,
        });
    }; 
    
    React.useEffect(() => {
        if(_.isEqual(editUserDetails, initialEditUserDetails)){
            dispatch.general.setWarnBeforeExit({
            options: {
                message: '',
                data: null,
                saveChanges: null
            }
            });
        }else{
            dispatch.general.setWarnBeforeExit({
                options: {
                    message: 'editing user',
                    data: getSubmitData(),
                    saveChanges: submitData
            }
            });
        }

    }, [
        editUserDetails, initialEditUserDetails
    ]);

    return (<BodyLayout
        page="users"
        handleMainTabValueChange={handleChange}
        mainTabValue={value}
        tabLabels={tabNames}
        drawerAction={breadCrumbs.join('')}
        handleAdminResetPassword={handleAdminResetPassword}
        isAdminResetingUserpassword={isAdminResetingUserpassword}
        preferedLogin={userDetail.preferedLogin}
        breadCrumb={breadCrumbs}
        viewingProfile={viewingProfile}
    >
        <TabPanel value={value} index={0}>

            {!checkViewUIElementPermission(pagePermissions.people.profile[0], state.users.user.userProject) && <ErrorPage statusText={state.users.isGettingUser? "Loading...": "Unauthorized"} />}
            {checkViewUIElementPermission(pagePermissions.people.profile[0], state.users.user.userProject) && <>
                <ContentTop
                    nav={<Button
                        className="addPlotBtnEdit"
                        onClick={() => router.goBack()}
                        startIcon={<ArrowBackIcon />}>
                        {t('back')}
                    </Button>}>
                    <ContentTopHeading>
                        <Typography variant="h2" gutterBottom>{userDetail.firstName} {userDetail.lastName}</Typography>
                        <Typography variant="h3">{userDetail.userName}</Typography>
                    </ContentTopHeading>
                </ContentTop>
                <Tabs
                    value={roleCapabilityValue}
                    onChange={handleUserTabChanges}
                    className={`${classes.tabs} sizeSmall`}
                    indicatorColor="primary"
                >
                    <Tab label={t('information')} onClick={() => setBreadCrumbs(['User', 'information'])} />
                    <Tab label={t('roles')} onClick={() => setBreadCrumbs(['User', 'roles'])} />
                    <Tab label={t('subordinates')} onClick={() => setBreadCrumbs(['User', 'subordinates'])} />
                    <Tab label={t('activities')} onClick={(e) => {
                        e.preventDefault();
                        if(checkForWarn(state.general.warnBeforeExit)) return handleOpenWarnModal(`/forestry/activities?userId=${props.match.params.selectedID}`, true);
                        router.push(`/forestry/activities?userId=${props.match.params.selectedID}`)}
                        } />
                    <Tab label={t('plannedActivities')} onClick={() => setBreadCrumbs(['User', 'planned-activities'])} />
                </Tabs>
                <Content>
                    <TabPanel value={roleCapabilityValue} index={0}>
                        <Grid container spacing={0}>
                            <Grid item md={9} lg={7}>
                                <Table size="small">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{t('username')}</TableCell>
                                            <TableCell>{userDetail.userName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>{t('firstName')}</TableCell>
                                            <TableCell>
                                                {editUser ? <TextField
                                                    id="firstname"
                                                    name="firstName"
                                                    className="valueSection"
                                                    defaultValue={userDetail.firstName}
                                                    onChange={handleOnChange}
                                                />
                                                    : <div className="valueSection">{userDetail.firstName}</div>
                                                }
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>{t('lastName')}</TableCell>
                                            <TableCell>
                                                {editUser ?
                                                    <TextField
                                                        id="lastName"
                                                        name="lastName"
                                                        className="valueSection"
                                                        defaultValue={userDetail.lastName}
                                                        onChange={handleOnChange}
                                                    />
                                                    : <div className="valueSection">{userDetail.lastName}</div>
                                                }
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>{t('email')}</TableCell>
                                            <TableCell>
                                                {editUser ?
                                                    <TextField
                                                        id="email"
                                                        name="email"
                                                        className="valueSection"
                                                        defaultValue={userDetail.email}
                                                        onChange={handleOnChange}
                                                    />
                                                    : <div className="valueSection">{userDetail.email}</div>
                                                }
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>{t('phone')}</TableCell>
                                            <TableCell>
                                                {editUser ?
                                                    <TextField
                                                        id="phone"
                                                        name="phoneNumber"
                                                        className="valueSection"
                                                        required
                                                        placeholder="Required"
                                                        defaultValue={userDetail.phoneNumber}
                                                        onChange={handleOnChange}
                                                    />
                                                    : <div className="valueSection">{userDetail.phoneNumber}</div>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>

                        {canEdit && (
                            <div style={{
                                display: 'flex',
                                flexDirection: "row",
                                marginTop: '30px'
                            }}>
                                <Button
                                    variant="contained"
                                    className="addPlotBtn"
                                    onClick={() => handleEditUser(getSubmitData())}>
                                    {editUser ? t('saveChanges') : t('editUser')}
                                </Button>

                                <Button
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                    onClick={() => handleCancelEdit()}>
                                    {t('cancel')}
                                </Button>
                            </div>
                        )}

                    </TabPanel>
                    <TabPanel value={roleCapabilityValue} index={1}>
                        <Grid container spacing={0}>
                            <Grid item md={9} lg={7}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{t('organizations')}</TableCell>
                                            <TableCell>{t('project')}</TableCell>
                                            <TableCell>{t('role')}</TableCell>
                                            <TableCell>{t('status')}</TableCell>
                                            { canEditUserRole  && (
                                            <TableCell>{t('action')}</TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            userRoles.map((item) =>
                                                <TableRow key={item.id}>
                                                    <TableCell>{(item.project) === null ? "Null" : item.project.organization.name}</TableCell>
                                                    <TableCell>{(item.project) === null ? "Null" : item.project.name}</TableCell>
                                                    <TableCell>{(item.role) === null ? "Null" : item.role.name}</TableCell>
                                                    <TableCell>{(item.project) === null ? "Null" : userRoles[0].status}</TableCell>
                                                    <TableCell>
                                                        { canEditUserRole  && (
                                                        <Button onClick={() => editDrawer(item, item.id)}>{t('edit')} <ArrowDropDownIcon /></Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>

                        {canAssignRole && (
                            <div style={{
                                display: 'flex',
                                flexDirection: "row",
                                marginTop: '30px'
                            }}>
                            <Button
                                variant="contained"
                                className="addPlotBtn"
                                startIcon={<AddIcon />}
                                onClick={() => assignDrawer()}>
                                {t('assignRole')}
                            </Button>
                            </div>
                        )}

                    </TabPanel>
                    <TabPanel value={roleCapabilityValue} index={4}>
                        <UserPlannedActivities
                            setPlannedActivitiesSummary={handlePlannedActivitySummmary}
                            className={classes.userTab}
                            setFetchDataStatus={setFetchDataStatus}
                            fetchDataStatus={fetchDataStatus}
                            tab={roleCapabilityValue}
                        />
                    </TabPanel>
                </Content>
            </>
            }
        </TabPanel>
        <TabPanel value={value} index={1}>
            <FormControl component="fieldset">
            </FormControl>
            <Typography variant="h3" gutterBottom>
            </Typography>
        </TabPanel>
        {openEditDrawer ? <UpdateRoleDrawer status={userRoles[0].status} userProject={userRoles[0].id} roleDetails={currentUserRoleDetails} projectID={projectID} userID={props.match.params.selectedID} organizationList={organizations} openModal={openEditDrawer} closeModal={fetchUpdateData} canRemoveUserRole={canRemoveUserRole} /> : null}

        {openAssignDrawer ? <AssignRoleDrawer url={'user-projects'} userRoles={userRoles} userID={props.match.params.selectedID} organizationList={organizations} openModal={openAssignDrawer} closeModal={fetchAssignData} /> : null}
    </BodyLayout >
    );
}

export default EditUser;
