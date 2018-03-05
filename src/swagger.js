export default {
  swagger: '2.0',
  info: {
    description: 'simple car application api',
    version: '1.0.0',
    title: 'Simple car application api',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'apiteam@swagger.io',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  host: '45.76.76.16:9501',
  basePath: '',
  schemes: ['https', 'http'],
  paths: {
    '/route': {
      post: {
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Pet object that needs to be added to the store',
            required: true,
            schema: {
              $ref: '#/definitions/Route',
            },
          },
        ],
        responses: {
          '405': {
            description: 'Invalid input',
          },
        },
        security: [
          {
            petstore_auth: ['write:pets', 'read:pets'],
          },
        ],
      },
    },
    '/route/{token}': {
      get: {
        produces: ['application/json', 'application/xml'],

        responses: {},
        security: [
          {
            petstore_auth: ['write:pets', 'read:pets'],
          },
        ],
      },
    },
  },
};
