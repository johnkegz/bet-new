import { palette } from '../palette';

const MuiTableRowTheme = {
    props: {
        hover: true,
    },
    overrides: {
        root: {
            '&:nth-child(even)': {
                backgroundColor: palette.background.paper,
            },
            '&:nth-child(odd)': {
                backgroundColor: palette.background.default,
            },
            '&.disabled': {
                backgroundColor: palette.action.disabled,
                '& .MuiTableCell-root': {
                    color: palette.text.disabled,
                }
            }
        },
        head: {
            '&, &:nth-child(n)': {
                backgroundColor: palette.background.paper,
            }
        },
        selected: {
            backgroundColor: palette.action.selected,
        },
        hover: {
            backgroundColor: palette.action.hover,
        }
    }
}

export default MuiTableRowTheme;