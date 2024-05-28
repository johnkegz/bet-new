import { Models } from '@rematch/core'
import users from './users'
import organizations from './organizations'
import invitations from './invitations'
import roles from './roles'
import modules from './modules'
import logs from './logs'
import activities from './activities'
import plots from './plots'
import projects from './projects'
import measurements from './measurements'
import plannedActivities from './plannedActivities'
import activityTemplates from './activityTemplates'
import treeSpecies from './treeSpecies'
import general from './general'
import table from './table'
import questionnaires from './questionaires'
import zones from './zones'
import table2 from './table2'
import dashboard from './dashboard'

export interface RootModel extends Models<RootModel> {
    users: typeof users;
    organizations: typeof organizations;
    invitations: typeof invitations;
    roles: typeof roles;
    modules: typeof modules;
    logs: typeof logs;
    activities: typeof activities;
    plots: typeof plots;
    projects: typeof projects;
    measurements: typeof measurements;
    plannedActivities: typeof plannedActivities;
    activityTemplates: typeof activityTemplates;
    treeSpecies: typeof treeSpecies;
    general: typeof general;
    table: typeof table;
    questionnaires: typeof questionnaires;
    zones: typeof zones;
    table2: typeof table2;
    dashboard: typeof dashboard;
}

export const models: RootModel = {
    users,
    organizations,
    invitations,
    roles,
    modules,
    logs,
    activities,
    plots,
    projects,
    measurements,
    plannedActivities,
    activityTemplates,
    treeSpecies,
    general,
    table,
    questionnaires,
    zones,
    table2,
    dashboard
}
