import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {connectToDatabase} from '../db/db';
import {getDetails, getDetailsByClassId} from '../db/class-details';
import {getClassById} from '../db/classes';
import {getUserById} from '../db/users';

const DetailsScreen = ({route, navigation}) => {
  const [details, setDetails] = useState([]);
  const [students, setStudents] = useState([]);
  const [classInfor, setClassInfor] = useState(null);
  const classId = route.params.classId;

  const loadDetailsCallback = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      const result1 = await getDetailsByClassId(db, classId);
      const result2 = await getClassById(db, classId);
      const studentArray = [];
      for (let index = 0; index < result1.length; index++) {
        const student = await getUserById(db, result1[index].studentId);
        studentArray.push(student);
      }
      setClassInfor(result2);
      setDetails(result1);
      setStudents(studentArray);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDetailsCallback();
  }, [loadDetailsCallback]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Class details</Text>
      </View>

      <ScrollView style={styles.body}>
        <View style={styles.top}>
          <View style={styles.row}>
            <Text>ID:</Text>
            <Text style={styles.content}>{classId}</Text>
          </View>
          <View style={styles.row}>
            <Text>Name:</Text>
            <Text style={styles.content}>{classInfor?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text>Students </Text>
            <Text style={styles.content}>{classInfor?.students}</Text>
          </View>
        </View>

        {students.map((item, index) => (
          <View style={styles.item} key={index}>
            <View style={styles.row}>
              <Text>ID:</Text>
              <Text style={styles.content}>{item?.id}</Text>
            </View>
            <View style={styles.row}>
              <Text>Name:</Text>
              <Text style={styles.content}>{item?.name}</Text>
            </View>
            <View style={styles.row}>
              <Text>Dob </Text>
              <Text style={styles.content}>{item?.dob}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    margin: 20,
    flexDirection: 'row',
    gap: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 700,
    color: '#30357E',
    flex: 1,
    textAlign: 'center',
  },
  body: {marginHorizontal: 20},
  top: {
    backgroundColor: '#E9EEF7',
    padding: 20,
    borderRadius: 12,
    color: '#000',
    marginBottom: 20,
  },
  item: {
    padding: 20,
    borderRadius: 12,
    color: '#000',
    marginBottom: 20,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 5,
  },
  content: {
    color: '#30357E',
    fontWeight: 600,
  },
});
