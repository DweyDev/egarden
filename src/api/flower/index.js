import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, getRecomended } from './controller'
import { schema } from './model'
export Flower, { schema } from './model'

const router = new Router()
const { name, colour, price, country } = schema.tree

/**
 * @api {post} /flowers Create flower
 * @apiName CreateFlower
 * @apiGroup Flower
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Flower's name.
 * @apiParam colour Flower's colour.
 * @apiParam price Flower's price.
 * @apiParam country Flower`s country.
 * @apiSuccess {Object} flower Flower's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flower not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, colour, price, country }),
  create)

/**
 * @api {get} /flowers Retrieve flowers
 * @apiName RetrieveFlowers
 * @apiGroup Flower
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} flowers List of flowers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /flowers/recomended?colour=&price= Retrieve recomended flowers
 * @apiName RetrieveRecomendedFlowersFlowers
 * @apiGroup Flower
 * @apiPermission admin
 * @apiParam {String} access_token admin access token. - DISABLED
 * @apiParam {String} colour flower colour
 * @apiParam {Number} price maximum price
 * @apiUse listParams
 * @apiSuccess {Object[]} flowers List of flowers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin/user access only.
 */
router.get('/recomended',
  token({ required: false }),
  query(),
  getRecomended)

/**
 * @api {get} /flowers/:id Retrieve flower
 * @apiName RetrieveFlower
 * @apiGroup Flower
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} flower Flower's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flower not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /flowers/:id Update flower
 * @apiName UpdateFlower
 * @apiGroup Flower
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Flower's name.
 * @apiParam colour Flower's colour.
 * @apiParam price Flower's price.
 * @apiParam country Flower`s country.
 * @apiSuccess {Object} flower Flower's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flower not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, colour, price, country }),
  update)

/**
 * @api {delete} /flowers/:id Delete flower
 * @apiName DeleteFlower
 * @apiGroup Flower
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Flower not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
