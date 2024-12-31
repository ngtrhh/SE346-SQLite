import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

enablePromise(true);

export const connectToDatabase = async () => {
  return openDatabase({name: 'classes-data.db', location: 'default'});
};

export const createTables = async db => {
  const usersQuery = `
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    name TEXT,
    dob TEXT
  )`;
  const classesQuery = `
  CREATE TABLE IF NOT EXISTS classes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    students INTEGER
  )`;

  const classDetailsQuery = `
  CREATE TABLE IF NOT EXISTS classDetails(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    classId INTEGER,
    studentId INTEGER,
    FOREIGN KEY(classId) REFERENCES classes(id),
    FOREIGN KEY(studentId) REFERENCES users(id)
  )
    `;

  try {
    await db.executeSql(usersQuery);
    await db.executeSql(classesQuery);
    await db.executeSql(classDetailsQuery);
  } catch (error) {
    console.error(error);
    throw Error('Failed to create tables');
  }
};
