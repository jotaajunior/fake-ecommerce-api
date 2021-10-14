import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'

export default class AddressesController {
  /**
   * Return all addresses
   */
  public async index({ response }: HttpContextContract) {
    const addresses = await Address.all()

    return response.ok(addresses)
  }

  /**
   * Creates a new address
   */
  public async store({ request, response }: HttpContextContract) {
    const payload = request.all()

    const address = await Address.create(payload)

    return response.created(address)
  }
}
