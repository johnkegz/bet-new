/*
export { default as blue } from './blue';
export { default as common } from './common';
export { default as green } from './green';
export { default as grey } from './grey';
export { default as orange } from './orange';
export { default as red } from './red';
export { default as yellow } from './yellow';
*/

import blue from './blue';
import common from './common';
import green from './green';
import grey from './grey';
import orange from './orange';
import red from './red';
import yellow from './yellow';

const colors = {
    blue: blue,
    common: common,
    green: green,
    grey: grey,
    orange: orange,
    red: red,
    yellow: yellow
}

export default colors;
