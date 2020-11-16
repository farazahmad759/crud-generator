
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
    let resCategories = await knex.select().from('users');
    res.json({ message: 'Following record(s) have been found', data: resCategories });
  });export default handler;