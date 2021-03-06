import { createTheme, Theme, theme } from '@nextui-org/react';
import { darkCode, darkCodeLight, darkPrimary, darkSelection } from '../../constants';
import { getColor } from './getColor';

export const darkTheme: Theme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primary: getColor(darkPrimary, theme.colors.primary.value),
      selection: getColor(darkSelection, theme.colors.selection.value),
      code: getColor(darkCode, theme.colors.code.value),
      codeLight: getColor(darkCodeLight, theme.colors.codeLight.value),
    },
  },
});
