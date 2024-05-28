import React, { useEffect } from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import { store } from '../../redux/rematch';
import { VariantType, useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
// import DataTable from './table';
// import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import clsx from 'clsx';
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import treeoLogo from '../../static/images/logo.png'
import { 
    // Badge, Breadcrumbs,
    //  Button,
    //  Chip,
    //   FormControlLabel, InputAdornment, Link, MenuItem, TextField,
    //    withStyles
     } from '@material-ui/core';

import '../dashboard/styles.scss'

// const drawerWidth = 310;

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         appBarMenu: {
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             height: '64px',
//         },
//         menuButton: {
//             marginRight: theme.spacing(2),
//         },
//         formControl: {
//             margin: theme.spacing(1),
//             minWidth: 120,
//         },
//         margin: {
//             margin: theme.spacing(1),
//         },
//         username: {
//             color: '#FAFAFA'
//         },
//         userNameIcon: {
//             color: 'white'
//         },
//         selectDropdown: {
//             marginRight: '20px',
//             color: '#ffffff',
//             outline: 'none'
//         },
//         middleContent: {
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center'
//         },
//         toolBarMenu: {
//             background: '#F2F2F2',
//             height: '48px',
//             zIndex: 1201,
//             width: '100%',
//             justifyContent: 'space-between',
//             marginTop: '64px',
//             position: 'fixed',
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingRight: '20px',
//             borderBottom: '1px solid #E0E0E0'
//         },
//         SubNavtitle: {
//             padding: '0px 10px 0px 10px',
//             flexGrow: 0,
//             fontFamily: 'Roboto',
//             fontStyle: 'normal',
//             fontSize: '15px',
//             lineHeight: '26px',
//             letterSpacing: '0.4px',
//             textTransform: 'uppercase',
//             fontWeight: 500,
//             cursor: 'pointer',
//             color: '#646567'
//         },
//         navigationMenu: {
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between'

//         },
//         rightSection: {
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'flex-end'

//         },
//         root: {
//             display: 'flex',
//         },
//         appBar: {
//             zIndex: theme.zIndex.drawer + 1,
//             background: '#00802B',
//             boxShadow: 'none'
//         },
//         drawer: {
//             flexShrink: 0,
//             marginTop: '42px'
//         },
//         drawerPaper: {
//             width: drawerWidth,
//             borderRadius: 0,
//             borderTop: "none",
//             borderBottom: "none",
//         },

//         // contentWrapper: {
//         //     overflow: "auto",
//         //     marginTop: '62px',
//         //     width: '100%',
//         //     padding: '0px 20px 0px 20px',
//         //     // position: "fixed",
//         //     backgroundColor: theme.palette.background.default,
//         //     transition: theme.transitions.create("margin", {
//         //         easing: theme.transitions.easing.sharp,
//         //         duration: theme.transitions.duration.leavingScreen
//         //     })
//         // },
//         "content-left": {
//             marginRight: drawerWidth
//         },
//         contentShift: {
//             transition: theme.transitions.create("margin", {
//                 easing: theme.transitions.easing.easeOut,
//                 duration: theme.transitions.duration.enteringScreen
//             })
//         },
//         content: {
//             background: '#ffffff',
//             padding: theme.spacing(3),
//         },
//         nested: {
//             paddingLeft: theme.spacing(4),
//         },
//     }),
// );



export default function UserList() {
    // const classes = useStyles();
    // const [open, setOpen] = React.useState(false);
    // const [currency, setCurrency] = React.useState('Fair Ventures');
    // const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const userList = useSelector((state): any => state);
    // const [dataList, setData] = React.useState([])

    // const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const router = useHistory();
    const { t } = useTranslation();

    const handleNotification = (message: string, variant: VariantType) => {
        enqueueSnackbar(message, { variant });
    };


    useEffect(() => {
        const authenticated =
            (store && store.getState().users.auth.token) ||
            localStorage.getItem('token') ||
            false;
        if (!authenticated) {
            // setIsAuthenticated(false);
         } else {
            // setIsAuthenticated(true);
            dispatch.users.getUsers({
                onSuccess: () => {
                },
                onError: () => {
                    router.push('/');
                    handleNotification(t("unauthorized"), "error");
                },
            });
        }

    }, [])

    useEffect(() => {
        if (userList.users.users !== undefined) {
            // setData(userList.users.users)
        }
    }, [userList])

    // const [checked, setChecked] = React.useState({
    //     project: false,
    //     eligibility: false,
    //     status: false,
    //     checkedA: true,
    //     checkedB: false,
    //     checkedF: false,
    //     checkedG: false,
    //     created: false,
    //     updated: false,
    //     comments: false,
    //     tags: false,
    //     params: true
    // });
    // const [openButtom, setOpenButtom] = React.useState(false);
    // const [openCheck, setOpenCheck] = React.useState(false);

    // const handleCheckClick = () => {
    //     setOpenCheck(!openCheck);
    // };

    // const handleDropDownClick = () => {
    //     setOpenButtom(!openButtom);
    // };

    // const handleValueChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    //     setValue(newValue);
    // };

    // const checkedOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setChecked({ ...checked, [event.target.name]: event.target.checked });
    // };

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setCurrency(event.target.value);
    // };

    // const handleDrawerOpen = () => {
    //     setOpen(!open);
    // };
    // const handleDelete = () => {
    //     return
    // }

    // interface TabPanelProps {
    //     children?: React.ReactNode;
    //     index: any;
    //     value: any;
    // }

    // function TabPanel(props: TabPanelProps) {
    //     const { children, value, index, ...other } = props;

    //     return (
    //         <div
    //             role="tabpanel"
    //             hidden={value !== index}
    //             id={`simple-tabpanel-${index}`}
    //             aria-labelledby={`simple-tab-${index}`}
    //             {...other}
    //         >
    //             {value === index && (
    //                 <div className="tabPanelContent">
    //                     {children}
    //                 </div>
    //             )}
    //         </div>
    //     );
    // }


    return (
        <div>
            {/* <main
                // className={clsx(classes.contentWrapper, {
                //     // [classes.contentShift]: open,
                //     // [classes[`content-left`]]: open
                // })}
            >
                <Toolbar />
                <div className="contentTop">
                        <h4 className="contentTopTitle">Users</h4>
                        <div className="contentTopChips">
                            <Chip
                                className="contentChipOthers"
                                label="Status: Active"
                                variant="outlined"
                                onDelete={handleDelete}
                            />
                            <Chip
                                className="contentChipOthers"
                                label="Role: Forester"
                                variant="outlined"
                                onDelete={handleDelete}
                            />
                            <Chip
                                className="contentChipOthers"
                                label="Role: Forester"
                                variant="outlined"
                                onDelete={handleDelete}
                            />
                            <Chip
                                className="contentAddIcon"
                                icon={<AddCircleIcon />}
                                label="Add Filter"
                                variant="outlined"
                            />
                    </div>
                    <Button
                        variant="contained"
                        className="addPlotBtn"
                        startIcon={<AddIcon />}
                    >
                        Add Plot
                        </Button>
                </div>
                <div>
                    {isAuthenticated ?
                        <div style={{ width: '100%' }}>
                            <DataTable data={dataList} />
                        </div>
                        : null}
                </div>
            </main> */}
        </div>
    );
}
