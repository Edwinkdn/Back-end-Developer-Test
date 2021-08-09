/**
 * List all components here e.g. User, Users etc.
 */
const components = () => {
  return {
    schemas: {
      Users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      },
      User: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/UserId'
          },
          name: {
            type: 'string',
            example: 'Edwin Khoo'
          },
          dob: {
            type: 'string',
            example: '08/12/1995'
          },
          address: {
            type: 'string',
            example: 'Blk 21, Bedok Reservoir View'
          },
          description: {
            type: 'string',
            example: 'Fresh Graduate from NTU'
          },
          createdAt: {
            $ref: '#/components/schemas/CreatedAt'
          }
        }
      },
      UserId: {
        type: 'string'
      },
      CreatedAt: {
        type: 'date'
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          internal_code: {
            type: 'string'
          }
        }
      },
      // add more types here    
    }
  };
}

export default components;