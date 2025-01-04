import {SCREEB_NAME} from '@configs/enums/ScreenName';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import QuestionScreen from '@screens/questionScreen';
import StartScreen from '@screens/startScreen';
import React from 'react';

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name={SCREEB_NAME.START} component={StartScreen} /> */}
        <Stack.Screen name={SCREEB_NAME.QUESTION} component={QuestionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
