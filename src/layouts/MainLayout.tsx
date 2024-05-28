import React, { ReactNode, useEffect } from 'react';
import { makeStyles, Container } from '@material-ui/core/';
import { palette } from '../theme/palette';
import { store } from '../redux/rematch';
import { VariantType, useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
// import { checkValidToken } from '../views/common/auth';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header/index';
// import WelcomeScreen from '../components/WelcomeScreen';

interface IProps {
    children: ReactNode;
}

const useStyles = makeStyles({
    main: {
        margin: 0,
        zIndex: 1,
        backgroundColor: palette.background.paper,
    },
});

function MainLayout({ children }: IProps) {
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar()
    const router = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state: any) => state);
    const handleNotification = (message: string, variant: VariantType) => {
        enqueueSnackbar(message, { variant })
    }

    useEffect(() => {
        const authenticated =
            (store && store.getState().users.auth.token) ||
            localStorage.getItem('token') ||
            false
        if (!authenticated) {
            router.push(`/auth/login`, { url: router.location.pathname })
            handleNotification('Kindly login to access Treeo', 'error')
        }
    }, [])

    React.useEffect(() => {
        // if (router.location.pathname !== '/auth/login') {
        //     if (!checkValidToken().status) {
        //         dispatch.users.unSetAuthStatus()
        //         router.push(`/auth/login`, { url: router.location.pathname })
        //     } else {
        //         dispatch.users.setAuthStatus(checkValidToken())
        //     }
        // }
    }, [router.location.pathname])

    const returnMessagePlaceholders = (): string[] => {
        if(state.users.user.userProject && state.users.user.userProject.length === 0){
            return ["have any assigned project", "a project"]
        }
        if([...state.users.forestryTabRoutes, ...state.users.peopleTabRoutes].length === 0){
            return ["access permissions to TREEO cloud", "access permissions"]
        }
        return ["N/A","N/A"]
    }

    return (
        <Container component="main" className={classes.main}>
            <Header />
            {/* {state.users.user.userProject && (state.users.user.userProject.length === 0 || 
            [...state.users.forestryTabRoutes, ...state.users.peopleTabRoutes].length === 0) && 
            <WelcomeScreen 
                email={state.users.data.currentUser && state.users.data.currentUser.email} 
                message={returnMessagePlaceholders()}
            />} */}
            {children}
        </Container>
    )
}

export default MainLayout
