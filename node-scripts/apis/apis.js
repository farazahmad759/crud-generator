import fs from 'fs';
const buildContent = (params) => {
  let { jsonData } = params;
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
};

const make = () => {};
let dvApis = {
  buildContent,
  make,
};
export default dvApis;
