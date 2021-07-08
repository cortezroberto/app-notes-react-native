/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from './views/inicio';
import AgregarScreen from './views/agregar';
import ItemScreen from './views/item';
import ModificarScreen from './views/modificar'


const Stack = createStackNavigator();

const App = () => {

  const[host,setHost] = useState('http://192.168.1.110:3000');
  const [alumnos, setAlumnos] = useState([]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="inicioScreen" component={InicioScreen} />
        <Stack.Screen name="agregarScreen" component={AgregarScreen} />
        <Stack.Screen name="itemScreen" component={ItemScreen} />
        <Stack.Screen name="modificarScreen" component={ModificarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
export default App;
