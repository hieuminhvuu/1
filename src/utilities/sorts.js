/**
 *
 * @param {*} array
 * @param {*} order
 * @param {*} key
 * @returns
 *
 * Order an array of object based on another array order.
 */

const mapOrder = (array, order, key) => {
    array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
    return array;
};

export { mapOrder };
