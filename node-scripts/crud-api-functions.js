import fs from 'fs';
export function generateContent(jsonData) {
  let content = `
  import nextConnect from 'next-connect';
  import { knex } from '../../../../knexfile';
  const handler = nextConnect();
  handler.post(async (req, res) => {
    let data = req.body;
    let categories = await knex('categories').insert({
      ...req.body,
    });
    res.json({
      message: 'Record created successfully',
      data: categories,
    });
  });
  
  handler.get(async (req, res) => {
    if (!req.user) {
      res.json({
        message: 'Unauthorized',
      });
    }
    res.statusCode = 200;
    let ret = {
      _title: 'Entertainment',
      _description: 'Entertainment category',
    };
    ret = await knex.select().from('categories');
    res.json({ user: req.user, data: ret });
  });
  
  export default handler;
  
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
