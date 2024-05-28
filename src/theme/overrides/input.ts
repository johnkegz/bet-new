import { palette } from '../palette';

const MuiInputTheme = {
    props: {},
    overrides: {
        root: {
            color: palette.text.primary
        },
        colorSecondary: {
            color: palette.text.secondary 
        }
    }
}

export default MuiInputTheme;