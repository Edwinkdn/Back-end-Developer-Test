/**
 * Describe the GET operations for /api/v1
 * list all users: /api/v1
 * find specfic task: /api/v1/{id}
 */
export default {
  list: () => {
    return {
      summary: 'Returns a list of users',
      description: 'Returns a list of users',
      responses: {
        200: {
          description: 'A JSON array of users',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Users'
              }
            }
          }
        }
      }
    };
  },
  find: () => {
    return {
      summary: 'Returns a specific user based on ID',
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
          description: 'Each task is identified by a numeric `id`',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        432: {
          description: 'Item not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'User id is not found',
                internal_code: 'item_not_found'
              }
            }
          }
        }
      }
    };
  }
}