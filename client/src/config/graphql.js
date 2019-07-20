export const cacheResolvers = {
  Query: {
    candidate: (_, args, { getCacheKey }) =>
      getCacheKey({ __typename: "Candidate", id: args.id })
  }
};
