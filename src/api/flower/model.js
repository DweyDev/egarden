import mongoose, { Schema } from 'mongoose'

const flowerSchema = new Schema({
  name: {
    type: String
  },
  colour: {
    type: String
  },
  price: {
    type: Number
  },
  country: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

flowerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      colour: this.colour,
      price: this.price,
      country: this.country,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Flower', flowerSchema)

export const schema = model.schema
export default model
