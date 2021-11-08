import Route from '@ioc:Adonis/Core/Route'

Route.get('/me', 'AuthController.index').middleware('auth')
Route.post('/auth', 'AuthController.store')

Route.get('/users', 'UsersController.index')
Route.get('/users/:id', 'UsersController.show')
Route.post('/users', 'UsersController.store')

Route.get('/products', 'ProductsController.index')
Route.get('/products/:id', 'ProductsController.show')
Route.get('/products/category/:id', 'ProductsController.byCategory')
Route.post('/products', 'ProductsController.store')

Route.get('/favorites', 'FavoritesController.index').middleware('auth')
Route.post('/favorites/:id', 'FavoritesController.store').middleware('auth')
Route.delete('/favorites/:id', 'FavoritesController.destroy').middleware('auth')

Route.get('/purchases', 'PurchasesController.index').middleware('auth')
Route.get('/purchases/:id', 'PurchasesController.show')
Route.post('/purchases', 'PurchasesController.store').middleware('auth')

Route.get('/categories', 'CategoriesController.index')
Route.get('/categories/:id', 'CategoriesController.show')
Route.post('/categories', 'CategoriesController.store')

Route.get('/colors', 'ColorsController.index')

Route.get('/feedbacks/:id', 'FeedbacksController.index')
Route.get('/feedbacks', 'FeedbacksController.showAll')
Route.post('/feedbacks', 'FeedbacksController.store').middleware('auth')
