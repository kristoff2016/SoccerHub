/**
 * @format
 */

import {AppRegistry} from 'react-native';
import StateProvider from './src/containers/stateProvider';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => StateProvider);
