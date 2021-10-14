import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Purchase from 'App/Models/Purchase'
import CreatePurchaseValidator from 'App/Validators/CreatePurchaseValidator'

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
    const { products, ...rest } = await request.validate(
      CreatePurchaseValidator
    )

    // Creates the products
    const purchase = await Purchase.create({
      userId: auth.user!.id,
      ...rest,
    })

    // Associate with the given products
    await purchase.related('products').attach(products.map((p) => p.id))

    let totalValue = 0

    for (const { id, quantity } of products) {
      let product = await Product.findOrFail(id)
      totalValue += quantity * product.value
    }

    // Load the related products
    await purchase.load('products')

    return response.ok({
      ...purchase.serialize(),
      value: totalValue,
    })
  }
}
