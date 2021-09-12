import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  /**
   * Returns the logged user
   */
  public async index({ auth, response }: HttpContextContract) {
    const me = auth.user!

    return response.ok(me)
  }

  /**
   * Creates a new token
   *
   * @returns A token for the user
   */
  public async store({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.attempt(email, password)

    return response.ok(token)
  }
}
