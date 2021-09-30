import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  /**
   * Returns a list with all the categories
   */
  public async index({ response }: HttpContextContract) {
    const categories = await Category.all()

    return response.ok(categories)
  }

  /**
   * Shows the specified category
   */
  public async show({ response, params }: HttpContextContract) {
    const id = Number(params.id)
    const category = await Category.findOrFail(id)

    return response.ok(category)
  }

  /**
   * Creates a new category
   */
  public async store({ request, response }: HttpContextContract) {
    const payload = request.all()

    const category = await Category.create(payload)

    return response.ok(category)
  }
}
