import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {connectToDatabase, createTables} from './src/db/db';
import {addUsers, getUsers} from './src/db/users';
import {addClasses, getClasses} from './src/db/classes';
import {addDetails, getDetails} from './src/db/class-details';

import ClassScreen from './src/screens/ClassScreen';
import LoginScreen from './src/screens/LoginScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const loadDataCallback = useCallback(async () => {
    try {
      const initUsers = [
        {
          username: 'admin',
          password: '123456',
          name: 'Admin',
          dob: '01/01/2000',
        },
        {
          username: 'student1',
          password: '123456',
          name: 'Nguyen A',
          dob: '12/07/2002',
        },
        {
          username: 'student2',
          password: '123456',
          name: 'Tran B',
          dob: '23/09/1998',
        },
        {
          username: 'student3',
          password: '123456',
          name: 'Le C',
          dob: '06/02/2001',
        },
      ];

      const initClasses = [
        {name: 'Class 1', students: 50},
        {name: 'Class 2', students: 100},
        {name: 'Class 3', students: 20},
        {name: 'Class 4', students: 35},
      ];

      const initDetails = [
        {classId: 1, studentId: 1},
        {classId: 1, studentId: 2},
        {classId: 1, studentId: 3},
        {classId: 1, studentId: 4},
        {classId: 2, studentId: 1},
        {classId: 2, studentId: 3},
        {classId: 3, studentId: 1},
        {classId: 3, studentId: 2},
        {classId: 3, studentId: 4},
        {classId: 4, studentId: 1},
      ];

      const db = await connectToDatabase();
      await createTables(db);
      //Add users
      const storedUsers = await getUsers(db);
      if (storedUsers.length == 0) await addUsers(db, initUsers);

      //Add classes
      const storedClasses = await getClasses(db);
      if (storedClasses.length == 0) await addClasses(db, initClasses);

      //Add class details
      const storedDetails = await getDetails(db);
      if (storedDetails.length == 0) await addDetails(db, initDetails);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ClassScreen"
          component={ClassScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
