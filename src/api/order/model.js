import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Flower'
  }],
  quantities: [{
    type: Number
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

orderSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      products: this.products,
      quantities: this.quantities,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Order', orderSchema)

export const schema = model.schema
export default model
