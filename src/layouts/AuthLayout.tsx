import React, { ReactNode } from 'react'
import treeoIcon from '../static/images/treeo.png'
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Grid } from '@material-ui/core'
import LanguageSwitcher from '../components/LanguageSwitcher';

interface IProps {
    children: ReactNode;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: '153.34px',
        height: '120px'
    },
}));

function AuthLayout({ children }: IProps) {
    const classes = useStyles();

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <LanguageSwitcher />
            <Grid item >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <div className={classes.avatar}>
                            <img src={treeoIcon} />
                        </div>
                        {children}
                    </div>
                </Container>
            </Grid>
        </Grid >
    )
}

export default AuthLayout

