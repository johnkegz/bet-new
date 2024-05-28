//import { palette } from '../palette';

import { palette } from "../palette";

const MuiFormControlTheme = {
    props: {},
    overrides: {
        root: {
        },
        standard: {
            borderColor: palette.border.strokeDark
        },
        filled: {
            borderColor: palette.border.strokeDark,
            backgroundColor: palette.background.level1
        },
        outlined: {
            borderColor: palette.border.stroke
        }
    }
}

export default MuiFormControlTheme;