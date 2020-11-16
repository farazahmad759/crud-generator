import fs from 'fs';
import dvFunctions from './functions.js';
import dvMigrations from './migrations/migrations.js';
import dvApis from './apis/apis.js';
let usersSchema = dvFunctions.readSchema({ name: 'users.json' });
let usersMigration = dvMigrations.buildContent({ jsonData: usersSchema });
dvFunctions.createFile({
  name: 'users',
  type: 'migration',
  dir: 'db/migrations/',
  timeStamp: new Date().getTime(),
  preName: 'create_table',
  postName: '',
  content: usersMigration,
});
let userApi = dvApis.buildContent({ jsonData: usersSchema });
Object.keys(userApi).map((key) => {
  dvFunctions.createFile({
    name: key,
    type: 'api',
    dir: 'db/controllers/',
    preName: '',
    postName: '',
    content: userApi[key],
    _jsonData: usersSchema,
  });
});

/**
 *
 */
// const schemaDirectory = 'dv-crud/schemas';

// fs.readdirSync(schemaDirectory).forEach((file) => {
//   console.log(file);
//   let rawdata = fs.readFileSync(schemaDirectory + '/' + file);
//   let jsonData = JSON.parse(rawdata);
//   let generatedContent = generateContent(jsonData);
//   generateFile(jsonData.tableName, generatedContent);
// });
