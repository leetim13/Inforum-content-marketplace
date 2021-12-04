module.exports = {
    User: {
        type: "object",
        required: ["username", "password", "firstName", "lastName", "email", "age", "gender", "role"],
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
          firstName: {
            type: "string",
            description: "firstName"
          },
          lastName: {
            type: "string",
            description: "lastName"
          },
          email: {
            type: "string",
            description: "email"
          },
          age: {
            type: "integer",
            description: "age"
          },
          gender: {
            type: "string",
            enum: ["Male", "Female", "Other"],
            description: "gender"
          },
          connectionDemographic: {
            type: "object",
            description: "connection's demographics"
          },
          profilePicture: {
            type: "string",
            format: "binary",
            description: "user's profile image"
          },
          role: {
            type: "string",
            enum: ["Admin", "User"],
            description: "role"
          }
        },
        example: {
          username: "admin999",
          password: "admin999",
          firstName: "admin",
          lastName: "admin",
          email: "inforumAdmin@gmail.com",
          age: 28,
          gender: "Other",
          role: "Admin",
        }
      }
}