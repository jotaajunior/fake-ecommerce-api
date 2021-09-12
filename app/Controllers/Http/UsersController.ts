import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  /**
   * Returns a list containing all the users
   */
  public async index(): Promise<User[]> {
    const users = await User.all()

    return users
  }

  /**
   * Shows the specified user
   */
  public async show({ request }: HttpContextContract): Promise<User> {
    const id = Number(request.param('id'))
    const user = await User.findOrFail(id)

    return user
  }

  /**
   * Creeates an user
   */
  public async store({ request }: HttpContextContract): Promise<User> {
    const payload = request.all()

    const user = await User.create(payload)

    return user
  }
}
