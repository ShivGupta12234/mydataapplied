export default function Certificates() {
  return (
    <section id="certificates" className="py-20 px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-40 bg-white/10 rounded-xl" />
      ))}
    </section>
  );
}