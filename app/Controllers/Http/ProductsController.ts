import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import CreateProductValidator from 'App/Validators/CreateProductValidator'

export default class ProductsController {
  /**
   * Show products by category
   */
  public async byCategory({ params, response }: HttpContextContract) {
    const id = Number(params.id)

    const category = await Category.findOrFail(id)
    const products = await category
      .related('products')
      .query()
      .preload('categories')
      .preload('colors')

    return response.ok(products)
  }

  /**
   * Returns a list containing all the products
   */
  public async index({ response, request }: HttpContextContract) {
    const { query } = request.qs()

    const products = await Product.query()
      .preload('categories')
      .preload('colors')
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

    // Load relationships
    await product.load('categories')
    await product.load('colors')

    return response.ok(product)
  }

  /**
   * Creates a new product
   */
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateProductValidator)

    // Creates the product
    const product = await Product.create(payload)

    // Associates the product with the categories and colors
    await product.related('categories').attach(payload.categories || [])
    await product.related('categories').attach(payload.colors || [])

    // Load the categoriess for showing in the return
    await product.load('categories')
    await product.load('colors')

    return response.ok(product)
  }
}
