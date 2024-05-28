export function compareArraysOfObjects(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Sort the arrays based on a common property (optional)
    // arr1.sort((a, b) => a.id - b.id);
    // arr2.sort((a, b) => a.id - b.id);

    for (let i = 0; i < arr1.length; i++) {
        const obj1 = arr1[i];
        const obj2 = arr2[i];

        // Compare properties of each object
        for (let key in obj1) {
        if (obj1[key] !== obj2[key] || typeof obj1[key] !== typeof obj2[key]) {
            return false;
        }
        }
    }

    return true;
    }
