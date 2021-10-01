import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
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

    picture: schema.string.optional(
      {
        escape: false,
      },
      [rules.url()]
    ),

    email: schema.string(
      {
        escape: true,
        trim: true,
      },
      [
        rules.unique({
          table: 'users',
          column: 'email',
          caseInsensitive: true,
        }),
        rules.email({ sanitize: true }),
      ]
    ),

    password: schema.string(
      {
        escape: true,
        trim: true,
      },
      [rules.minLength(6)]
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
    'name.required': 'O nome é obrigatório',
    'email.unique': 'Endereço de e-mail é obrigatório',
    'email.required': 'O endereço de e-mail inválido',
    'password.minLength':
      'Senha muito curta, a senha precisa ter pelo menos 6 caracteres',
  }
}
