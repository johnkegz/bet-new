import { palette } from '../palette';

const MuiTableCellTheme = {
    props: {
        size: 'small',
    },
    overrides: {
        root: {
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: palette.border.stroke,
            lineHeight: '1.6em',
            color: palette.text.primary,
        },
    }
}

export default MuiTableCellTheme;