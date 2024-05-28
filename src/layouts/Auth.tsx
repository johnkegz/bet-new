import React, { ReactNode } from 'react'
import { makeStyles, Container } from '@material-ui/core';
import { palette } from '../theme/palette';

interface IProps {
    children: ReactNode;
}

const useStyles = makeStyles(() => ({
    main: {
        backgroundColor: palette.background.paper,
    }
}))

function Auth({ children }: IProps) {
    const classes = useStyles();
    return (
        <Container className={classes.main}>
            {children}
        </Container>
    )
}

export default Auth
