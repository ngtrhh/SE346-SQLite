export const getUsers = async db => {
  try {
    const users = [];
    const results = await db.executeSql('SELECT * FROM users');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        users.push(result.rows.item(index));
      }
    });
    return users;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get all users from database');
  }
};

export const getUserById = async (db, id) => {
  try {
    const user = [];
    const results = await db.executeSql(`SELECT * FROM users WHERE id =${id}`);
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        user.push(result.rows.item(index));
      }
    });
    return user[0];
  } catch (error) {
    console.error(error);
    throw Error('Failed to get user from database');
  }
};

export const addUsers = async (db, users) => {
  const query =
    `
    INSERT INTO users (username, password, name, dob)
    VALUES ` +
    users
      .map(u => `('${u.username}', '${u.password}', '${u.name}', '${u.dob}')`)
      .join(',');

  try {
    return db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add users');
  }
};

export const login = async (db, username, password) => {
  try {
    const query = `
    SELECT username
    FROM users
    WHERE username = '${username}' AND password = '${password}'`;
    const results = await db.executeSql(query);

    if (results[0]?.rows?.length) return true;
    else return false;
  } catch (error) {
    console.error(error);
    throw Error('Failed to valid user from database');
  }
};
