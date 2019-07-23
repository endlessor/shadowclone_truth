import PropTypes from "prop-types";

export const QualificationShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  summary: PropTypes.string,
  years: PropTypes.number,
  candidate: PropTypes.number
});

export const PolicyPositionShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  summary: PropTypes.string
});

const CandidateShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  photo: PropTypes.string,
  party: PropTypes.string,
  state: PropTypes.string,
  current_office: PropTypes.string,
  age: PropTypes.number,
  gender: PropTypes.string,
  latest_poll: PropTypes.number,
  latest_odds: PropTypes.number,
  bio_qualifications: PropTypes.arrayOf(QualificationShape),
  bio_policy_positions: PropTypes.arrayOf(PolicyPositionShape)
});

export default CandidateShape;
