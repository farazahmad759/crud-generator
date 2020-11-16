import nextConnect from 'next-connect';
import { knex } from '../../../knexfile';
const handler = nextConnect();
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
handler.get(async (req, res) => {
  let resCategories = await knex.select().from('users');
  res.json({
    message: 'Following record(s) have been found',
    data: resCategories,
  });
});
export default handler;
