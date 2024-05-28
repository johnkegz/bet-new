import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    makeStyles,
    IconButton,
    Drawer,
    Link,
    MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { palette } from '../../theme/palette';
import treeologo from '../../static/images/TREEO_CoolingThePlanet_white.png';
import { useDispatch, useSelector } from 'react-redux'
import TextFields from './dropDownMenu';
import './style.scss'
import { checkMultipleViewUIElementPermission, checkViewUIElementPermission } from "../../utilites/permissionCheck";
import { pagePermissions } from "../../constants";
import { checkForWarn, useOpenWarnModal } from "../../utilites/warnBeforeExit";
// import WarnDialog from "../WarnModal";
import ProfileDropDown from "./ProfileDropDown";
// import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

const headersData = [
    {
        label: "Dashboard",
        name:  "dashboard",
        href: "/dashboard",
    },
    {
        label: "Forestry",
        name:  "forestry",
        href: "/forestry",
    },
    {
        label: "People",
        name:  "people",
        href: "/users",
    }
];

const useStyles = makeStyles(() => ({
    header: {
        boxShadow: 'none', 
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
    },
    logo: {
        height: '40px',
        marginRight: '20px',
        transition: 'opacity .2s ease',
        opacity: 1,
        '&:hover': {
            opacity: .7,
        }
    },
    menuLinks: {
        display: 'flex',
        flexDirection: "row",
        height: "64px",
        '& > *': {
            padding: 0,
            '&:hover': {
                backgroundColor: 'transparent',
            }
        }
    },
    menuButton: {
        display: 'inline-flex',
        alignItems: 'center',
        height: "64px",
        boxSizing: 'border-box',
        margin: 0,
        padding: '0 15px',
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'transparent',
        textTransform: 'uppercase',
        color: palette.text.suppressed,
        '&:hover, &:focus': {
            backgroundColor: 'transparent',
            color: palette.primary.contrastText,
            borderBottomColor: palette.primary.border,
        },
        '&:focus': {
            backgroundColor: palette.primary.light,
        }
    },
    toolbar: {
        display: "flex",

    },
    drawerContainer: {
        padding: "20px",
    },
    
}));

