import Route from '@ioc:Adonis/Core/Route'

Route.get('/me', 'AuthController.index').middleware('auth')
Route.post('/auth', 'AuthController.store')

Route.get('/users', 'UsersController.index')
Route.get('/users/:id', 'UsersController.show')
Route.post('/users', 'UsersController.store')

Route.get('/products', 'ProductsController.index')
Route.post('/products', 'ProductsController.store')

Route.get('/purchases', 'PurchasesController.index')
Route.post('/purchases', 'PurchasesController.store').middleware('auth')
