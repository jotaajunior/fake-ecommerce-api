import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class CategorySeeder extends BaseSeeder {
  public async run() {
    const categories = ['Camisa', 'Short', 'Calça', 'Notebook', 'Computador']

    for (const category of categories) {
      await Category.create({ name: category })
    }
  }
}
