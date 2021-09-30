import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Purchase from 'App/Models/Purchase'

export default class PurchasesController {
  /**
   * Returns a list containing all the purchases
   */
  public async index({ response }: HttpContextContract) {
    const purchases = await Purchase.query().preload('products')

    return response.ok(purchases)
  }

  /**
   * Shows specific purchase
   */
  public async show({ params, response }: HttpContextContract) {
    const id = Number(params.id)

    const purchase = await Purchase.findOrFail(id)

    await purchase.load('products')

    return response.ok(purchase)
  }

  /**
   * Creates a purchase
   *
   * @returns The created purchase
   */
  public async store({ request, auth, response }: HttpContextContract) {
    const products = request.input('products')

    // Creates the products
    const purchase = await Purchase.create({
      userId: auth.user!.id,
    })

    // Associate with the given products
    await purchase.related('products').attach(products)

    // Load the related products
    await purchase.load('products')

    return response.ok(purchase)
  }
}
