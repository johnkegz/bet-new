import React, { useEffect, useState, FC } from 'react';
import {
    Typography,
    Button,
    FormControl,
    Tabs,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Grid,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
    useDispatch, useSelector,
} from 'react-redux'
import BodyLayout from '../../../layouts/BodyLayout';
import AssignRoleDrawer from '../../common/AssignRoleDrawer';
import { VariantType, useSnackbar } from 'notistack';
import { useStyles, TabPanel } from '../../common/utils';
import Content from '../../../components/Content';
import ContentTop from '../../../components/ContentTop';
import ContentTopHeading from '../../../components/ContentTopHeading';
import { useHistory } from 'react-router-dom';

import '../../dashboard/styles.scss';
import { pagePermissions } from '../../../constants';
import { checkViewUIElementPermission } from '../../../utilites/permissionCheck';
import ErrorPage from '../../../components/ErrorPage';
import { Search } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

interface Props { }

const AssignFirstProject: FC<Props> = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [roleCapabilityValue, setRoleCapabilityValue] = React.useState(0)
    const [openAssignDrawer, setOpenAssignDrawer] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [organizations, setOrganizations] = useState([])
    const [userDetail, setUserDetail] = useState({
        id: null,
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: "",
    })

    const [breadCrumbs, setBreadCrumbs] = React.useState([])
    const router = useHistory();
    const state = useSelector((state: any) => state);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const tabNames = { tab1: "users" }
    const [googleSheetLink, setGoogleSheetLink] = useState('');
    const [isImporting, setIsImporting] = useState(false);
    const [importError, setImportError] = useState('');
    const dispatch = useDispatch()
    const { t } = useTranslation();


    useEffect(() => {
        setError("")
        setBreadCrumbs(['User', 'information']);
        dispatch.organizations.getOrganizations({
            onSuccess: (data) => {
                setOrganizations([...data])
            },
            onError: () => {
            },
        });
    }, [])

    const fetchAssignData = () => {
        setOpenAssignDrawer(false)
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleUserTabChanges = (
        event: React.ChangeEvent<{}>,
        newValue: number
    ) => {
        setRoleCapabilityValue(newValue)
    }

    const { enqueueSnackbar } = useSnackbar();

    const handleNotification = (message: string, variant: VariantType) => {
        enqueueSnackbar(message, { variant });
    };

    const handleSearchUserByEmail = (email: string): void => {
        setIsSearching(true);
        setError("")
        setUserDetail({
            id: null,
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            country: "",
        });
        dispatch.users.seracUserByemail({
            data: { email: email },
            onSuccess: (res) => {
                setIsSearching(false)
                if (res?.data?.userProject.length === 0) {
                    let newData = res.data
                    newData.userName = res?.data?.username;
                    setUserDetail(res.data)
                    
                }
                if (res?.data?.userProject.length !== 0) {
                    setError(t('Assignment is not possible, user with email {email} already has at least one project. Please contact TREEO Support {supportEmail}.', { email, supportEmail: 'support@treeo.one' }));
                }
            },
            onError: (e: string) => {
                setIsSearching(false)
                handleNotification(`${e} `, 'error')
            },
        })
    }

    const handleRedirect = () => {
        router.push(`/users/edit/${userDetail.id}`)
    }

    const handleImport = async () => {
        try {
            setIsImporting(true);
            setImportError('');
    
            await dispatch.users.importUsers({
                data: { googleSheetUrl: googleSheetLink },
                onSuccess: () => {
                    handleNotification(t('Users imported successfully!'), 'success');
                },
                onError: (errorMessage) => {
                    setImportError(errorMessage || t('An error occurred while importing.'));
                    handleNotification(t('Import failed. Please try again.'), 'error');
                },
            });
        } catch (error) {
            setImportError(t('An error occurred while importing.'));
            handleNotification(t('Import failed. Please try again.'), 'error');
        } finally {
            setIsImporting(false);
        }
    };
    
      

    return (<BodyLayout
        page="assign-project"
        handleMainTabValueChange={handleChange}
        mainTabValue={value}
        tabLabels={tabNames}
        drawerAction={breadCrumbs.join('')}
        breadCrumb={breadCrumbs}
    >
        <TabPanel value={value} index={0}>
            {!checkViewUIElementPermission(pagePermissions.people.users[1], state.users.user.userProject) && <ErrorPage statusText={state.users.isGettingUser ? "Loading..." : "Unauthorized"} />}
            {checkViewUIElementPermission(pagePermissions.people.users[1], state.users.user.userProject) && <>
                <ContentTop
                    nav={<Button
                        className="addPlotBtnEdit"
                        onClick={() => router.goBack()}
                        startIcon={<ArrowBackIcon />}>
                        {t('back')}
                    </Button>}>
                    <ContentTopHeading>
                        <Typography variant="h2" gutterBottom>{t('assignUserFirstProject')}</Typography>
                    </ContentTopHeading>
                </ContentTop>
                <Tabs
                    value={roleCapabilityValue}
                    onChange={handleUserTabChanges}
                    className={`${classes.tabs} sizeSmall`}
                    indicatorColor="primary"
                >
                    {/* <Tab label="Assign first project" onClick={() => setBreadCrumbs(['User', 'assign-first-project'])} /> */}

                </Tabs>
                <Content>
                    <TabPanel value={roleCapabilityValue} index={0}>
                        <Grid container spacing={0}>
                            <Grid item md={9} lg={7} spacing={3} direction="row"
                                justifyContent="center"
                                alignItems="center">
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSearchUserByEmail(email)
                                }}>
                                    <TextField
                                        required
                                        size='small'
                                        id="owner"
                                        variant="outlined"
                                        value={email}
                                        autoComplete={"off"}
                                        style={{ width: '89%' }}
                                        placeholder="Search by complete email address"
                                        onChange={(e) => {
                                            setError("")
                                            setEmail(e.target.value)
                                            setUserDetail({
                                                id: null,
                                                userName: "",
                                                firstName: "",
                                                lastName: "",
                                                email: "",
                                                phoneNumber: "",
                                                country: "",
                                            });
                                        }}
                                        inputProps={{
                                            autoComplete: 'off'
                                        }}
                                        type={'email'}
                                    />
                                    <Button
                                        type="submit"
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<Search />}
                                    ></Button>
                                </form>
                            </Grid>
                            <Grid item md={9} lg={7} spacing={3}>
                                <div style={{
                                    marginTop: '30px'
                                }}
                                >
                                    {error && <div className="text" >{error}</div>}
                                    {isSearching && <div className="text" >Searching</div>}
                                    {!isSearching && userDetail.id !== null && <><Table size="small">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{t('username')}</TableCell>
                                                <TableCell>{userDetail.userName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>{t('firstName')}</TableCell>
                                                <TableCell>
                                                    <div className="valueSection">{userDetail.firstName}</div>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>{t('lastName')}</TableCell>
                                                <TableCell>
                                                    <div className="valueSection">{userDetail.lastName}</div>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>{t('email')}</TableCell>
                                                <TableCell>
                                                    <div className="valueSection">{userDetail.email}</div>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                        <div style={{
                                            marginTop: '30px'
                                        }}
                                        >
                                            <Button
                                                type="submit"
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => setOpenAssignDrawer(true)}
                                            >{t('assignRole')}</Button>
                                        </div>
                                    </>}
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0}>
                            <Grid item md={9} lg={7} spacing={3} direction="row" justifyContent="center" alignItems="center">
                                <form onSubmit={(e) => {
                                e.preventDefault();
                                handleImport();
                                }}>
                                <TextField
                                    required
                                    size='small'
                                    id="googleSheetLink"
                                    variant="outlined"
                                    value={googleSheetLink}
                                    autoComplete={"off"}
                                    style={{ width: '89%' }}
                                    placeholder="Enter Google Sheet link"
                                    onChange={(e) => {
                                    setImportError('');
                                    setGoogleSheetLink(e.target.value);
                                    }}
                                />
                                <Button
                                    type="submit"
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    disabled={isImporting}
                                >
                                    {isImporting ? t('importing') : t('import')}
                                </Button>
                                </form>
                            </Grid>
                            <Grid item md={9} lg={7} spacing={3}>
                                <div style={{ marginTop: '30px' }}>
                                {importError && <div className="text">{importError}</div>}
                                </div>
                            </Grid>
                        </Grid>
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
        {openAssignDrawer ? <AssignRoleDrawer url={'user-projects/assign-first-project'} userRoles={[]} userID={userDetail.id} organizationList={organizations} openModal={openAssignDrawer} closeModal={fetchAssignData} handleRedirect={handleRedirect}/> : null}
    </BodyLayout >
    );
}

export default AssignFirstProject;
