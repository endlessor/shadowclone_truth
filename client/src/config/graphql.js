export const cacheResolvers = {
  Query: {
    candidate: (_, args, { getCacheKey }) =>
      getCacheKey({ __typename: "Candidate", id: args.id }),
    qualification: (_, args, { getCacheKey }) =>
      getCacheKey({ __typename: "Qualification", id: args.id }),
    position: (_, args, { getCacheKey }) =>
      getCacheKey({ __typename: "Position", id: args.id })
  }
};
