import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const paletteDefinition: PaletteOptions = {
  type: 'dark',
  primary: {
    main: '#ABABAB',
    dark: '#000000',
    light: '#FFF',
    contrastText: '#606060',
  },
  secondary: {
    main: '#FFB13B',
    light: '#FFF',
    contrastText: '#FFF',
  },
  background: {
    default: '#373636',
  },
};

const themeDefinition: ThemeOptions = {
  palette: paletteDefinition,
};

export default createMuiTheme(themeDefinition);
