import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return <SafeAreaProvider>
    <HomeScreen />
  </SafeAreaProvider>;
}
