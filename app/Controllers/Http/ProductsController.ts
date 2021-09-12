import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  /**
   * Returns a list containing all the products
   */
  public async index({ response }: HttpContextContract) {
    const products = await Product.all()

    return response.ok(products)
  }

  /**
   * Creates a new product
   */
  public async store({ request, response }: HttpContextContract) {
    const payload = request.all()

    const product = await Product.create(payload)

    return response.ok(product)
  }
}
