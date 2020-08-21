const router = require('express').Router();
const userController = require('../controllers/userController');
// const auth = require('../verificator/auth');

//recherche like username
router.get("/users/search/:username", userController.searchUser);
//afficher tous les users
router.get("/users/all", userController.getAllUsers);
//afficher user dont id est fourni en url
router.get("/users/:id", userController.getUser);
//afficher la liste des users de la page
//page et le nombre de la liste est size
router.get("/users/:page/:size", userController.getUsers);
//ajouter un nouvel user
router.post("/users", userController.addUser);
//modifier le user dont id est fourni ds url
router.put("/users/:id", userController.updateUser);
//supprimer user dont id est fourni dans url
router.delete("/users/:id", userController.removeUser);
// router.delete("/users/delete", userController.removeAllUsers);

module.exports = router;