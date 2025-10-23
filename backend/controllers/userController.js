const { query } = require('../db/connection');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await query('SELECT user_id, username, email, role, created_at FROM `User` ORDER BY created_at DESC');
    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rowCount
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT user_id, username, email, role, created_at FROM `User` WHERE user_id = ?', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};

// Create new user
const createUser = async (req, res) => {
  try {
    const { username, password_hash, email, role } = req.body;

    // Validate required fields
    if (!username || !password_hash || !email || !role) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, password_hash, and role are required'
      });
    }
    
    // Check if user already exists
    const existingUser = await query(
      'SELECT * FROM `User` WHERE email = ? OR username = ?', 
      [email, username]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }
    
    // Insert new user
    const insertResult = await query(
      'INSERT INTO `User` (username, password_hash, email, role, created_at) VALUES (?, ?, ?, ?, NOW())',
      [username, password_hash, email, role]
    );
    
    // Get the inserted user
    const newUser = await query(
      'SELECT user_id, username, email, role, created_at FROM `User` WHERE username = ? AND email = ?', 
      [username, email]
    );
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser.rows[0]
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password_hash, role } = req.body;
    
    // Check if user exists
    const existingUser = await query('SELECT * FROM `User` WHERE user_id = ?', [id]);
    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const currentUser = existingUser.rows[0];
    
    // Check if email or username is being changed and if it already exists
    if (email && email !== currentUser.email) {
      const emailCheck = await query(
        'SELECT * FROM `User` WHERE email = ? AND user_id != ?', 
        [email, id]
      );
      if (emailCheck.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }
    
    if (username && username !== currentUser.username) {
      const usernameCheck = await query(
        'SELECT * FROM `User` WHERE username = ? AND user_id != ?', 
        [username, id]
      );
      if (usernameCheck.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Username already exists'
        });
      }
    }
    
    // Use COALESCE to only update provided fields
    const result = await query(
      'UPDATE `User` SET username = COALESCE(?, username), email = COALESCE(?, email), password_hash = COALESCE(?, password_hash), role = COALESCE(?, role) WHERE user_id = ?',
      [username, email, password_hash, role, id]
    );
    
    // Get the updated user
    const updatedUser = await query('SELECT user_id, username, email, role, created_at FROM `User` WHERE user_id = ?', [id]);
    
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser.rows[0]
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const existingUser = await query('SELECT * FROM `User` WHERE user_id = ?', [id]);
    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if user has documents
    const userDocuments = await query('SELECT * FROM document WHERE user_id = ?', [id]);
    if (userDocuments.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete user with existing documents. Please delete documents first.'
      });
    }
    
    await query('DELETE FROM `User` WHERE user_id = ?', [id]);
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};