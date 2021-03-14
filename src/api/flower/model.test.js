import { Flower } from '.'

let flower

beforeEach(async () => {
  flower = await Flower.create({ name: 'test', colour: 'test', price: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = flower.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(flower.id)
    expect(view.name).toBe(flower.name)
    expect(view.colour).toBe(flower.colour)
    expect(view.price).toBe(flower.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = flower.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(flower.id)
    expect(view.name).toBe(flower.name)
    expect(view.colour).toBe(flower.colour)
    expect(view.price).toBe(flower.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
