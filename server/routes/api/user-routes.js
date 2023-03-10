const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveFriend,
  deleteFriend,
  saveRepo,
  deleteRepo,
  login,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, saveFriend, saveRepo);

router.route('/login').post(login);

router.route('/user').get(authMiddleware, getSingleUser);

router.route('/friends/:friendId').delete(authMiddleware, deleteFriend);

router.route('/repos/:repoId').delete(authMiddleware, deleteRepo);

module.exports = router;