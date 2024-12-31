export const getDetails = async db => {
  try {
    const details = [];
    const results = await db.executeSql('SELECT * FROM classDetails');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        details.push(result.rows.item(index));
      }
    });
    return details;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get all class details from database');
  }
};

export const getDetailsByClassId = async (db, id) => {
  try {
    const details = [];
    const results = await db.executeSql(`SELECT * FROM classDetails WHERE classId = ${id}`);
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        details.push(result.rows.item(index));
      }
    });
    return details;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get all class details from database');
  }
};

export const addDetails = async (db, details) => {
  const query =
    `
    INSERT INTO classDetails (classId, studentId)
    VALUES ` + details.map(u => `(${u.classId}, ${u.studentId})`).join(',');

  try {
    return db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add class details');
  }
};
