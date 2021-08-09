/**
 * Describe the PUT operations for /api/v1
 * PUT: Edit existing user
 * 
 */
const putUser = () => {
  return {
    summary: 'Update a user',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/UserId'
        },
        required: true,
        description: 'Unique user id'
      },
    ],
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
            description: '1 year of experience in IT field'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Updated user',
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
              message: 'child "user" fails because ["id" is required]',
              internal_code: 'missing_parameters'
            }
          }
        }
      }
    }
  };
}

export default putUser;


