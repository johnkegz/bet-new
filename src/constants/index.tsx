export const plotStatuses = [
    { name: 'Recorded', id: 'recorded' }, 
    { name: 'Verified_tpi', id: 'verified_tpi' }, 
    { name: 'Verified_treeo', id: 'verified_treeo' }, 
    { name: 'Prepared', id: 'prepared' }, 
    { name: 'Planted', id: 'planted' }, 
    { name: 'Closed', id: 'closed' }, 
    { name: 'Rejected', id: 'rejected' }, 
    { name: 'Cancelled', id: 'cancelled' }
];

export const exportTypes = [
    { name: 'GeoJSON', value: 'GeoJSON' },
    { name: 'CSV', value: 'csv' },
]

export const exportPlotTypes = [
    { name: 'GeoJSON', value: 'GeoJSON' },
    { name: 'CSV', value: 'csv' },
    { name: 'ShapeFile', value: 'shapefile' },
    { name: 'KML', value: 'kml' },
]

export const pagePermissions = {
    forestry: {
        activities: ['Data browse all activities'],
        plannedActivities: ['list planned activities','create planned activity'],
        plots: ['Plots browse unassigned plots', 'Plots browse plots in project'],
        activityTemplates: ['list planned activities'],
        measurements: ['list measurements'],
        //TODO: Create view zone permission in the backend
        zones: ['Data browse all activities'],
    },
    people: {
        users: ['List All Users', 'Assign User First Role and Project'],
        roleAndPermissions: ['list roles'],
        profile: ['View Any User']
    }
}

export const activityStatuses = [
    {
        id: 'completed',
        name: 'completed',
    },
    {
        id: 'partially_recorded',
        name: 'partially_recorded',
    },
    {
        id: 'rejected',
        name: 'rejected',
    },
    {
        id: 'recorded',
        name: 'recorded',
    },
    {
        id: 'pre_approved',
        name: 'pre_approved',
    },
    {
        id: 'pre_rejected',
        name: 'pre_rejected',
    },
    {
        id: 'approved',
        name: 'approved',
    }
]

export const measurementStatuses = [
    {
        id: 'recorded',
        name: 'recorded',
    },
    {
        id: 'pre_approved',
        name: 'pre_approved',
    },
    {
        id: 'pre_rejected',
        name: 'pre_rejected',
    },
    {
        id: 'approved',
        name: 'approved',
    },
    {
        id: 'rejected',
        name: 'rejected',
    },
]

export const initialChecked = {
    project: false,
    eligibility: false,
    status: false,
    created: false,
    firstName: false,
    lastName: false,
    email: false,
    isActive: false,
    Organizations: false,
    Projects: false,
    PlotStatus: false,
    activityStatus: false,
    label: false,
    activityType: false,
    measurementStatus: false,
    measurementType: false,
    includeIgnored: false,
    zoneTypes: false,
    zoneSubTypes: false

}

export const initialFilters = {
    project: false,
    eligibility: false,
    status: '',
    created: false,
    firstName: '',
    lastName: '',
    email: '',
    isActive: '',
    Organizations: "",
    Projects: "",
    PlotStatus: "",
    activityStatus: "",
    label: "",
    activityType: "",
    measurementStatus: "",
    measurementType: "",
    zoneTypes: "",
    zoneSubTypes: "",
    measurementDate: ""
}

export const listOfActivityType = [
    { name: 'landSurvey', id: 'land_survey' }, 
    { name: 'questionnaire', id: 'questionnaire' }, 
    { name: 'oneTree', id: 'one_tree' }, 
    { name: 'treeSurvey', id: 'tree_survey' },
];

export const initialSinglePlot = {
    id: null,
    plotName: null,
    owner: {
        firstName: "",
        lastName: ""
    },
    externalId: null,
    area: null,
    status: null,
    ownerID: null,
    plotProject: [],
    plotNote: null,
    plotLabels: [],
    plotDistrict: null,
    plotVillage: null,
}

export const forestryPageTabNames = {
    tab1: 'Activities',
    tab2: 'Planned Activities',
    tab3: 'Plots',
    tab4: 'Measurements',
    tab5: 'Create plot',
    tab6: 'Edit plot',
    tab7: 'Activity Templates',
    tab8: 'Zones',
};

export const plannedStatuses = [
    { name: 'Planned', id: 'planned' }, 
    { name: 'Completed', id: 'completed' }
];

export const plannedTypes = [
    { name: 'Adhoc', id: 'adhoc' }, 
    { name: 'Onetime', id: 'onetime' }
];

export const zoneTypes = [
    { name: 'Grassland', id: 'grassland' }, 
    { name: 'Shurbland', id: 'shurbland' }, 
    { name: 'Cropland', id: 'cropland' }, 
];

export const zoneSubTypes = [
    { name: 'Go Zones', id: 'go_zone' }, 
    { name: 'No Go Zones', id: 'no_go_zone' }
];

export const treeHealth = [
    {name: 'Good', id: 'good'},
    {name: 'Dead', id: 'dead'},
    {name: 'Bad', id: 'bad'},
    {name: 'Growing', id: 'growing'},
]

//Activities filter
export const activitiesFilters = [
    {
        label: 'organizations',
        name: 'organizations',
        inputType: 'dropDown'
    },
    {
        label: 'projects',
        name: 'projects',
        inputType: 'dropDown'
    },
    {
        label: 'activityType',
        name: 'activityType',
        inputType: 'dropDown'
    },
    {
        label: 'performedBy',
        name: 'performedBy',
        inputType: 'textField'
    },
    {
        label: 'status',
        name: 'activityStatus',
        inputType: 'dropDown'
    },
    {
        label: 'plotID',
        name: 'plotID',
        inputType: 'textField'
    },
    {
        label: 'label',
        name: 'label',
        inputType: 'dropDown'
    },
    {
        label: 'syncedDate',
        name: 'syncedDate',
        inputType: 'date'
    },
    {
        label: 'startDate',
        name: 'startDate',
        inputType: 'date'
    },
    {
        label: 'endDate',
        name: 'endDate',
        inputType: 'date'
    },
];

export const getErrorMessageKey = (error) => {
    switch (error) {
        case "User not found":
            return "errors.userNotFound";
        case "Incorrect password":
            return "errors.incorrectPassword";
        case "Network error":
            return "errors.networkError";
        case "Invalid credentials":
            return "errors.invalidCredentials";
        case "User has been created":
            return "errors.userHasBeenCreated";
        default:
            return "errors.unknownError";
    }
};
