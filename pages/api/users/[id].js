import nextConnect from 'next-connect';
import { knex } from '../../../knexfile';
const handler = nextConnect();
/**
 * @description get a record by id
 */
handler.get(async (req, res) => {
  let ret = await knex('users').first().where('id', req.query.id);
  res.json({
    message: ret
      ? 'Record fetched successfully'
      : 'No record found with id = ' + req.query.id,
    data: ret ? ret : {},
  });
});

/**
 * @description update a record by id
 */
handler.put(async (req, res) => {
  let data = req.body;
  let ret = await knex('users')
    .where('id', req.query.id)
    .update({ ...data });
  res.json({
    message: ret
      ? 'Record updated successfully'
      : 'No record found with id = ' + req.query.id,
  });
});
/**
 * @description delete a record by id
 */
handler.delete(async (req, res) => {
  let ret = await knex('users').where('id', req.query.id).del();
  res.json({
    message: ret
      ? 'Record deleted successfully'
      : 'No record found with id = ' + req.query.id,
  });
});
export default handler;
