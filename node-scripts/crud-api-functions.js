import fs from 'fs';
export function generateContent(jsonData) {
  let c_imports = `
  import nextConnect from 'next-connect';
  import { knex } from '../../../../knexfile';
  const handler = nextConnect();`;
  let c_post = `handler.post(async (req, res) => {
    let data = req.body;
    let resCategories = await knex('${jsonData.tableName}').insert({
      ...req.body,
    });
    res.json({
      message: 'Record created successfully',
      data: resCategories,
    });
  });`;
  let c_get = `handler.get(async (req, res) => {
    let resCategories = await knex.select().from('${jsonData.tableName}');
    res.json({ message: 'Following record(s) have been found', data: resCategories });
  });`;
  let c_exports = `export default handler;`;
  let c_return = c_imports + c_post + c_get + c_exports;
  return c_return;
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
