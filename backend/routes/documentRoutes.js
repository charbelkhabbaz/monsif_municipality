const express = require('express');
const router = express.Router();
const {
  getAllDocuments,
  getDocumentById,
  getDocumentsByUserId,
  createDocument,
  updateDocument,
  deleteDocument
} = require('../controllers/documentController');

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Document request management endpoints
 */

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Get all documents with user and doctype information
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: List of all documents
 */
router.get('/', getAllDocuments);

/**
 * @swagger
 * /api/documents/user/{userId}:
 *   get:
 *     summary: Get documents by user ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: List of documents for the specified user
 */
router.get('/user/:userId', getDocumentsByUserId);

/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     summary: Get document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Document ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Document details with user and doctype information
 *       404:
 *         description: Document not found
 */
router.get('/:id', getDocumentById);

/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Create a new document request
 *     tags: [Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - doctype_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user requesting the document
 *                 example: 1
 *               doctype_id:
 *                 type: integer
 *                 description: ID of the document type
 *                 example: 1
 *               notes:
 *                 type: string
 *                 description: Additional notes for the document request
 *                 example: Need for passport application
 *     responses:
 *       201:
 *         description: Document request created successfully
 *       400:
 *         description: Bad request - missing required fields
 *       404:
 *         description: User or document type not found
 */
router.post('/', createDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   put:
 *     summary: Update document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Document ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user requesting the document
 *                 example: 1
 *               doctype_id:
 *                 type: integer
 *                 description: ID of the document type
 *                 example: 1
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected, in_progress]
 *                 description: Current status of the document request
 *                 example: approved
 *               notes:
 *                 type: string
 *                 description: Additional notes for the document request
 *                 example: Document approved and ready for pickup
 *     responses:
 *       200:
 *         description: Document updated successfully
 *       400:
 *         description: Bad request - invalid status or missing references
 *       404:
 *         description: Document, user, or document type not found
 */
router.put('/:id', updateDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     summary: Delete document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Document ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *       404:
 *         description: Document not found
 */
router.delete('/:id', deleteDocument);

module.exports = router;