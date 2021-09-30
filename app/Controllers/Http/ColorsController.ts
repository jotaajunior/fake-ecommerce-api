import Color from 'App/Models/Color'

export default class ColorsController {
  /**
   * Show all the avaible colors
   */
  public async index() {
    return Color.all()
  }
}
