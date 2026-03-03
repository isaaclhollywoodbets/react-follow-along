type ProjectsSummaryProps = {
    visibleCount: number;
    totalCount: number
}

export function ProjectsSummary({ visibleCount, totalCount }: ProjectsSummaryProps) {
  return (
    <p>
      Showing {visibleCount} of {totalCount}
    </p>
  );
}