import { success, notFound } from '../../services/response/'
import { Flower } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Flower.create(body)
    .then((flower) => flower.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Flower.find(query, select, cursor)
    .then((flowers) => flowers.map((flower) => flower.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Flower.findById(params.id)
    .then(notFound(res))
    .then((flower) => flower ? flower.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Flower.findById(params.id)
    .then(notFound(res))
    .then((flower) => flower ? Object.assign(flower, body).save() : null)
    .then((flower) => flower ? flower.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Flower.findById(params.id)
    .then(notFound(res))
    .then((flower) => flower ? flower.remove() : null)
    .then(success(res, 204))
    .catch(next)
