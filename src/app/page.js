import HomeLogic from '@/components/HomeLogic/HomeLogic';
import Hero from '@/components/Hero/Hero';

export default function Home() {
  return (
    <HomeLogic>
      <Hero
        name="Aadesh Lawate"
        intro="I am a web developer skilled in building responsive and functional websites using modern web technologies. I work with HTML, CSS, JavaScript, React, and Next.js to develop clean user interfaces and reliable web applications, focusing on performance, usability, and maintainable code."
      />
    </HomeLogic>
  );
}
