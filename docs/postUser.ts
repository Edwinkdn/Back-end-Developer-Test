/**
 * Describe the post operations for /api/v1
 * Post: Create new user
 * 
 */
const postUser = () => {
  return {    
    summary: 'Create a new user',		
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User'
          },
          example: {
            name: 'Edwin Khoo',
            dob: '08/12/1995',
            address: 'Blk 21, Bedok Reservoir View',
            description: 'Fresh Graduate from NTU'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Added user with newly assigned ID & records the created timestamp',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'							
            }
          }
        }
      },
      431: {
        description: 'Missing input parameters',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            example: {
              message: 'child "name" fails because ["name" is required]',
              internal_code: 'missing_parameters'
            }
          }
        }
      }
    }      
  };
}

export default postUser;


