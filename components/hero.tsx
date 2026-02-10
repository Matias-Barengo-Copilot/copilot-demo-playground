import Image from "next/image";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1769985840589-247088733de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjB3YXJtJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzcwMzk1MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Mountain View Coffee interior, warm lighting"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" aria-hidden />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <h1 className=" font-semibold text-6xl md:text-7xl lg:text-8xl mb-6 text-white tracking-tight">
            Mountain View <br /> Coffee
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/90 md:text-2xl lg:text-3xl">
            Where customers are fueled by exceptional coffee,
            <br />
            and the business is brewed to perfection with AI.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/60 p-2">
            <div className="h-3 w-1.5 rounded-full bg-white/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
