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

    const { enqueueSnackbar } = useSnackbar();
    const router = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state);
    const handleNotification = (message: string, variant: VariantType) => {
        enqueueSnackbar(message, { variant });
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            return router.push('/login');
        }
        dispatch.general.getProfile({
            onSuccess: (res) => {
                console.log('John John John0werwew ++++>', res);
                // setData(res)
            },
            onError: (eee) => {
                // handle error
            },
        });

        // dispatch.general.getSet({
        //     onSuccess: (res) => {
        //         console.log('John John John0werwew ++++>', res);
        //         // setData(res)
        //     },
        //     onError: (eee) => {
        //         // handle error
        //     },
        // });
    }, []);

    return (
        <Container component="main" className={classes.main}>
            <Header />
            {children}
        </Container>
    );
}

export default MainLayout;
