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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DocType'
 *                 count:
 *                   type: integer
 *                   example: 3
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DocType'
 *       404:
 *         description: Document type not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Document type created successfully
 *                 data:
 *                   $ref: '#/components/schemas/DocType'
 *       400:
 *         description: Bad request - missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Conflict - document type name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Document type updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/DocType'
 *       404:
 *         description: Document type not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Conflict - document type name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Document type deleted successfully
 *       400:
 *         description: Bad request - document type has existing documents
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Document type not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', deleteDocType);

module.exports = router;