const { query } = require('../db/connection');

// Get all document types
const getAllDocTypes = async (req, res) => {
  try {
    const result = await query('SELECT type_id, type_name, description FROM documenttype ORDER BY type_name ASC');
    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rowCount
    });
  } catch (error) {
    console.error('Error fetching document types:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching document types',
      error: error.message
    });
  }
};

// Get document type by ID
const getDocTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT type_id, type_name, description FROM documenttype WHERE type_id = ?', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Document type not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching document type:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching document type',
      error: error.message
    });
  }
};

// Create new document type
const createDocType = async (req, res) => {
  try {
    const { type_name, description } = req.body;
    
    // Validate required fields
    if (!type_name) {
      return res.status(400).json({
        success: false,
        message: 'Type name is required'
      });
    }
    
    // Check if document type already exists
    const existingDocType = await query('SELECT * FROM documenttype WHERE type_name = ?', [type_name]);
    if (existingDocType.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Document type with this name already exists'
      });
    }
    
    const result = await query(
      'INSERT INTO documenttype (type_name, description) VALUES (?, ?)',
      [type_name, description]
    );
    
    // Get the inserted document type
    const newDocType = await query('SELECT type_id, type_name, description FROM documenttype WHERE type_name = ?', [type_name]);
    
    res.status(201).json({
      success: true,
      message: 'Document type created successfully',
      data: newDocType.rows[0]
    });
  } catch (error) {
    console.error('Error creating document type:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating document type',
      error: error.message
    });
  }
};

// Update document type
const updateDocType = async (req, res) => {
  try {
    const { id } = req.params;
    const { type_name, description } = req.body;
    
    // Check if document type exists
    const existingDocType = await query('SELECT * FROM documenttype WHERE type_id = ?', [id]);
    if (existingDocType.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Document type not found'
      });
    }
    
    // Check if type_name is being changed and if it already exists
    if (type_name && type_name !== existingDocType.rows[0].type_name) {
      const nameCheck = await query('SELECT * FROM documenttype WHERE type_name = ? AND type_id != ?', [type_name, id]);
      if (nameCheck.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Document type name already exists'
        });
      }
    }
    
    await query(
      'UPDATE documenttype SET type_name = COALESCE(?, type_name), description = COALESCE(?, description) WHERE type_id = ?',
      [type_name, description, id]
    );
    
    // Get the updated document type
    const result = await query('SELECT type_id, type_name, description FROM documenttype WHERE type_id = ?', [id]);
    
    res.status(200).json({
      success: true,
      message: 'Document type updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating document type:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating document type',
      error: error.message
    });
  }
};

// Delete document type
const deleteDocType = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if document type exists
    const existingDocType = await query('SELECT * FROM documenttype WHERE type_id = ?', [id]);
    if (existingDocType.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Document type not found'
      });
    }
    
    // Check if document type has documents
    const docTypeDocuments = await query('SELECT * FROM document WHERE type_id = ?', [id]);
    if (docTypeDocuments.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete document type with existing documents. Please delete documents first.'
      });
    }
    
    await query('DELETE FROM documenttype WHERE type_id = ?', [id]);
    
    res.status(200).json({
      success: true,
      message: 'Document type deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting document type:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting document type',
      error: error.message
    });
  }
};

module.exports = {
  getAllDocTypes,
  getDocTypeById,
  createDocType,
  updateDocType,
  deleteDocType
};