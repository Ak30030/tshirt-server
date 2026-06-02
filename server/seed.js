import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.js';

dotenv.config();

const products = [
  {
    name: "Classic White Tee",
    description: "A timeless white t-shirt made from 100% cotton.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "basics",
    sizes: ["S", "M", "L", "XL"],
    stock: 100
  },
  {
    name: "Black Graphic Tee",
    description: "Bold graphic print on premium black cotton.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
    category: "graphic",
    sizes: ["S", "M", "L", "XL"],
    stock: 80
  },
  {
    name: "Navy Polo Shirt",
    description: "Classic navy polo for a smart casual look.",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500",
    category: "polo",
    sizes: ["M", "L", "XL"],
    stock: 60
  },
  {
    name: "Striped Summer Tee",
    description: "Light and breezy striped tee for summer.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500",
    category: "basics",
    sizes: ["S", "M", "L"],
    stock: 120
  },
  {
    name: "Vintage Red Tee",
    description: "Retro-inspired vintage red t-shirt.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500",
    category: "vintage",
    sizes: ["S", "M", "L", "XL"],
    stock: 50
  },
  {
    name: "Grey Oversized Tee",
    description: "Comfortable oversized fit in soft grey.",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500",
    category: "oversized",
    sizes: ["M", "L", "XL", "XXL"],
    stock: 90
  },
];

mongoose.connect(process.env.MONGODB_URI, { family: 4 })
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await Product.deleteMany(); // clear existing products
    await Product.insertMany(products);
    console.log('✅ 6 Products added successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });