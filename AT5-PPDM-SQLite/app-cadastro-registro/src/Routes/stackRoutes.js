import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home2 from '../pages/Home/home'
import Cadastro from '../pages/Cadastro/cadastro'
import Editar from '../pages/Editar/editar'

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="home2"
                component={Home2}
                options={{
                    headerShown: false
                }}
            />
            
            <Stack.Screen
                name="Cadastro"
                component={Cadastro}
            />

            <Stack.Screen 
                name="Editar Registro"
                component={Editar}
            />
        </Stack.Navigator>
    )
}