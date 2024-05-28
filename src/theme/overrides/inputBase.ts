import { palette } from '../palette';

const MuiInputBaseTheme = {
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

export default MuiInputBaseTheme;