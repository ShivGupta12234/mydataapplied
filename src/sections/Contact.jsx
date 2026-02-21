export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <form
        action="mailto:prakashguptashiv911@gmail.com"
        method="POST"
        className="max-w-md mx-auto flex flex-col gap-4"
      >
        <input placeholder="Name" className="p-2 rounded bg-white/10 text-white" />
        <input placeholder="Email" className="p-2 rounded bg-white/10 text-white" />
        <textarea placeholder="Message" className="p-2 rounded bg-white/10 text-white" />
        <button className="bg-primary py-2 rounded text-black font-bold">Send</button>
      </form>
    </section>
  );
}