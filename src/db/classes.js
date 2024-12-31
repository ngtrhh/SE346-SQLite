export const getClasses = async db => {
  try {
    const classes = [];
    const results = await db.executeSql('SELECT * FROM classes');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        classes.push(result.rows.item(index));
      }
    });
    return classes;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get all classes from database');
  }
};

export const getClassById = async (db, id) => {
  try {
    const classInfor = [];
    const results = await db.executeSql(`SELECT * FROM classes WHERE id=${id}`);
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        classInfor.push(result.rows.item(index));
      }
    });
    return classInfor[0];
  } catch (error) {
    console.error(error);
    throw Error('Failed to get class from database');
  }
};

export const addClasses = async (db, classes) => {
  const query =
    `
      INSERT INTO classes (name, students)
      VALUES ` + classes.map(u => `('${u.name}', ${u.students})`).join(',');

  try {
    return db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add classes');
  }
};
