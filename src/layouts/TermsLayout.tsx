import React, { ReactNode } from 'react'
import treeoIcon from '../static/images/treeo.png'
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
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
        margin: '20px',
        // width: '153.34px',
        height: '120px',
        cursor: 'pointer'
    },
}));

function TermsLayout({ children }: IProps) {
    const classes = useStyles();
    const router = useHistory()

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item >
                <Container component="main" maxWidth="lg" >
                    <CssBaseline />
                    <div className={classes.paper}>
                    <LanguageSwitcher />
                        <div className={classes.avatar}  onClick={() => router.push('/')}>
                            <img src={treeoIcon} />
                        </div>
                        {children}
                    </div>
                </Container>
            </Grid>
        </Grid >
    )
}

export default TermsLayout

