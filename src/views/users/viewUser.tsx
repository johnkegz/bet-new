import React from 'react';
import { useParams } from 'react-router-dom';

import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
        },
    }),
);


const  ViewUser = () => {
    const classes = useStyles();
    const getParam: any = useParams()

    return(
        <div className={classes.root}>
            {getParam.username}
        </div>

    )
}

export default ViewUser;
