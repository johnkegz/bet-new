import { palette } from '../palette';

const MuiButtonTheme = {
    props: {
        disableElevation: true
    },
    overrides: {
        root: {
            fontFamily: 'Roboto',    
        },
        contained: {
            border: '0 none',
            color: palette.text.white,
            "&.error": { 
                backgroundColor: palette.error.main,
                "&.hover": { backgroundColor: palette.error.dark }
            },
            "&.warning": { 
                backgroundColor: palette.warning.main,
                "&.hover": { backgroundColor: palette.warning.dark }
            },
            "&.success": { 
                backgroundColor: palette.success.main,
                "&.hover": { backgroundColor: palette.success.dark }
            },
            "&.info": { 
                backgroundColor: palette.info.main,
                "&.hover": { backgroundColor: palette.info.dark }
            },
        },
        containedPrimary: {
            backgroundColor: palette.primary.main,
            "&:hover": { backgroundColor: palette.primary.dark }
        },
        containedSecondary: {
            backgroundColor: palette.secondary.main,
            "&:hover": { backgroundColor: palette.secondary.dark }
        },
        outlined: {
            backgroundColor: 'transparent',
            "&.error": { 
                color: palette.error.main,
                borderColor: palette.error.light,
                "&:hover": { 
                    borderColor: palette.error.light,
                    backgroundColor: palette.error.light,
                    color: palette.text.white
                }  
            },
            "&.warning": { 
                color: palette.warning.main,
                borderColor: palette.warning.light,
                "&:hover": { 
                    borderColor: palette.warning.light,
                    backgroundColor: palette.warning.light,
                    color: palette.text.white
                }  
            },
            "&.success": { 
                color: palette.success.main,
                borderColor: palette.success.light,
                "&:hover": { 
                    borderColor: palette.success.light,
                    backgroundColor: palette.success.light,
                    color: palette.text.white
                }  
            },
            "&.info": { 
                color: palette.info.main,
                borderColor: palette.info.light,
                "&:hover": { 
                    borderColor: palette.info.light,
                    backgroundColor: palette.info.light,
                    color: palette.text.white
                }  
            },
        },
        outlinedPrimary: {
            color: palette.primary.main,
            borderColor: palette.primary.light,
            "&:hover": { 
                borderColor: palette.primary.light,
                backgroundColor: palette.primary.light,
                color: palette.text.white
            }    
        },
        outlinedSecondary: {
            color: palette.secondary.main,
            borderColor: palette.secondary.light,
            "&:hover": { 
                borderColor: palette.secondary.light,
                backgroundColor: palette.secondary.light,
                color: palette.text.white
            }   
        },
        text: {
            border: '0 none',
            "&.error": { 
                backgroundColor: palette.error.lightBg,
                color: palette.error.textDark,
                "&:hover": { 
                    backgroundColor: palette.error.light,
                    color: palette.text.white,
                 }
            },
            "&.warning": { 
                backgroundColor: palette.warning.lightBg,
                color: palette.warning.textDark,
                "&:hover": { 
                    backgroundColor: palette.warning.light,
                    color: palette.text.white,
                 } 
            },
            "&.success": { 
                backgroundColor: palette.success.lightBg,
                color: palette.success.textDark,
                "&:hover": { 
                    backgroundColor: palette.success.light,
                    color: palette.text.white,
                 } 
            },
            "&.info": { 
                backgroundColor: palette.info.lightBg,
                color: palette.info.textDark,
                "&:hover": { 
                    backgroundColor: palette.info.light,
                    color: palette.text.white,
                 } 
            },
        },
        textPrimary: {
            backgroundColor: palette.primary.lightBg,
            color: palette.primary.textDark,
            "&:hover": { 
                backgroundColor: palette.primary.light,
                color: palette.text.white,
            }
        },
        textSecondary: {
            backgroundColor: palette.secondary.lightBg,
            color: palette.secondary.textDark,
            "&:hover": { 
                backgroundColor: palette.secondary.light,
                color: palette.text.white,
            }
        },
    }
}

export default MuiButtonTheme;