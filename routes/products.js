import express from 'express';
import Product from '../models/Product.js';
import {protect,adminOnly} from '../middleware/auth.js';

const router = express.Router();

//  GET /products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

router.post('/',protect,adminOnly, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

router.put('/:id',protect,adminOnly, async (req, res) => {
  try {
    const update = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!update) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({message: 'Product updated successfully', product: update});
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

router.delete('/:id',protect,adminOnly, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id); 
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

export default router;