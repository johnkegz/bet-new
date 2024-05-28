import { pagePermissions } from "../../constants"
import { checkMultipleViewUIElementPermission, checkViewUIElementPermission } from "../permissionCheck"

export const switchTabsForestry = (userProject) =>  {
    let routes = []
    if(checkViewUIElementPermission(pagePermissions.forestry.activities[0], userProject)) {
        routes.push('/forestry/activities')
    }
    if(!checkMultipleViewUIElementPermission(pagePermissions.forestry.plannedActivities, userProject)) {
        routes.push('/forestry/planned-activities')
    }
    if(!checkMultipleViewUIElementPermission(pagePermissions.forestry.plots, userProject)) {
        //TODO: Differentiate edit and creat plot
        routes.push('/forestry/plots', '/forestry/createplot', '/forestry/editplot')
    }
    if(checkViewUIElementPermission(pagePermissions.forestry.activityTemplates[0], userProject)) {
        routes.push('/forestry/activity-templates')
    }
    if(checkViewUIElementPermission(pagePermissions.forestry.measurements[0], userProject)) {
        routes.push('/forestry/:id/measurements')
    }
    //TODO: Create view zone permission in the backend
    if(checkViewUIElementPermission(pagePermissions.forestry.activities[0], userProject)) {
        routes.push('/forestry/zones')
    }
    return routes
}

export const switchTabsForestryForTreeoUsers = () =>  {
    return [
        '/forestry/activities',
        '/forestry/planned-activities',
        //TODO: Differentiate edit and creat plot
        '/forestry/plots', '/forestry/createplot', '/forestry/editplot',
        '/forestry/activity-templates',
        '/forestry/:id/measurements',
        '/forestry/zones'
    ]
}

export const switchTabsPeople = (userProject) =>  {
    let routes = []
    if(!checkMultipleViewUIElementPermission(
        [
            ...pagePermissions.people.users,
            ...pagePermissions.people.roleAndPermissions,
        ],
        userProject
    )) {
        routes.push('/users')
    }
    return routes
}

export const switchTabsPeopleForTreeoUsers = () =>  {
    return ['/users']
}
