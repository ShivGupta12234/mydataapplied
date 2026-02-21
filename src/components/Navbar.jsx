import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1100px] bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-10 py-4 flex items-center justify-between text-white">
      <div className="font-heading text-lg text-primary">mydataapplied.com</div>
      <div className="flex gap-8 font-body text-sm">
        <span className="cursor-pointer hover:text-primary">about</span>
        <span className="cursor-pointer hover:text-primary">skills</span>
        <span className="cursor-pointer hover:text-primary">projects</span>
        <span className="cursor-pointer hover:text-primary">education</span>
        <span className="cursor-pointer hover:text-primary">certificates</span>
        <span className="cursor-pointer hover:text-primary">contact</span>
      </div>
      <ThemeToggle />
    </nav>
  );
}