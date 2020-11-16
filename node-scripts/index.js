import fs from 'fs';
import dvFunctions from './functions.js';
import dvMigrations from './migrations/migrations.js';
import dvApis from './apis/apis.js';
const schemaDirectory = 'db/schemas';

fs.readdirSync(schemaDirectory).forEach((file) => {
  let jsonSchema = dvFunctions.readSchema({ name: file });
  let usersMigration = dvMigrations.buildContent({ jsonData: jsonSchema });
  dvFunctions.createFile({
    name: jsonSchema.tableName,
    type: 'migration',
    dir: 'db/migrations/',
    timeStamp: new Date().getTime(),
    preName: 'create_table',
    postName: '',
    content: usersMigration,
  });
  let userApi = dvApis.buildContent({ jsonData: jsonSchema });
  Object.keys(userApi).map((key) => {
    dvFunctions.createFile({
      name: key,
      type: 'api',
      dir: 'db/controllers/',
      preName: '',
      postName: '',
      content: userApi[key],
      _jsonData: jsonSchema,
    });
  });
});

// let usersSchema = dvFunctions.readSchema({ name: 'users.json' });
// let usersMigration = dvMigrations.buildContent({ jsonData: usersSchema });
// dvFunctions.createFile({
//   name: 'users',
//   type: 'migration',
//   dir: 'db/migrations/',
//   timeStamp: new Date().getTime(),
//   preName: 'create_table',
//   postName: '',
//   content: usersMigration,
// });
// let userApi = dvApis.buildContent({ jsonData: usersSchema });
// Object.keys(userApi).map((key) => {
//   dvFunctions.createFile({
//     name: key,
//     type: 'api',
//     dir: 'db/controllers/',
//     preName: '',
//     postName: '',
//     content: userApi[key],
//     _jsonData: usersSchema,
//   });
// });
