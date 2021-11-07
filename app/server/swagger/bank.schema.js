module.exports = {
    Bank: {
        type: "object",
        required: ["username", "password", "name", "url"],
        properties: {
          id: {
            type: "integer",
            description: "id"
          },
          username: {
            type: "string",
            description: "username"
          },
          password: {
            type: "string",
            description: "password"
          },
          name: {
            type: "string",
            description: "name"
          },
          url: {
            type: "string",
            description: "url"
          },
          cash: {
            type: "integer",
            description: "cash"
          },
          logo: {
              type: "string",
              format: "binary",
              description: "bank's logo"
          }
        },
        example: {
          username: "rbc",
          password: "rbc",
          name: "RBC",
          url: "https://www.rbcroyalbank.com/personal.html",
          cash: 100
        }
      }
}