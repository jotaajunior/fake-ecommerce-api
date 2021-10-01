import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string({
      escape: true,
      trim: true,
    }),

    picture: schema.string({
      escape: true,
      trim: true,
    }),

    value: schema.number(),

    categories: schema.array.optional().members(
      schema.number([
        rules.exists({
          column: 'id',
          table: 'categories',
        }),
      ])
    ),

    colors: schema.array.optional().members(
      schema.number([
        rules.exists({
          column: 'id',
          table: 'colors',
        }),
      ])
    ),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'name.required': 'Nome é obrigatório',
    'picture.required': 'Imagem do produto é obrigatório',
    'value': 'Insira um valor válido para o preço',
    'categories.*.exists':
      'Identificador de categoria inválido, não existe um categoria com esse identificador',
    'colors.*.exists':
      'Identificador de cor inválido, não existe uma cor com esse identificador',
  }
}
