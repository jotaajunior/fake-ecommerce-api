import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Color from 'App/Models/Color'

export default class ColorSeeder extends BaseSeeder {
  public async run() {
    const colors = ['Branco', 'Preto', 'Azul', 'Vermelho', 'Rosa', 'Cinza']

    for (const name of colors) {
      await Color.firstOrCreate({ name })
    }
  }
}
