import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Pressable} from 'react-native';

import {connectToDatabase} from '../db/db';
import {login} from '../db/users';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username) {
      alert('Please fill username');
      return;
    }
    if (!password) {
      alert('Please fill password');
      return;
    }

    try {
      const db = await connectToDatabase();
      const result = await login(db, username, password);
      if (result) navigation.replace('ClassScreen');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Username</Text>
          </View>
          <View>
            <TextInput
              placeholder="Type your username"
              style={styles.input}
              value={username}
              onChangeText={text => setUsername(text)}
              autoFocus
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Password</Text>
          </View>
          <View>
            <TextInput
              placeholder="Type your password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
            />
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.text}>LOGIN</Text>
          </Pressable>
        </View>
      </View>
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
  body: {},
  row: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  title: {marginBottom: 4},
  titleText: {
    color: '#2E2F3B',
    fontWeight: 500,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#F7F9FC',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#30357E',
    padding: 12,
    alignItems: 'center',
    width: '60%',
    marginVertical: 20,
    shadowColor: '#30357E',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  text: {
    color: 'white',
    fontWeight: 600,
    fontSize: 16,
  },
});

export default LoginScreen;
