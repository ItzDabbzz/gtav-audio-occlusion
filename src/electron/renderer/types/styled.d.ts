import 'styled-components';
import { AppTheme } from '../styles/themes';

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends AppTheme {}
}
