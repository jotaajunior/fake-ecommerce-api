import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Feedback from 'App/Models/Feedback'
import CreateFeedbackValidator from 'App/Validators/CreateFeedbackValidator'

export default class FeedbacksController {
  /**
   * Showl all the feedbacks
   */
  public async showAll({ response }: HttpContextContract) {
    const feedbacks = await Feedback.all()

    return response.ok(feedbacks)
  }

  /**
   * Show all feedback of a product
   */
  public async index({ params, response }: HttpContextContract) {
    const id = Number(params.id)

    const feedbacks = await Feedback.query().where('product_id', id)

    return response.ok(feedbacks)
  }

  /**
   * Creates a new feedback
   */
  public async store({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(CreateFeedbackValidator)

    const feedback = await Feedback.create({
      ...payload,
      userId: auth.user!.id,
    })

    return response.created(feedback)
  }
}
