import React, { useState } from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';
import { palette } from '../../theme/palette';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';

import { checkForWarn, useOpenWarnModal } from '../../utilites/warnBeforeExit';
import LogoutIcon from './logoutIcon';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
    profileContainer: {
        height: '40px',
        color: palette.text.suppressed,
        zIndex: 1,
    },
    profileButtonClosed: {
        width: '100%',
        marginLeft: 'auto',
        height: '40px',
        display: 'flex',
        justifyContent: 'flex-start',
        textTransform: 'capitalize',
        color: palette.text.suppressed,
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: 'transparent', // Remove the hover background color
            borderColor: '#fff',
        },
    },
    profileButtonOpen: {
        width: '100%',
        marginLeft: 'auto',
        height: '40px',
        display: 'flex',
        justifyContent: 'flex-start',
        color: palette.text.suppressed,
        border: '1px solid #fff',
        borderBottom: 'none',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        textTransform: 'capitalize',

        '&:hover': {
            backgroundColor: 'transparent', // Remove the hover background color
            borderBottom: 'none',
            border: '1px solid #fff',
        },
    },
    profileDropDown: {
        marginLeft: 'auto',
        height: '40px',
        display: 'flex',
        justifyContent: 'flex-start',
        '&:hover': {
            backgroundColor: 'transparent', // Remove the hover background color
            border: 'none',
        },
        border: 'none',
    },
    accountBtnIcon: {
        width: '24px',
        height: '24px',
        marginRight: '10px',
        color: palette.primary.light,
    },
    userName: {
        cursor: 'pointer',
    },
    profileButton: {
        background: '#00802B',
        height: '55px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        borderLeft: '1px solid #fff',
        borderRight: '1px solid #fff',
    },
    signOutBtnContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    email: {
        fontSize: '10px',
        display: 'flex',
        justifyContent: 'flex-start',
        color: 'white',
        textTransform: 'lowercase',
        '@media (max-width: 390px)': {
            width: '80px',
            overflow: 'auto',
        },
    },
    signOutBtn: {
        marginTop: '10px',
        fontSize: '10px',
        background: '#fff',
        '&:hover': {
            color: '#fff',
            background: 'rgba(0, 128, 43, 0.1)',
        },
        '@media (max-width: 390px)': {
            marginTop: '-7px',
        },
    },
    signOutBtnText: {
        fontSize: '9px',
        marginLeft: '5px',
    },
    fadeIcon: {
        opacity: '0',
        marginRight: '10px',
    },
    userName2: {
        background: 'green',
    },
}));

export default function ProfileDropDown() {
    const [openHeaderModal, setOpenHeaderModal] = useState(false);
    const state = useSelector((state): any => state);
    const [isHovered, setIsHovered] = useState(false);
    const handleOpenWarnModal = useOpenWarnModal();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const router = useHistory();
    const classes = useStyles();
    const { t } = useTranslation()

    const handleNotification = (message: string, variant: VariantType) => {
        enqueueSnackbar(message, { variant });
    };

    const logout = () => {
        dispatch.users.logoutUser({
            onSuccess: () => {
                localStorage.removeItem('token');
                router.push('/auth/login');
                handleNotification('User logged out', 'success');
            },
            onError: () => {
                handleNotification(
                    'There has been an issue logging out',
                    'error'
                );
            },
        });
    };

    const handleLogout = () => {
        if (checkForWarn(state.general.warnBeforeExit))
            return handleOpenWarnModal(logout, true);
        return logout();
    };

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    const handleHeaderModal = () => {
        setOpenHeaderModal(!openHeaderModal);
    };

    return (
        <>
            <div className={classes.profileContainer}>
                <Button
                    variant="outlined"
                    color="primary"
                    className={`${
                        openHeaderModal
                            ? classes.profileButtonOpen
                            : classes.profileButtonClosed
                    }`}
                    onClick={handleHeaderModal}
                >
                    <AccountCircle
                        className={classes.accountBtnIcon}
                        color="secondary"
                    />
                    <Typography
                        onClick={handleHeaderModal}
                        className={classes.userName}
                    >
                        {state.users.user.lastName}
                    </Typography>
                </Button>
                {openHeaderModal && (
                    <div className={classes.profileButton}>
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.profileDropDown}
                            onClick={handleHeaderModal}
                        >
                            <AccountCircle
                                className={classes.fadeIcon}
                                color="secondary"
                            />
                            <Typography
                                onClick={handleHeaderModal}
                                className={classes.userName2}
                            >
                                <div className={classes.email}>
                                    {state.users.user.email}
                                </div>
                                <div className={classes.signOutBtnContainer}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={handleLogout}
                                        className={classes.signOutBtn}
                                        onMouseOver={handleMouseOver}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <LogoutIcon isHovered={isHovered} />
                                        <Typography
                                            onClick={handleHeaderModal}
                                            className={classes.signOutBtnText}
                                        >
                                            {t('signOut')}
                                        </Typography>
                                    </Button>
                                </div>
                            </Typography>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
