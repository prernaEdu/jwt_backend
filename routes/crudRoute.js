const router = require('express').Router();
const userController = require('../controller/crudController');
const authenticateToken = require('../middlewares/auth');


router.route('/user').post( userController.saveUser)
    .get(authenticateToken, userController.getUser)
    .patch(authenticateToken, userController.updateUser)
    .delete(authenticateToken, userController.deleteUser)

    router.post('/login', userController.login);

module.exports = router;