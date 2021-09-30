import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('name')
      table.string('photo')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumns('name', 'photo')
    })
  }
}
