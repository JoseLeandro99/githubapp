import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import User from './pages/User';
import Main from './pages/Main';

export default createAppContainer(
  createStackNavigator({
    Main,
    User,
  },{
    headerLayoutPreset: 'center',
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#7159c1',
      },
      headerTintColor: '#ffffff',
    }
  }),
);
