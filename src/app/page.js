import { getData } from '@/lib/api';
import ProjectCard from '@/Components/ProjectCard';
import SkillBadge from '@/Components/SkillBadge';

export default async function Home() {
  const data = await getData();
  const { profile, projects, skills } = data;

  return (
    <div className="container min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="mb-32 text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-[#666] mb-6">
          {profile.name}
        </h1>
        <h2 className="text-2xl md:text-3xl text-[#888] mb-8 font-light">
          {profile.role}
        </h2>
        <p className="max-w-2xl text-[#a0a0a0] text-lg leading-relaxed mx-auto md:mx-0">
          {profile.bio}
        </p>
      </section>

      {/* Projects Section */}
      <section className="mb-32" id="projects">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-[#e0e0e0]">Selected Works</h2>
          <div className="h-px bg-[#2a2a2a] flex-1 ml-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <p className="text-[#666] italic">No projects added yet.</p>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-[#e0e0e0]">Skills & Tech</h2>
          <div className="h-px bg-[#2a2a2a] flex-1 ml-8" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <SkillBadge key={skill.id} skill={skill} index={index} />
            ))
          ) : (
            <p className="text-[#666] italic col-span-full">No skills added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
