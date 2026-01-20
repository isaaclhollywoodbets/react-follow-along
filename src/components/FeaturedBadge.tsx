function FeaturedBadge({ isFeatured }: { isFeatured: boolean }) {
  return (
    <p>
      {isFeatured ? '🌟 Featured project' : '📄Regular project'}
    </p>
  );
}

export default FeaturedBadge
