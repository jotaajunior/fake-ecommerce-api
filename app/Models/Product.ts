import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Color from './Color'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public picture: string

  @column()
  public value: number

  @manyToMany(() => Category)
  public categories: ManyToMany<typeof Category>

  @manyToMany(() => Color)
  public colors: ManyToMany<typeof Color>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
