import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'

export default class ProductsController {
  /**
   * Returns a list containing all the products
   */
  public async index({ response, request }: HttpContextContract) {
    const { query } = request.qs()

    console.log(query)

    const products = await Database.from('products').if(query, (q) => {
      q.whereRaw(`LOWER(name) like '%${query.toLowerCase()}%'`).orWhereRaw(
        `LOWER(description) like '%${query.toLowerCase()}%'`
      )
    })

    console.log(`%${query}%`)

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
