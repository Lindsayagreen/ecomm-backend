const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
 
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {

    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
 
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
try {
  const updatedCategory = await Category.update(req.body,{
    where:{
      id: req.params.id
    }
  })
  res.status(200).json(updatedCategory)
} catch (err) {
  console.error(err);
  res.status(500).json(err)
}
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where:{
        id:req.params.id
      },
    })
    res.status(200).json(category)
  } catch (err) {
    console.error(err);
    res.status(500).json(err)
  }
  // delete a category by its `id` value
});

module.exports = router;
