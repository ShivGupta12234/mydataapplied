export default function Skills({ skills }) {
  const defaultSkills = [
    { name: "Tailwind CSS", icon: "/skills/tailwind.svg" },
    { name: "MongoDB", icon: "/skills/mongodb.svg" },
    { name: "MySQL", icon: "/skills/mysql.svg" },
    { name: "React", icon: "/skills/react.svg" },
    { name: "Python", icon: "/skills/python.svg" },
    { name: "Node.js", icon: "/skills/nodedotjs.svg" },
  ];

  const displaySkills = skills
    ? skills.map((s) => ({ name: s, icon: `/skills/${s.toLowerCase().replace(/\s/g, "")}.svg` }))
    : defaultSkills;

  return (
    <section id="skills" className="py-20 px-6 md:px-16">
      <h2 className="text-4xl font-heading font-semibold mb-16">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {displaySkills.map((skill) => (
          <div
            key={skill.name}
            className="h-40 rounded-2xl flex flex-col items-center justify-center gap-4 border border-primary/40 bg-primary/5 hover:bg-primary/10 transition"
          >
            <img src={skill.icon} alt={skill.name} className="w-12 h-12" />
            <span className="font-body font-medium text-sm">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}