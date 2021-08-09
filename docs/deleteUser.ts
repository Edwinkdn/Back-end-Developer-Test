/**
 * Describe the DELETE operations for /api/v1
 * DELETE: Remove existing user
 * 
 */
const deleteUser = () => {
  return {
    summary: 'Remove a user',
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
    responses: {
      200: {
        description: 'Removed user',
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

export default deleteUser;


