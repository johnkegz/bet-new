export const  getConfigurationData = (activityType, configuration, speciesData) => {
  let configurationData = {};
  if (activityType === 'land_survey') {
    configurationData = {
      gpsAccuracyThreshold: configuration.gpsAccuracyThreshold,
      soilPhotoRequired: configuration.soilPhotoRequired,
      imageCompressionRequired: configuration.imageCompressionRequired,
    };
  } else if (activityType === 'tree_survey') {
    configurationData = {
      gpsAccuracyThreshold: configuration.gpsAccuracyThreshold,
      groundCoverRequired: configuration.groundCoverRequired,
      stopMeasurementsOutsidePlot: configuration.stopMeasurementsOutsidePlot,
      addTreeSpecies: configuration.addTreeSpecies,
      manualDBH: configuration.manualDBH,
      treeHealth: configuration.treeHealth,
      treeComment: configuration.treeComment,
      manualHeight: configuration.manualHeight,
      specie_codes: speciesData,
    }; 
  } else {
    configurationData = {
      gpsAccuracyThreshold: configuration.gpsAccuracyThreshold,
      manualDBH: configuration.manualDBH,
      treeHealth: configuration.treeHealth,
      treeComment: configuration.treeComment,
      manualHeight: configuration.manualHeight,
      specie_codes: speciesData,
    };
  }
  return configurationData;
}

const filterObjectByValue = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => {
      console.log(`Checking key ${key}`);
      return value !== '';
    })
  );
}

export const createLocalizedObject = (title, description)=> {

    const localizedTitle = {
      'en-GB': title.enGB,
      'es-ES': title.esES,
      'in-ID': title.inID,
      'lg-UG': title.lgUG,
      'fr-FR': title.frFR,
      'de-DE': title.deDE,
      'sw-KE': title.swKE,
      'hr-HR': title.hrHR,
      'pt-PT': title.ptPT
    };

    const localizedDescription = {
      'en-GB': description.enGB,
      'es-ES': description.esES,
      'in-ID': description.inID,
      'lg-UG': description.lgUG,
      'fr-FR': description.frFR,
      'de-DE': description.deDE,
      'sw-KE': description.swKE,
      'hr-HR': description.hrHR,
      'pt-PT': description.ptPT
    };

    const filteredTitle = filterObjectByValue(localizedTitle);
    const filteredDescription = filterObjectByValue(localizedDescription);

    return {
      title: filteredTitle,
      description: filteredDescription,
    };
 }

 export const getProjectName = (id, store) => {
    const res = store.users.userProjects.find(item => item.id === id);
    if (res && res.name) return res.name
    return ""
}

export const getTitle = (title) => {
    let newTitle = ""
    if (!title) return newTitle
    if (Object.keys(title).includes('en-GB')) {
        newTitle = title['en-GB']
    }
    if (Object.keys(title).includes('en')) {
        newTitle = title['en']
    }
    return newTitle;
}
