import { generateFile, generateContent } from './migration-functions.js';
import fs from 'fs';
import dvFunctions from './functions.js';
dvFunctions.dvCreateFile({ name: 'new', dir: 'db/migrations/' });
// const schemaDirectory = 'dv-crud/schemas';

// fs.readdirSync(schemaDirectory).forEach((file) => {
//   console.log(file);
//   let rawdata = fs.readFileSync(schemaDirectory + '/' + file);
//   let jsonData = JSON.parse(rawdata);
//   let generatedContent = generateContent(jsonData);
//   generateFile(jsonData.tableName, generatedContent);
// });
