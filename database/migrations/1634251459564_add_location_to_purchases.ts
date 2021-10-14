import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Purchases extends BaseSchema {
  protected tableName = 'purchases'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('street')
      table.string('longitude')
      table.string('latitude')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('street')
      table.dropColumn('longitude')
      table.dropColumn('latitude')
    })
  }
}
