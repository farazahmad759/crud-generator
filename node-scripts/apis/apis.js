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
  let c_post_index = `
  /**
   * @description store a record in database
   */
  handler.post(async (req, res) => {
    let data = req.body;
    let resCategories = await knex('${jsonData.tableName}').insert({
      ...req.body,
    });
    res.json({
      message: 'Record created successfully',
      data: resCategories,
    });
  });`;
  let c_get_index = `
  /**
   * @description get records from database
   */
  handler.get(async (req, res) => {
    let resCategories = await knex.select().from('${jsonData.tableName}');
    res.json({ message: 'Following record(s) have been found', data: resCategories });
  });`;
  let c_return_index = c_imports + c_post_index + c_get_index + c_exports;

  /**
   * [id].js
   */
  let c_get_id = `
  /**
   * @description get a record by id
   */
  handler.get(async (req, res) => {
    let ret = await knex('${jsonData.tableName}').first().where('id', req.query.id);
    res.json({
      message: ret
        ? 'Record fetched successfully'
        : 'No record found with id = ' + req.query.id,
      data: ret ? ret : {},
    });
  });
  `;
  let c_put_id = `
  /**
   * @description update a record by id
   */
  handler.put(async (req, res) => {
    let data = req.body;
    let ret = await knex('${jsonData.tableName}')
      .where('id', req.query.id)
      .update({ ...data });
    res.json({
      message: ret
        ? 'Record updated successfully'
        : 'No record found with id = ' + req.query.id,
    });
  });`;

  let c_delete_id = `
  /**
   * @description delete a record by id
   */
  handler.delete(async (req, res) => {
    let ret = await knex('${jsonData.tableName}').where('id', req.query.id).del();
    res.json({
      message: ret
        ? 'Record deleted successfully'
        : 'No record found with id = ' + req.query.id,
    });
  });
  `;
  let c_return_id = c_imports + c_get_id + c_put_id + c_delete_id + c_exports;
  return { index: c_return_index, '[id]': c_return_id };
};

const make = () => {};
let dvApis = {
  buildContent,
  make,
};
export default dvApis;
