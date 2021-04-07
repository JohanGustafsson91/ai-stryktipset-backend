export const trainNetSchema = {
  type: "object" as const,
  required: ["errorThresh", "iterations", "trainingData"],
  properties: {
    errorThresh: {
      type: "number" as const,
    },
    iterations: {
      type: "number" as const,
    },
    trainingData: {
      type: "array" as const,
      minItems: 1,
      items: {
        type: "object" as const,
        properties: {
          input: {
            type: "object" as const,
            required: ["1", "2", "X"],
            properties: {
              "1": {
                type: "number" as const,
              },
              "2": {
                type: "number" as const,
              },
              X: {
                type: "number" as const,
              },
            },
          },
          output: {
            type: "object" as const,
            properties: {
              "1": {
                type: "number" as const,
              },
              X: {
                type: "number" as const,
              },
              "2": {
                type: "number" as const,
              },
            },
            oneOf: [
              {
                required: ["1"],
              },
              {
                required: ["X"],
              },
              {
                required: ["2"],
              },
            ],
          },
        },
        required: ["input", "output"],
      },
    },
  },
};
