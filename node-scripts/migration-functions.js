import fs from 'fs';
export function generateContent(jsonData) {
  let content = `exports.up = function (knex) {
    return knex.schema.createTable('${jsonData.tableName}', function (table) {
      table.increments();\n`;
  // create fields
  jsonData.fields.forEach((item) => {
    content += `table.${item.type}('${item.title}')`;
    content += item.notNullable === 'true' ? `.notNullable()` : '.nullable()';
    content += `;\n`;
  });
  // create fields ends
  content += `
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('${jsonData.tableName}');
  };
  `;
  return content;
}

export const generateFile = (tableName, content) => {
  var dir = './db/migrations';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFile(
    'db/migrations/' +
      new Date().getTime() +
      '_create_table_' +
      tableName +
      '.js',
    content,
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('The file was saved!');
      }
    }
  );
};

export default generateFile;
