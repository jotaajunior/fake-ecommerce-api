import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  /**
   * Returns a list containing all the products
   */
  public async index({ response, request }: HttpContextContract) {
    const { query } = request.qs()

    const products = await Product.query()
      .preload('categories')
      .if(query, (q) => {
        q.whereRaw(`LOWER(name) like '%${query.toLowerCase()}%'`).orWhereRaw(
          `LOWER(description) like '%${query.toLowerCase()}%'`
        )
      })

    return response.ok(products)
  }

  /**
   * Shows the specified product
   */
  public async show({ params, response }: HttpContextContract) {
    const id = Number(params.id)

    const product = await Product.findOrFail(id)

    return response.ok(product)
  }

  /**
   * Creates a new product
   */
  public async store({ request, response }: HttpContextContract) {
    const payload = request.all()

    // Creates the product
    const product = await Product.create(payload)

    // Associates the product with the categories
    await product.related('categories').attach(payload.categories)

    // Load the categoriess for showing in the return
    await product.load('categories')

    return response.ok(product)
  }
}
