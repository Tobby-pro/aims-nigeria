import Hero from "../components/layout/Hero";
import AboutPreview from "../components/sections/AboutPreview";
import Container from "../components/Container";

const Home = () => {
  return (
    <>
      <Hero />
      <AboutPreview />

      <Container>
        {/* Other sections will go here */}
      </Container>
    </>
  );
};

export default Home;
