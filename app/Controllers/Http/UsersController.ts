import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  /**
   * Returns a list containing all the users
   */
  public async index({ response }: HttpContextContract) {
    const users = await User.all()

    return response.ok(users)
  }

  /**
   * Shows the specified user
   */
  public async show({ request, response }: HttpContextContract) {
    const id = Number(request.param('id'))
    const user = await User.findOrFail(id)

    return response.ok(user)
  }

  /**
   * Creeates an user
   */
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    const user = await User.create(payload)

    return response.ok(user)
  }
}
