export const restructureUserOrganizationAndProjects = (data) => {
    let organizationsAndProjects = data.map(item => {
        return {
            organization: item.project.organization,
            project: item.project
        }
    })
    let organizations = []
    for (let i = 0; i < organizationsAndProjects.length; i++) {
        if (organizations.find(item => item.organization.id === organizationsAndProjects[i].organization.id) === undefined) {
            organizations = [...organizations, {
                organization: organizationsAndProjects[i].organization,
                projects: [organizationsAndProjects[i].project]
            }]
        }
        else {
            let newData = organizations.map(item => {
                if (item.organization.id === organizationsAndProjects[i].organization.id) {
                    item.projects = [...item.projects, organizationsAndProjects[i].project];
                    return item
                }
                return item
            })
            organizations = [...newData]
        }
    }

    return organizations
}
