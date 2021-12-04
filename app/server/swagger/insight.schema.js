module.exports = {
    Insight: {
        type: "object",
        required: ["PostId", "date", "numClicks", "numLikes", "numComments"],
        properties: {
          id: {
            type: "integer",
            description: "id"
          },
          PostId: {
            type: "integer",
            description: "userId"
          },
          date: {
            type: "string",
            format: "date",
            description: "date recorded"
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
          rewardPoints: {
            type: "integer",
            description: "rewardPoints"
          }
        },
        example: {
          PostId: 1,
          date: "2021-08-11",
          numClicks: 51,
          numLikes: 123,
          numComments: 42,
          rewardPoints: 30
        }
      }
}