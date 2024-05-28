// import { palette } from '../palette';

const MuiTabsTheme = {
    props: {
    },
    overrides: {
        root: {
            borderRadius: 0,
            '&, & > *': {
                lineHeight: '1',
            }, 
            '& button': {
                boxSizing: 'border-box',
            },
            '& button + button': {
                borderLeft: '0 none',
            },
            '&.rounded, &.roundedTop, &.roundedLeft': {
                '& button:first-child': {
                    borderTopLeftRadius: '5px',
                },
            },
            '&.rounded, &.roundedTop, &.roundedRight': {
                '& button:last-child': {
                    borderTopRightRadius: '5px',
                },
            }, 
            '&.rounded, &.roundedBottom, &.roundedLeft': {
                '& button:first-child': {
                    borderBottomLeftRadius: '5px',
                },
            },
            '&.rounded, &.roundedBottom, &.roundedRight': {
                '& button:last-child': {
                    borderBottomRightRadius: '5px',
                },
            }, 
            '&.sizeSmall': {
                '& > *:first-child, & > *:first-child > *:first-child': {
                    height: '34px',
                },
                '& button': {
                    minWidth: 'auto',
                    minHeight: '32px',
                    fontSize: '13px',
                    padding: '4px 8px',
                    '& .MuiTab-wrapper': {
                        height: '24px !important',
                    }
                }
            },
            '&.sizeLarge': {
                '& > *:first-child, & > *:first-child > *:first-child': {
                    height: '58px',
                },
                '& button': {
                    minHeight: '56px',
                    fontSize: '16px',
                    padding: '9px 20px', 
                    '& .MuiTab-wrapper': {
                        height: '38px !important',
                    }
                }
            },
        },
    }
}

export default MuiTabsTheme;