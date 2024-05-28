import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PlannedActivities from '../../../components/plannedActivities';
import { handlefilterUserPlannedActivities } from '../../../utilites/filters/filterPlannedActivities';
import { useStyles } from '../../common/utils';
import ErrorPage from '../../../components/ErrorPage';

function UserPlannedActivities(props: any) {
    const [isGettingUserPlannedActivties, setIsGettingUserPlannedActivties] = React.useState(false);
    const dispatch = useDispatch();
    const router = useHistory();
    const classes = useStyles();
    const store: any = useSelector(state => state)

    let routeInfo = router.location.pathname.split('/');

    useEffect(() => {
        props.setPlannedActivitiesSummary({})
        if (props.tab === 4) {
            handlefilterUserPlannedActivities({page:1, dispatch: dispatch, setIsGettingUserPlannedActivties: setIsGettingUserPlannedActivties,  userId: routeInfo[3]})
        }
    }, [props.tab])

    const handleChange = (event, value) => {
        handlefilterUserPlannedActivities({page: value, dispatch: dispatch, setIsGettingUserPlannedActivties: setIsGettingUserPlannedActivties,  userId: routeInfo[3]})
    };

    if (isGettingUserPlannedActivties) return <ErrorPage statusText={'loading'}/>
    return (<>
        <PlannedActivities {...props} data={store.plannedActivities.userPlannedActivities.rows || []} />
        <div className={classes.activityTableSectionFooter}>
            <Pagination
                count={store.plannedActivities.userPlannedActivities.totalPages}
                page={store.plannedActivities.userPlannedActivities.currentPage}
                color="primary"
                onChange={handleChange}
                disabled={isGettingUserPlannedActivties}
            />
        </div>
    </>)
}

export default UserPlannedActivities;
