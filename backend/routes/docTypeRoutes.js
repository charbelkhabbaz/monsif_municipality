const express = require('express');
const router = express.Router();
const {
  getAllDocTypes,
  getDocTypeById,
  createDocType,
  updateDocType,
  deleteDocType
} = require('../controllers/docTypeController');

/**
 * @swagger
 * tags:
 *   name: Document Types
 *   description: Document type management endpoints
 */

/**
 * @swagger
 * /api/doctypes:
 *   get:
 *     summary: Get all document types
 *     tags: [Document Types]
 *     responses:
 *       200:
 *         description: List of all document types
 */
router.get('/', getAllDocTypes);

/**
 * @swagger
 * /api/doctypes/{id}:
 *   get:
 *     summary: Get document type by ID
 *     tags: [Document Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Document type ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Document type details
 *       404:
 *         description: Document type not found
 */
router.get('/:id', getDocTypeById);

/**
 * @swagger
 * /api/doctypes:
 *   post:
 *     summary: Create a new document type
 *     tags: [Document Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the document type
 *                 example: Birth Certificate
 *               description:
 *                 type: string
 *                 description: Description of the document type
 *                 example: Official birth certificate issued by the municipality
 *     responses:
 *       201:
 *         description: Document type created successfully
 *       400:
 *         description: Bad request - missing required fields
 */
router.post('/', createDocType);

/**
 * @swagger
 * /api/doctypes/{id}:
 *   put:
 *     summary: Update document type by ID
 *     tags: [Document Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Document type ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the document type
 *                 example: Marriage Certificate
 *               description:
 *                 type: string
 *                 description: Description of the document type
 *                 example: Official marriage certificate
 *     responses:
 *       200:
 *         description: Document type updated successfully
 *       400:
 *         description: Bad request - no fields to update
 *       404:
 *         description: Document type not found
 */
router.put('/:id', updateDocType);

/**
 * @swagger
 * /api/doctypes/{id}:
 *   delete:
 *     summary: Delete document type by ID
 *     tags: [Document Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Document type ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Document type deleted successfully
 *       400:
 *         description: Bad request - document type has existing documents
 *       404:
 *         description: Document type not found
 */
router.delete('/:id', deleteDocType);

module.exports = router;