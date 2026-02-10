import { useState } from 'react';

function Bio() {
const [isExpanded, setIsExpanded] = useState(false);

const intro =
  'I am a full-stack developer transitioning into modern React.';
const extra =
  ' I enjoy teaching, mentoring, and building tools that simplify complex topics.';

function handleToggle() {
  setIsExpanded(prev => !prev);
}

return (
  <section>
    <p>
      {intro}
      {isExpanded && extra}
    </p>
    <button type="button" onClick={handleToggle}>
      {isExpanded ? 'Show less' : 'Show more'}
    </button>
  </section>
);
}

export default Bio