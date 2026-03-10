type NavigationArrowsProps = {
  onPrev: () => void;
  onNext: () => void;
};

export default function NavigationArrows({
  onPrev,
  onNext,
}: NavigationArrowsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onPrev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Previous hotspot"
      >
        ←
      </button>
      <button
        type="button"
        onClick={onNext}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Next hotspot"
      >
        →
      </button>
    </div>
  );
}
