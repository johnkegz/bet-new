import { Models } from '@rematch/core'
import users from './users'
import roles from './roles'
import plots from './plots'
import projects from './projects'
import general from './general'
import dashboard from './dashboard'

export interface RootModel extends Models<RootModel> {
    users: typeof users;
    roles: typeof roles;
    plots: typeof plots;
    projects: typeof projects;
    general: typeof general;
    dashboard: typeof dashboard;
}

export const models: RootModel = {
    users,
    roles,
    plots,
    projects,
    general,
    dashboard
}
