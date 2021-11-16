const User = require('./user.schema').User;
const Bank = require('./bank.schema').Bank;
const Campaign = require('./campaign.schema').Campaign;
const Post = require('./post.schema').Post;

module.exports = {
    definition: {
        openapi: "3.0.0",
        components: {
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                in: "header",
                bearerFormat: "JWT"
              }
            },
            schemas: {
              User,
              Bank,
              Campaign,
              Post
            }
        },
        info: {
            title: "Inforum API",
            version: '1.0.0',
            description: "This is inforum's server, documented with Swagger",
            license: {
                "name": "MIT",
                "url": "https://opensource.org/licenses/MIT"
            },
            contact: {
                name: 'inforum service team',
                email: 'inforumProd@gmail.com',
            }
        },
        schemes: ['http', 'https'],
        security: [{"bearerAuth": []}],
        servers: [
          {
              url: 'http://localhost:3001/api',
              description: 'Development server'
          },
          {
              url: 'https://inforum-server.herokuapp.com/api',
              description: 'Production server'
          }
        ],
        tags: [
          { 
            name: "Users",
            description: "Admin user or Promotor user"
          },
          {
            name: "Banks",
            description: "Bank users"
          },
          {
            name: "Campaigns",
            description: "Campaign from bank users"
          }
        ]
    },
    apis: ["**/routes/*.js"]
  };
