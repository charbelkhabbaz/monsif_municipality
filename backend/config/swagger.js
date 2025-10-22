const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'eMunicipality API',
      version: '1.0.0',
      description: 'A comprehensive API for eMunicipality system management',
      contact: {
        name: 'eMunicipality Team',
        email: 'support@emunicipality.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password', 'role'],
          properties: {
            user_id: {
              type: 'integer',
              description: 'Unique identifier for the user'
            },
            name: {
              type: 'string',
              description: 'Full name of the user'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the user'
            },
            password: {
              type: 'string',
              description: 'Password for the user account'
            },
            role: {
              type: 'string',
              enum: ['citizen', 'admin', 'employee'],
              description: 'Role of the user in the system'
            },
            address: {
              type: 'string',
              description: 'Address of the user'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when user was created'
            }
          }
        },
        DocType: {
          type: 'object',
          required: ['name'],
          properties: {
            doctype_id: {
              type: 'integer',
              description: 'Unique identifier for the document type'
            },
            name: {
              type: 'string',
              description: 'Name of the document type'
            },
            description: {
              type: 'string',
              description: 'Description of the document type'
            }
          }
        },
        Document: {
          type: 'object',
          required: ['user_id', 'doctype_id'],
          properties: {
            document_id: {
              type: 'integer',
              description: 'Unique identifier for the document'
            },
            user_id: {
              type: 'integer',
              description: 'ID of the user requesting the document'
            },
            doctype_id: {
              type: 'integer',
              description: 'ID of the document type'
            },
            request_date: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the document was requested'
            },
            status: {
              type: 'string',
              enum: ['pending', 'approved', 'rejected', 'in_progress'],
              description: 'Current status of the document request'
            },
            notes: {
              type: 'string',
              description: 'Additional notes for the document request'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              description: 'Error message'
            },
            error: {
              type: 'string',
              description: 'Detailed error information'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              description: 'Success message'
            },
            data: {
              type: 'object',
              description: 'Response data'
            },
            count: {
              type: 'integer',
              description: 'Number of items returned'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js'] // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};