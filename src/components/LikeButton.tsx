import { useState } from 'react';

function LikeButton() {
const [liked, setLiked] = useState(false);

function handleClick() {
  setLiked(prevLiked => !prevLiked);
}

return (
  <button type="button" onClick={handleClick}>
    {liked ? '💚 Liked' : '🤍 Like'}
  </button>
);
}

export default LikeButton