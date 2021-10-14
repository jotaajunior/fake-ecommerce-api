import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FavoritesController {
  /**
   * List all favorites
   */
  public async index({ response, auth }: HttpContextContract) {
    const user = auth.user!

    await user.load('favorites')

    return response.ok(user.favorites)
  }

  /**
   * Mark a product as favorite
   */
  public async store({ auth, params, response }: HttpContextContract) {
    const id = Number(params.id)
    const me = auth.user!

    await me.related('favorites').attach([id])
    await me.load('favorites')

    return response.ok(me)
  }

  /**
   * Unmark product as favorite
   */
  public async destroy({ auth, params, response }: HttpContextContract) {
    const id = Number(params.id)
    const me = auth.user!

    await me.related('favorites').detach([id])
    await me.load('favorites')

    return response.ok(me)
  }
}
