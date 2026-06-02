import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true, }
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  paymentMethod:{type:String, enum:['cash','momo'],required: true},
  deliveryMethod:{type:String, enum:['delivery','pickup'], required: true},
  deliveryAddress:{
    fullName: { type: String },
    phone: { type: String },
    address: { type: String },
      city: { type: String },
      region: { type: String },
  },
  momoNumber: { type: String },
  status: { type: String, enum: ['pending','confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema
);