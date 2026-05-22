export function LogosSection() {
  return (
    <section className="mx-auto h-full max-w-3xl space-y-4 px-4 py-10 md:px-8">
      <h2 className="text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
        Trusted by <span className="text-foreground">schools across Pakistan</span>
      </h2>
      <div className="relative flex flex-wrap items-center justify-center gap-x-10 gap-y-6 py-6 sm:gap-x-12 sm:gap-y-8">
        {schools.map((school) => (
          <div key={school} className="text-muted-foreground font-semibold text-sm tracking-wide">
            {school}
          </div>
        ))}
      </div>
    </section>
  );
}

const schools = [
  "Beaconhouse School System",
  "The City School",
  "Lahore Grammar School",
  "Army Public School",
  "Roots International",
  "Divisional Public School",
];
