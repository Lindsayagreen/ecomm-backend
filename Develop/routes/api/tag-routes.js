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
    await Tag.update({ tag_name: req.body.tag_name }, { where: { id: req.params.id } });
    const updatedTag = await Tag.findByPk(req.params.id);
    res.json(updatedTag);
  } catch (error) {
    console.error(err);
    res.status(500).json(err);
  }
  });

  // delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const qtyRemoved = await Tag.destroy({ where: { id: req.params.id } });
    res.json(`${qtyRemoved} tag were removed from the database`);
  } catch (error) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
