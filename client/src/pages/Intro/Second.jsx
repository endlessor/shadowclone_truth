import React from "react";
import VoteItem from "./VoteItem";

const voteItems = [
  {
    icon: "pi pi-star-o",
    label: "Top Pick",
    description:
      "The one candidate you'd pick if you could decide the election by yourself. (This might not be who you'd actually vote for, i.e. if this candidate has no chance of winning in real life)"
  },
  {
    icon: "pi pi-thumbs-up",
    label: "Favorites",
    description: "Candidates you'd'd be happy to see win"
  },
  {
    icon: "pi pi-star",
    label: "Compromises",
    description:
      "Candidates you don't particularly like, but would settle for to avoid a worse outcome"
  },
  {
    icon: "pi pi-ban",
    label: "Vetos",
    description: "Cnadidates you want to prevent from winning at all costs"
  },
  {
    icon: "pi pi-question-circle",
    label: "Unknowns",
    description: "Candidates you don't know much about yet"
  }
];
const Second = () => {
  return (
    <div>
      <p style={{ marginTop: 0 }}>
        <span>Prevoting takes 5 minutes:</span> You simply rate each candidate
        in one of these tiers:
      </p>
      <div>
        {voteItems.map((item, index) => (
          <VoteItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Second;
