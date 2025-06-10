export default function InfographicWheel() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative w-[300px] h-[300px] mx-auto">
          <svg viewBox="0 0 100 100" className="w-full h-full"></svg>
        </div>
        <div className="max-w-md"></div>
      </div>
    </section>
  );
}