export default function Header() {
    const { header, menuButton, toolbar, drawerContainer, logo } = useStyles();
    const state = useSelector((state): any => state)
    const [organizations, setOrganization] = React.useState([])
    const [currentOrganization, setCurrentOrganization] = React.useState<any>({})
    const [isAssignedToProject, setIsAssignedToProject] = React.useState<boolean>(false)
    const handleOpenWarnModal = useOpenWarnModal()
    const router = useHistory();
    
    const dispatch = useDispatch();
    const classes = useStyles();
    const [viewPort, setViewPort] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    useEffect(() => {
        if(state.users.user && state.users?.user?.email?.slice(-9) === 'treeo.one'){
            setOrganization(state.activities?.activityFilterOptionData?.organizations)
        }
        else if (state.users.user && state.users.user.organizationsAndProjects && state.users?.user?.email && state.users?.user?.email?.slice(-9) !== 'treeo.one') {
            const dataOrganizations = [...state.users.user.organizationsAndProjects.map(item => item.organization)]
            setOrganization(dataOrganizations)
        }
    }, [
        state.users.user && state.users?.user?.email, 
        state.activities?.activityFilterOptionData?.organizations,
        state.users.user && state.users?.user?.organizationsAndProjects,
        state.users.user && state.users?.user?.organizationsAndProjects && state.users?.user?.organizationsAndProjects?.length
    ])

    useEffect(() => {
        const value = state.users.user.userProject && state.users.user.userProject.length === 0 ? false : true; 
        setIsAssignedToProject(value);
    }, [state.users.user.userProject && state.users.user.userProject.length])

    useEffect(() => {
        if (
            currentOrganization !== undefined && Object.keys(currentOrganization).length !== 0 &&
            state.modules.modules.length !== 0
        ) {
            dispatch.roles.getRolesPerOrganization({
                onSuccess: () => {
                },
                id: currentOrganization.id,
            })
        }
    }, [currentOrganization, state.modules.modules])


    const handleCurrentOrganization = (data: any) => {
        setCurrentOrganization(data)
    }

    const { mobileView, drawerOpen } = viewPort;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setViewPort((prevState) => ({ ...prevState, mobileView: true }))
                : setViewPort((prevState) => ({ ...prevState, mobileView: false }));
        };

        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());
    }, []);

    const selectProject = () => {
        if(state.users.user && state.users?.user?.email?.slice(-9) === 'treeo.one') return <TextFields organizations={organizations} handleCurrentOrganization={handleCurrentOrganization} />
        //TODO: Permission to be fixed when view dashboard permission is add to the DB
        return (<>{
        ((state.users.user.userProject && checkViewUIElementPermission(pagePermissions.people.roleAndPermissions[0], state.users.user.userProject)) 
        ||
        (router.location.pathname.split('/')[1] === '' || router.location.pathname.split('/')[1] === 'dashboard'))
        && <TextFields organizations={organizations} handleCurrentOrganization={handleCurrentOrganization} />}</>);
        //return (<>{state.users.user.userProject && checkViewUIElementPermission(pagePermissions.people.roleAndPermissions[0], state.users.user.userProject) && <TextFields organizations={organizations} handleCurrentOrganization={handleCurrentOrganization} />}</>);
    };

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                {treeoLogo}
                {(isAssignedToProject || (state.users.user && state.users?.user?.email?.slice(-9) === 'treeo.one')) && <>
                    {selectProject()}
                    <div className={classes.menuLinks}>{getMenuButtons()}</div>
                </>}
                {/* <LanguageSwitcher /> */}
                <ProfileDropDown />
            </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setViewPort((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setViewPort((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>

                <div>{treeoLogo}</div>
                {isAssignedToProject && <><div>
                    <IconButton
                        {...{
                            edge: "start",
                            color: "inherit",
                            "aria-label": "menu",
                            "aria-haspopup": "true",
                            onClick: handleDrawerOpen,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </div>
                </>}
                <ProfileDropDown />
            </Toolbar>
        );
    };

    const getDrawerChoices = () => {
        return headersData.map(({ label, name, href }) => {

            return (
                <Link
                    {...{
                        component: RouterLink,
                        to: href,
                        color: "inherit",
                        style: { textDecoration: "none" },
                    }}
                    key={label}
                >
                    {<MenuItem>{label}</MenuItem>}
                </Link>
            );
        });
    };


    const treeoLogo = (
        <Link
            onClick={(e) => {
                if(checkForWarn(state.general.warnBeforeExit)) {
                        e.preventDefault()
                    return handleOpenWarnModal('/', true);
                }
            }}
            {...{
                component: RouterLink,
                to: '/',
                color: "inherit",
                style: { textDecoration: "none" },
            }}>
            <img alt="treeoLogo" src={treeologo} className={logo} width="139" height="40"/>
        </Link>
    );

    const getMenuButtons = () => {
        return headersData.map(({ label, name, href }) => {
            if (
                label === 'Forestry'
                && state.users.user.userProject
                && (!checkMultipleViewUIElementPermission(
                    [
                        ...pagePermissions.forestry.activities,
                        ...pagePermissions.forestry.plots,
                        ...pagePermissions.forestry.plannedActivities,
                    ],
                    state.users.user.userProject
                ) || state.users?.user?.email?.slice(-9) === 'treeo.one')
            ) {
                return <RenderMenuItem 
                        key={label}
                        label={name} 
                        warnBeforeExit={state.general.warnBeforeExit}
                        href={href}
                        menuButton={menuButton}
                    />
            }
            if (
                label === 'People'
                && state.users.user.userProject
                && (!checkMultipleViewUIElementPermission(
                    [
                        ...pagePermissions.people.users,
                        ...pagePermissions.people.roleAndPermissions,
                    ],
                    state.users.user.userProject
                ) || state.users?.user?.email?.slice(-9) === 'treeo.one')
            ) {
                return <RenderMenuItem 
                        key={label}
                        label={name} 
                        warnBeforeExit={state.general.warnBeforeExit}
                        href={href}
                        menuButton={menuButton}
                    />
            }
            if (
                label === 'Dashboard'

                //TODO: permissions to view the dashboard

                // && state.users.user.userProject
                // && !checkMultipleViewUIElementPermission(
                //     [
                //         ...pagePermissions.people.users,
                //         ...pagePermissions.people.roleAndPermissions,
                //     ],
                //     state.users.user.userProject
                // )
            ) {
                return <RenderMenuItem 
                        key={label}
                        label={name} 
                        warnBeforeExit={state.general.warnBeforeExit}
                        href={href}
                        menuButton={menuButton}
                    />
            }

        });
    };

    return (<>
        <header>
            <AppBar className={header} color="primary" position="fixed">
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </header>
        {/* <WarnDialog open={state.general.openWarnModal} /> */}
        </>
    );
}

const RenderMenuItem = ({
    label,
    warnBeforeExit,
    href,
    menuButton
}) => {
    const handleOpenWarnModal = useOpenWarnModal()
    const { t } = useTranslation()
    return (
            <MenuItem >
                <Link
                    onClick={(e) => {
                        if(checkForWarn(warnBeforeExit)) {
                                e.preventDefault()
                            return handleOpenWarnModal(href, true);
                        }
                    }}
                    {...{
                        component: RouterLink,
                        className: menuButton,
                        to: href,
                        color: "inherit",
                        style: { textDecoration: "none" },
                    }}
                >
                    {t(label)}

                </Link>
            </MenuItem>
        )
}
