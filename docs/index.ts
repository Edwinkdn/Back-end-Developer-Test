import Config from 'config';
import info from './info';
import components from './components';
import getUsers from './getUsers';
import postUser from './postUser';
import putUser from './putUser';
import deleteUser from './deleteUser';

/**
 * Construct swagger docs
 * Ref: https://swagger.io/docs/specification/basic-structure/
 */

export default () => {
  const pathname = `/api${Config.get('pathname')}/v1`; // 

  return {
    openapi: '3.0.0',
    info: info(),    
    // servers: servers(),    
    paths: {
      [`${pathname}`]: {
        get: getUsers.list(),
        post: postUser(),
      },
      [`${pathname}/{id}`]: {
        get: getUsers.find(),
        put: putUser(),
        delete: deleteUser()        
      },
    },
    components: components()     
  };
}

 