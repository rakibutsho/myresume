type VerifiedBadgeProps = {
  className?: string;
};

const VerifiedBadge = ({ className }: VerifiedBadgeProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
    {/* seal */}
    <path
      d="M12 2.5l2.2 1.3 2.5-.5 1.3 2.2 2.2 1.3-.5 2.5 1.3 2.2-1.3 2.2.5 2.5-2.2 1.3-1.3 2.2-2.5-.5L12 21.5l-2.2-1.3-2.5.5-1.3-2.2-2.2-1.3.5-2.5L2.5 12l1.3-2.2-.5-2.5L5.5 6 6.8 3.8l2.5.5L12 2.5z"
      className="fill-current opacity-50 rounded-full"
    />

    {/* check */}
    <path
      d="M9.2 12.2l1.7 1.7 3.9-4"
      className="stroke-current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default VerifiedBadge;
