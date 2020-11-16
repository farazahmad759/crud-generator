
  import nextConnect from 'next-connect';
  import { knex } from '../../../knexfile';
  const handler = nextConnect();
  /**
   * @description store a record in database
   */
  handler.post(async (req, res) => {
    let data = req.body;
    let resCategories = await knex('websites').insert({
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
    let resCategories = knex.select().from('websites')
    if(req.query['_url']) {
      resCategories = resCategories.where('_url', 'like', '%' + req.query['_url'] + '%');
    }
    
    if(req.query['_status']) {
      resCategories = resCategories.where('_status', 'like', '%' + req.query['_status'] + '%');
    }
    
  resCategories = await resCategories;
  
    res.json({ message: 'Following record(s) have been found', data: resCategories });
  });export default handler;