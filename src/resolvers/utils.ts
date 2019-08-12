import { Candidate, UserVote, VoteType } from "../../generated/prisma-client";

export const reorderCandidate = (candidates: Array<Candidate>, myVotes: Array<UserVote>) => {
   // reorder by vote type
   let nonVotedCandidates = []
   const filterByVotes = (voteType: VoteType) => {
     let filteredCandidates = []
     for(let i = candidates.length - 1; i >= 0; i--) {
       let result = myVotes.filter(vote => candidates[i].id === vote.candidateId)
       if (result.length === 0) {
         nonVotedCandidates.unshift(candidates[i])
         candidates.splice(i, 1)
         continue
       }
       if(result[0].vote_type === voteType) {
         candidates[i].vote_type = voteType
         filteredCandidates.unshift(candidates[i])
         candidates.splice(i, 1)
       }
     }
     return filteredCandidates
   }

   return filterByVotes('TOP').concat(
     filterByVotes('FAVORITE'),
     filterByVotes('COMPROMISE'),
     filterByVotes('VETO'),
     filterByVotes('UNKNOWNS'),
     nonVotedCandidates
   )
}