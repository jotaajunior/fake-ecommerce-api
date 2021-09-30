import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Color extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @manyToMany(() => Product)
  public products: ManyToMany<typeof Product>

  @column.dateTime({
    autoCreate: true,
    serializeAs: null,
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
  })
  public updatedAt: DateTime
}
