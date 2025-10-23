const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password_hash
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *                 example: ali_jadelaoun
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *                 example: ali.jadelaoun@gmail.com
 *               password_hash:
 *                 type: string
 *                 description: Hashed password for the user account
 *                 example: hashed_password1
 *               role:
 *                 type: string
 *                 enum: [citizen, admin]
 *                 description: Role of the user in the system
 *                 example: citizen
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request - missing required fields
 *       409:
 *         description: Conflict - user already exists
 */
router.post('/', createUser);


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username for the user account
 *                 example: john_updated
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *                 example: john.updated@example.com
 *               password_hash:
 *                 type: string
 *                 description: Hashed password for the user account
 *                 example: $2b$10$hashedpassword12345678901234567890
 *               role:
 *                 type: string
 *                 enum: [citizen, admin]
 *                 description: Role of the user in the system
 *                 example: citizen
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request - no fields to update
 *       404:
 *         description: User not found
 *       409:
 *         description: Conflict - email or username already exists
 */
router.put('/:id', updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request - user has existing documents
 *       404:
 *         description: User not found
 */
router.delete('/:id', deleteUser);

module.exports = router;