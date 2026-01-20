function StatusBadge({ isFinished }: { isFinished: boolean }) {
  return (
    <>
      {isFinished && <p>✅ Complete</p>}
    </>
  );
}

export default StatusBadge
