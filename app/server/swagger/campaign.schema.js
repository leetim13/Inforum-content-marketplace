module.exports = {
    Campaign: {
        type: "object",
        required: ["bankId", "type", "url", "startDate", "endDate"],
        properties: {
          id: {
            type: "integer",
            description: "id"
          },
          bankId: {
            type: "integer",
            description: "bank associated with this campaign"
          },
          title: {
            type: "string",
            description: "campaign title"
          },
          type: {
            type: "string",
            description: "campaign Type",
            enum: ["Article", "Product", "Charity", "Other"]
          },
          description: {
            type: "string",
            description: "description"
          },
          url: {
            type: "string",
            description: "url"
          },
          image: {
            type: "string",
            format: "binary",
            description: "image"
          },
          startDate: {
            type: "string",
            format: "date-time",
            description: "campaign start date"
          },
          endDate: {
            type: "string",
            format: "date-time",
            description: "campaign end date"
          },
          allocatedCash: {
            type: "integer",
            description: "allocated cash for this campaign"
          }
        },
        example: {
          bankId: 1,
          type: "Charity",
          url: "https://www.rbcroyalbank.com/personal.html",
          startDate: "2020-07-21T17:32:28Z",
          endDate: "2021-07-21T17:32:28Z",
          allocatedCash: 100
        }
      }
}