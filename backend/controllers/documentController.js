const { query } = require('../db/connection');

// Get all documents with user and doctype information
const getAllDocuments = async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        d.document_id,
        d.user_id,
        d.type_id,
        d.status,
        d.request_date,
        d.issue_date,
        d.notes,
        u.username as user_name,
        u.email as user_email,
        dt.type_name,
        dt.description
      FROM document d
      JOIN \`User\` u ON d.user_id = u.user_id
      JOIN documenttype dt ON d.type_id = dt.type_id
      ORDER BY d.request_date DESC
    `);
    
    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rowCount
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching documents',
      error: error.message
    });
  }
};

// Get document by ID
const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(`
      SELECT 
        d.document_id,
        d.user_id,
        d.type_id,
        d.status,
        d.request_date,
        d.issue_date,
        d.notes,
        u.username as user_name,
        u.email as user_email,
        dt.type_name,
        dt.description
      FROM document d
      JOIN \`User\` u ON d.user_id = u.user_id
      JOIN documenttype dt ON d.type_id = dt.type_id
      WHERE d.document_id = ?
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching document',
      error: error.message
    });
  }
};

// Get documents by user ID
const getDocumentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await query(`
      SELECT 
        d.document_id,
        d.user_id,
        d.type_id,
        d.status,
        d.request_date,
        d.issue_date,
        d.notes,
        u.username as user_name,
        u.email as user_email,
        dt.type_name,
        dt.description
      FROM document d
      JOIN \`User\` u ON d.user_id = u.user_id
      JOIN documenttype dt ON d.type_id = dt.type_id
      WHERE d.user_id = ?
      ORDER BY d.request_date DESC
    `, [userId]);
    
    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rowCount
    });
  } catch (error) {
    console.error('Error fetching user documents:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user documents',
      error: error.message
    });
  }
};

// Create new document
const createDocument = async (req, res) => {
  try {
    const { user_id, type_id, notes } = req.body;
    
    // Validate required fields
    if (!user_id || !type_id) {
      return res.status(400).json({
        success: false,
        message: 'User ID and Type ID are required'
      });
    }
    
    // Check if user exists
    const userCheck = await query('SELECT * FROM \`User\` WHERE user_id = ?', [user_id]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if document type exists
    const docTypeCheck = await query('SELECT * FROM documenttype WHERE type_id = ?', [type_id]);
    if (docTypeCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Document type not found'
      });
    }
    
    const result = await query(
      'INSERT INTO document (user_id, type_id, status, request_date, notes) VALUES (?, ?, "pending", NOW(), ?)',
      [user_id, type_id, notes]
    );
    
    // Get the created document with joins
    const newDocument = await query(`
      SELECT 
        d.document_id,
        d.user_id,
        d.type_id,
        d.status,
        d.request_date,
        d.issue_date,
        d.notes,
        u.username as user_name,
        u.email as user_email,
        dt.type_name,
        dt.description
      FROM document d
      JOIN \`User\` u ON d.user_id = u.user_id
      JOIN documenttype dt ON d.type_id = dt.type_id
      WHERE d.document_id = ?
    `, [result.insertId]);
    
    res.status(201).json({
      success: true,
      message: 'Document created successfully',
      data: newDocument.rows[0]
    });
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating document',
      error: error.message
    });
  }
};

// Update document
const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, type_id, status, issue_date, notes } = req.body;
    
    // Check if document exists
    const existingDocument = await query('SELECT * FROM document WHERE document_id = ?', [id]);
    if (existingDocument.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    // Validate user_id if provided
    if (user_id) {
      const userCheck = await query('SELECT * FROM \`User\` WHERE user_id = ?', [user_id]);
      if (userCheck.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    }
    
    // Validate type_id if provided
    if (type_id) {
      const docTypeCheck = await query('SELECT * FROM documenttype WHERE type_id = ?', [type_id]);
      if (docTypeCheck.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Document type not found'
        });
      }
    }
    
    // Validate status if provided
    const validStatuses = ['pending', 'approved', 'rejected', 'in_progress'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: pending, approved, rejected, in_progress'
      });
    }
    
    await query(
      'UPDATE document SET user_id = COALESCE(?, user_id), type_id = COALESCE(?, type_id), status = COALESCE(?, status), issue_date = COALESCE(?, issue_date), notes = COALESCE(?, notes) WHERE document_id = ?',
      [user_id, type_id, status, issue_date, notes, id]
    );
    
    // Get the updated document with joins
    const updatedDocument = await query(`
      SELECT 
        d.document_id,
        d.user_id,
        d.type_id,
        d.status,
        d.request_date,
        d.issue_date,
        d.notes,
        u.username as user_name,
        u.email as user_email,
        dt.type_name,
        dt.description
      FROM document d
      JOIN \`User\` u ON d.user_id = u.user_id
      JOIN documenttype dt ON d.type_id = dt.type_id
      WHERE d.document_id = ?
    `, [id]);
    
    res.status(200).json({
      success: true,
      message: 'Document updated successfully',
      data: updatedDocument.rows[0]
    });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating document',
      error: error.message
    });
  }
};

// Delete document
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if document exists
    const existingDocument = await query('SELECT * FROM document WHERE document_id = ?', [id]);
    if (existingDocument.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    await query('DELETE FROM document WHERE document_id = ?', [id]);
    
    res.status(200).json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting document',
      error: error.message
    });
  }
};

module.exports = {
  getAllDocuments,
  getDocumentById,
  getDocumentsByUserId,
  createDocument,
  updateDocument,
  deleteDocument
};