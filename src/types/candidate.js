import PropTypes from "prop-types";

const QualificationShape = PropTypes.shape({
  name: PropTypes.string,
  summary: PropTypes.string,
  years: PropTypes.number,
  candidate: PropTypes.number
});

const PolicyPositionShape = PropTypes.shape({
  name: PropTypes.string,
  summary: PropTypes.string
});

const CandidateShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  party: PropTypes.string,
  state: PropTypes.string,
  office: PropTypes.string,
  age: PropTypes.number,
  gender: PropTypes.string,
  latest_poll: PropTypes.string,
  latest_odds: PropTypes.string,
  qualifications: PropTypes.arrayOf(QualificationShape),
  policy_positions: PropTypes.arrayOf(PolicyPositionShape)
});

export default CandidateShape;
