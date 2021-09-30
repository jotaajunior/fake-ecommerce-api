import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ColorProduct extends BaseSchema {
  protected tableName = 'color_product'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('product_id')
        .references('products.id')
        .notNullable()
        .onDelete('CASCADE')

      table
        .integer('color_id')
        .references('colors.id')
        .notNullable()
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
