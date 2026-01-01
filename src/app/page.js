import HomeLogic from '@/components/HomeLogic/HomeLogic';
import Hero from '@/components/Hero/Hero';

export default function Home() {
  return (
    <HomeLogic>
      <Hero
        name="Aadesh Lawate"
        intro="Intro text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </HomeLogic>
  );
}
