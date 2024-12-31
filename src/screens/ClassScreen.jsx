import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {connectToDatabase} from '../db/db';
import {getClasses} from '../db/classes';

const ClassScreen = ({navigation}) => {
  const [classes, setClasses] = useState([]);

  const loadClassesCallback = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      const result = await getClasses(db);
      setClasses(result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadClassesCallback();
  }, [loadClassesCallback]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Classes</Text>
      </View>
      <ScrollView style={styles.body}>
        {classes.map((item, index) => (
          <TouchableOpacity
            style={styles.item}
            key={index}
            onPress={() =>
              navigation.push('DetailsScreen', {classId: item?.id})
            }>
            <View style={{flex: 1}}>
              <View style={styles.row}>
                <Text>ID:</Text>
                <Text style={styles.content}>{item?.id}</Text>
              </View>
              <View style={styles.row}>
                <Text>Name:</Text>
                <Text style={styles.content}>{item?.name}</Text>
              </View>
              <View style={styles.row}>
                <Text>Students:</Text>
                <Text style={styles.content}>{item?.students}</Text>
              </View>
            </View>
            <View>
              <Text>#{index + 1}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    margin: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 700,
    color: '#30357E',
  },
  body: {marginHorizontal: 20},
  item: {
    backgroundColor: '#E9EEF7',
    padding: 20,
    borderRadius: 12,
    color: '#000',
    marginBottom: 20,
    flexDirection: 'row',
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

export default ClassScreen;
