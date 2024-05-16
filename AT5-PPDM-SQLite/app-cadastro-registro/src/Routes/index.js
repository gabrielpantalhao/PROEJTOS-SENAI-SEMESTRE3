import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from 'react-native-vector-icons/FontAwesome6';

// Import das Páginas do projeto abaixo:

import Home from './stackRoutes';
import Pesquisa from '../pages/Pesquisa/pesquisa';
import ExibeTodos from '../pages/ExibeTodos/exibeTodos';

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'darkgray'
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="house" color={color} size={size}></FontAwesome>
                    }
                }}
            />
            <Tab.Screen
                name="Pesquisar"
                component={Pesquisa}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="magnifying-glass" color={color} size={size}></FontAwesome>
                    }
                }}
            />
            <Tab.Screen
                name="Todos Registros"
                component={ExibeTodos}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="earth-americas" color={color} size={size}></FontAwesome>
                    }
                }}
            />

        </Tab.Navigator>
    )
}