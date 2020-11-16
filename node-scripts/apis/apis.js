import fs from 'fs';

const apiStructure = () => {
  let c_imports = `
  import nextConnect from 'next-connect';
  import { knex } from '../../../knexfile';
  const handler = nextConnect();`;
  let c_exports = `export default handler;`;
  return { c_imports, c_exports };
};
const buildContent = (params) => {
  let { jsonData } = params;
  let { c_imports, c_exports } = apiStructure();

  // index.js
  let c_post_index = `handler.post(async (req, res) => {
    let data = req.body;
    let resCategories = await knex('${jsonData.tableName}').insert({
      ...req.body,
    });
    res.json({
      message: 'Record created successfully',
      data: resCategories,
    });
  });`;
  let c_get_index = `handler.get(async (req, res) => {
    let resCategories = await knex.select().from('${jsonData.tableName}');
    res.json({ message: 'Following record(s) have been found', data: resCategories });
  });`;
  let c_return_index = c_imports + c_post_index + c_get_index + c_exports;

  // [id].js
  let c_post_id = `handler.post(async (req, res) => {
    let data = req.body;
    let resCategories = await knex('${jsonData.tableName}').insert({
      ...req.body,
    });
    res.json({
      message: 'Record created successfully',
      data: resCategories,
    });
  });`;
  let c_get_id = `handler.get(async (req, res) => {
    let resCategories = await knex.select().from('${jsonData.tableName}');
    res.json({ message: 'Following record(s) have been found', data: resCategories });
  });`;
  let c_return_id = c_imports + c_post_id + c_get_id + c_exports;
  return { index: c_return_index, '[id]': c_return_id };
};

const make = () => {};
let dvApis = {
  buildContent,
  make,
};
export default dvApis;
