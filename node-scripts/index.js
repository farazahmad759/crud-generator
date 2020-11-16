import fs from 'fs';
import dvFunctions from './functions.js';
import dvMigrations from './migrations/migrations.js';
import dvApis from './apis/apis.js';
let usersJson = dvFunctions.readSchema({ name: 'users.json' });
let usersMigration = dvMigrations.buildContent({ jsonData: usersJson });
dvFunctions.createFile({
  name: 'users',
  type: 'migration',
  dir: 'db/migrations/',
  preName: new Date().getTime() + '_create_table',
  postName: '',
  content: usersMigration,
});
let userApi = dvApis.buildContent({ jsonData: usersJson });
dvFunctions.createFile({
  name: 'index',
  type: 'api',
  dir: 'db/controllers/',
  preName: '',
  postName: '',
  content: userApi,
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
