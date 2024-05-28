export const isAuthorized = (projects, permissionType) => {
    if (projects.role && projects.role.permissions && projects.role.permissions.length !== 0) {
        let result = projects.role.permissions.find(permission => permissionType === permission.name);
        return result ? true : false  
    }
    return false
}

export const checkViewUIElementPermission = (permissionType, userProjects) => {
    return userProjects && userProjects.some((userProject) => isAuthorized(userProject, permissionType));
}

export const checkMultipleViewUIElementPermission = (permissionTypes, userProjects) => {
    let result = permissionTypes.map(permission => {
        return checkViewUIElementPermission(permission, userProjects)}
        )
    return result.every(item => item === false)
}

interface UserProject {
    id: number;
    role: {
      id: number;
      name: string;
      organization: any;
      permissions: {
        id: number;
        name: string;
      }[];
    };
    project: {
      id: number;
      name: string;
    };
}
  
interface UserProjectRolePermissionDetails {
    role: string;
    permission: string[];
    project: string;
}
  
 export const transformUserProject = (userProject: UserProject[]): UserProjectRolePermissionDetails[] => {
    const result: UserProjectRolePermissionDetails[] = [];
    userProject.forEach((user) => {
      const { role, project } = user;
      const { name: roleName, permissions } = role;
      const permissionNames = permissions.map((p) => p.name);
      result.push({
        role: roleName,
        permission: permissionNames,
        project: project.name,
      });
    });
    return result;
}

export const projectIds = (data) => {
  const result = [];
  if (data && data.userProject) {
  data.userProject.forEach((item) => {
    const { project } = item;
    project && result.push(project.id);
  });
  }
  return result;
}

export const getProjectIds = (data) => {
  if (!data || !Array.isArray(data)) {
      return [];
  }
  return data.map(item => item.id);
}


export const checkProjectPermission = (
  userProject: UserProject[],
  projectName: string,
  permissionName: string
): boolean  => {
  const projects = transformUserProject(userProject);
  const project = projects.find(
    (p) => p.project.toLowerCase() === projectName.toLowerCase()
  );
  if (!project) {
    return false;
  }
  return project.permission.includes(permissionName);
}


// get 
export const getProjectsWhereUserHasPermission = (userProjectData, permissionName) => {
  const projectNames = [];

  userProjectData.userProject.forEach((userProj) => {
    userProj.role.permissions.forEach((permission) => {
      if (permission.name === permissionName) {
        projectNames.push(userProj.project.name);
      }
    });
  });

  return projectNames;
}


export const doAnyProjectsExistForPermission = (userProjectData, permissionName, projectIds) => {
  const authorizedProjectNames = [];

  if (userProjectData && userProjectData.userProject) {
    userProjectData.userProject.forEach((userProj) => {
      userProj.role.permissions.forEach((permission) => {
        if (permission.name === permissionName) {

          authorizedProjectNames.push(userProj.project.id);
        }
      });
    });
  }

  return authorizedProjectNames.some((projectId) => projectIds.includes(projectId));
}


export const doesProjectExistForPermission = (userProjectData, permissionName, projectName) => {
  const projectNames = [];

  userProjectData.userProject.forEach((userProj) => {
    userProj.role.permission.forEach((permission) => {
      if (permission.name === permissionName) {
        projectNames.push(userProj.project.name);
      }
    });
  });

  return projectNames.includes(projectName);
}

export const checkPermissionOnProject = (userProjectData, permissionName, projectID) => {
  const projectIds = [];

  userProjectData.userProject.forEach((userProj) => {
    userProj.role.permissions.forEach((permission) => {
      if (permission.name === permissionName) {
        projectIds.push(userProj.project.id);
      }
    });
  });
  return projectIds.includes(projectID);
}
