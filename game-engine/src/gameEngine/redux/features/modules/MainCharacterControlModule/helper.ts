export const isObjectDeepEqual = (object1: Object, object2: Object): boolean => {
    return JSON.stringify(object1) === JSON.stringify(object2);
};