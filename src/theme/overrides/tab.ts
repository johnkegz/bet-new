import { palette } from '../palette';

const MuiTabTheme = {
    props: {
    },
    overrides: {
        root: {
            minHeight: '40px',
            fontSize: '14px',
            padding: '6px 15px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: palette.border.divider,
            backgroundColor: palette.background.paper,
            color: palette.text.secondary,
            '&$selected': {
                backgroundColor: palette.primary.lightBg,
                color: palette.text.primary,
            },
            '&$disabled': {
                backgroundColor: palette.action.disabled,
                color: palette.text.disabled,
            },
            '&:hover': {
                color: palette.text.primary,
            },
        },
        textColorInherit: {
            color: palette.text.secondary,
            opacity: 1,
        },
        textColorPrimary: {
            border: '0 none',
            backgroundColor: palette.primary.main,
            color: palette.text.white,
        },
        textColorSecondary: {
            border: '0 none',
            backgroundColor: palette.secondary.main,
            color: palette.text.white,
        },
    }
}

export default MuiTabTheme;