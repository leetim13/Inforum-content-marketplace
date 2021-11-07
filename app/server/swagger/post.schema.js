module.exports = {
    Post: {
        type: "object",
        required: ["userId", "campaignId", "url", "socialMedia"],
        properties: {
          id: {
            type: "integer",
            description: "id"
          },
          userId: {
            type: "integer",
            description: "userId"
          },
          campaignId: {
            type: "integer",
            description: "campaignId"
          },
          url: {
            type: "string",
            description: "firstName"
          },
          numClicks: {
            type: "integer",
            description: "numClicks"
          },
          numLikes: {
            type: "integer",
            description: "numLikes"
          },
          numComments: {
            type: "integer",
            description: "numComments"
          },
          isVerified: {
            type: "boolean",
            description: "lastName"
          },
          socialMedia: {
            type: "string",
            description: "socialMedia",
            enum: ["Facebook"]
          }
        },
        example: {
          userId: 1,
          campaignId: 1,
          url: "http://foo.com",
          socialMedia: "Facebook"
        }
      }
}