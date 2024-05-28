import { createTheme } from '@material-ui/core'
import { palette } from './palette';
import { themeProps, themeOverrides } from './overrides';

const theme = createTheme({ palette });

theme.props = themeProps;
theme.overrides = themeOverrides;

export default theme;