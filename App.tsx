import React from 'react';
import RootNavigation from './src/routes/RootNavigation';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const CombinedTheme = {
  ...DefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    background: 'white',
  },
};
const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={CombinedTheme}>
        <NavigationContainer theme={CombinedTheme}>
          <RootNavigation />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
