import { Order } from '.'
import { User } from '../user'

let user, order

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  order = await Order.create({ user, products: 'test', quantities: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = order.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.products).toBe(order.products)
    expect(view.quantities).toBe(order.quantities)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = order.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.products).toBe(order.products)
    expect(view.quantities).toBe(order.quantities)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
