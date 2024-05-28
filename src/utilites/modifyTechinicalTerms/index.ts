export const modifyMeasurementTypes = (measurementType) => {
    if (measurementType === 'tree_evidence') return 'Tree Picture';
    if (measurementType === 'tree_evidence_rejected')
        return 'Tree Picture Rejected';
    if (measurementType === 'tree_measurement_auto_rejected')
        return 'DBH Rejected';
    if (measurementType === 'tree_measurement_auto_not_detected')
        return 'DBH Not Detected';
    if (measurementType === 'tree_measurement_auto') return 'DBH Detected';
    if (measurementType === 'tree_measurement_manual') return 'DBH Manual';
    if (measurementType === 'ground_cover') return 'Ground Cover';
    if (measurementType === 'photo') return 'Photo';
    if (measurementType === 'land_photo') return 'Land Photo';
    if (measurementType === 'soil_photo') return 'Soil Photo';

    return measurementType;
};

export const reverseModifiedMeasurementTypes = (measurementType) => {
    if (measurementType === 'Tree Picture') return 'tree_evidence';
    if (measurementType === 'Tree Picture Rejected')
        return 'tree_evidence_rejected';
    if (measurementType === 'DBH Rejected')
        return 'tree_measurement_auto_rejected';
    if (measurementType === 'DBH Not Detected')
        return 'tree_measurement_auto_not_detected';
    if (measurementType === 'DBH Detected') return 'tree_measurement_auto';
    if (measurementType === 'DBH Manual') return 'tree_measurement_manual';
    if (measurementType === 'Ground Cover') return 'ground_cover';
    if (measurementType === 'Photo') return 'photo';
    if (measurementType === 'Land Photo') return 'land_photo';
    if (measurementType === 'Soil Photo') return 'soil_photo';

    return measurementType;
};
