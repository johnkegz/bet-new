import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    makeStyles,
    IconButton,
    Drawer,
    Link,
    MenuItem,
    Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { palette } from '../../theme/palette';
import Logo from '../../static/images/reset_button.svg';
import { useDispatch, useSelector } from 'react-redux';
import TextFields from './dropDownMenu';
import './style.scss';
import {
    checkMultipleViewUIElementPermission,
    checkViewUIElementPermission,
} from '../../utilites/permissionCheck';
import { checkForWarn, useOpenWarnModal } from '../../utilites/warnBeforeExit';
import { useTranslation } from 'react-i18next';

const headersData = [
    {
        label: 'Home',
        name: 'Home',
        href: '/',
    },
    {
        label: 'Profile',
        name: 'profile',
        href: '/profile',
    },
    {
        label: 'History',
        name: 'history',
        href: '/history',
    },
    {
        label: 'Dashboard',
        name: 'Dashboard',
        href: '/dashboard',
    },
];

const useStyles = makeStyles(() => ({
    header: {
        boxShadow: 'none',
        '@media (max-width: 900px)': {
            paddingLeft: 0,
        },
    },
    logo: {
        height: '40px',
        marginRight: '20px',
        transition: 'opacity .2s ease',
        opacity: 1,
        '&:hover': {
            opacity: 0.7,
        },
    },
    menuLinks: {
        display: 'flex',
        flexDirection: 'row',
        height: '64px',
        '& > *': {
            padding: 0,
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
    },
    menuButton: {
        display: 'inline-flex',
        alignItems: 'center',
        height: '64px',
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
        },
    },
    toolbar: {
        display: 'flex',
    },
    drawerContainer: {
        padding: '20px',
    },
}));

export default function Header() {
    const { header, menuButton, toolbar, drawerContainer, logo } = useStyles();
    const state = useSelector((state): any => state);
    const [organizations, setOrganization] = React.useState([]);
    const [currentOrganization, setCurrentOrganization] = React.useState<any>({});
    const [isAssignedToProject, setIsAssignedToProject] = React.useState<boolean>(false);
    const handleOpenWarnModal = useOpenWarnModal();
    const router = useHistory();

    const dispatch = useDispatch();
    const classes = useStyles();
    const [viewPort, setViewPort] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    useEffect(() => {}, [
        state.users.user && state.users?.user?.email,
        state.activities?.activityFilterOptionData?.organizations,
        state.users.user && state.users?.user?.organizationsAndProjects,
        state.users.user &&
            state.users?.user?.organizationsAndProjects &&
            state.users?.user?.organizationsAndProjects?.length,
    ]);

    useEffect(() => {
        const value =
            state.users.user.userProject &&
            state.users.user.userProject.length === 0
                ? false
                : true;
        setIsAssignedToProject(value);
    }, [state.users.user.userProject && state.users.user.userProject.length]);

    const handleCurrentOrganization = (data: any) => {
        setCurrentOrganization(data);
    };

    const { mobileView, drawerOpen } = viewPort;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setViewPort((prevState) => ({
                      ...prevState,
                      mobileView: true,
                  }))
                : setViewPort((prevState) => ({
                      ...prevState,
                      mobileView: false,
                  }));
        };

        setResponsiveness();

        window.addEventListener('resize', () => setResponsiveness());
    }, []);

    const selectProject = () => {
        return (
            <>
                <TextFields
                    organizations={organizations}
                    handleCurrentOrganization={handleCurrentOrganization}
                />
            </>
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        router.push('/login');
    };

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                {selectProject()}
                <div className={classes.menuLinks}>
                    {getMenuButtons()}
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setViewPort((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setViewPort((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Drawer
                    {...{
                        anchor: 'left',
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>

                {isAssignedToProject && (
                    <>
                        <div>
                            <IconButton
                                {...{
                                    edge: 'start',
                                    color: 'inherit',
                                    'aria-label': 'menu',
                                    'aria-haspopup': 'true',
                                    onClick: handleDrawerOpen,
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>
                    </>
                )}
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
                        color: 'inherit',
                        style: { textDecoration: 'none' },
                    }}
                    key={label}
                >
                    <MenuItem>{label}</MenuItem>
                </Link>
            );
        }).concat(
            <MenuItem key="logout">
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            </MenuItem>
        );
    };

    const getMenuButtons = () => {
        return headersData.map(({ label, name, href }) => (
            <RenderMenuItem
                key={label}
                label={name}
                warnBeforeExit={state.general.warnBeforeExit}
                href={href}
                menuButton={menuButton}
            />
        ));
    };

    return (
        <>
            <header>
                <AppBar className={header} color="primary" position="fixed">
                    {mobileView ? displayMobile() : displayDesktop()}
                </AppBar>
            </header>
            {/* <WarnDialog open={state.general.openWarnModal} /> */}
        </>
    );
}

const RenderMenuItem = ({ label, warnBeforeExit, href, menuButton }) => {
    const handleOpenWarnModal = useOpenWarnModal();
    const { t } = useTranslation();
    return (
        <MenuItem>
            <Link
                href={href}
                {...{
                    component: RouterLink,
                    className: menuButton,
                    to: href,
                    color: 'inherit',
                    style: { textDecoration: 'none' },
                }}
            >
                {t(label)}
            </Link>
        </MenuItem>
    );
};
