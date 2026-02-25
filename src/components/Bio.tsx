import { useState } from 'react';

type BioProps = {
  bio?: string;
};

function Bio({ bio }: BioProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!bio) return <p>No bio provided.</p>;

  return (
    <section>
      <button type="button" onClick={() => setIsExpanded(prev => !prev)}>
        {isExpanded ? 'Show less' : 'Show more'}
      </button>

      {isExpanded && <p>{bio}</p>}
    </section>
  );
}

export default Bio;
