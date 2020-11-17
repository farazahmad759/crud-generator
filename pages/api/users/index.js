import nextConnect from 'next-connect';
import { knex } from '../../../knexfile';
const handler = nextConnect();
/**
 * @description store a record in database
 */
handler.post(async (req, res) => {
  let data = req.body;
  let resCategories = await knex('users').insert({
    ...req.body,
  });
  res.json({
    message: 'Record created successfully',
    data: resCategories,
  });
});
/**
 * @description get records from database
 */
handler.get(async (req, res) => {
  let resCategories = knex.select().from('users');
  if (req.query['name']) {
    resCategories = resCategories.where(
      'name',
      'like',
      '%' + req.query['name'] + '%'
    );
  }

  if (req.query['email']) {
    resCategories = resCategories.where(
      'email',
      'like',
      '%' + req.query['email'] + '%'
    );
  }

  resCategories = await resCategories;

  res.json({
    message: 'Following record(s) have been found',
    data: resCategories,
  });
});
export default handler;
