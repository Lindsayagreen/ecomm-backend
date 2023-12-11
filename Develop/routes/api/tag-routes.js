const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try{
    const tags= await Tag.findAll({
    include: [{model: Product, through: ProductTag}],
  });
  res.json(tags);
} catch (err) {
  console.error(err);
  res.status(500).json(err)
}
});

  // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
 try{
  const tag = await Tag.findByPk(req.params.id, {
    include: [{model: Product, through: ProductTag}],

 });
 res.json(tag);
 } catch (err) {
  console.error(err);
  res.status(500).json(err)
}
});

  // create a new tag
router.post('/', async (req, res) => {
 try{
  const tag = await Tag.create({ tag_name: req.body.tag_name});
  res.json(tag);
 } catch (err) {
  console.error(err);
  res.status(500).json(err)
}
});

  // update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try{
    
  }

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
