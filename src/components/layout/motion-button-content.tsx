type MotionButtonContentProps = {
  label: string;
};

export function MotionButtonContent({ label }: MotionButtonContentProps) {
  return (
    <>
      <span className="btn-fill" aria-hidden="true" />
      <span className="btn-label">{label}</span>
      <span className="btn-icon" aria-hidden="true">
        <svg viewBox="0 0 18 18" fill="none">
          <path d="M3 9h11M10 4l5 5-5 5" />
        </svg>
      </span>
    </>
  );
}
