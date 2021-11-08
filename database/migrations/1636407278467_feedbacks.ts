import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Feedbacks extends BaseSchema {
  protected tableName = 'feedbacks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE')

      table
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .notNullable()
        .onDelete('CASCADE')

      table.string('picture')

      table.integer('star').defaultTo(0)

      table.text('comment')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
