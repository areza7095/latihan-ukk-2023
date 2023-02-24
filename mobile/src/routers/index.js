import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Splash, Login, Home, Register, LihatPengaduan} from '../screens';
import KirimPengaduan from '../screens/kirimPengaduan';

const Stack = createNativeStackNavigator();

const Routers = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="LihatPengaduan" component={LihatPengaduan} />
      <Stack.Screen name="kirimPengaduan" component={KirimPengaduan} />
    </Stack.Navigator>
  );
};
export default Routers;
