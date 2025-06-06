import { homeBanner } from "../assets"; // Importing the home banner image
import Container from "./Container"; // Importing the Container component for layout
import LinkButton from "./LinkButton"; // Importing the LinkButton component for call-to-action

const HomeBanner = () => {
  return (
    <Container className="relative py-5 overflow-hidden">
      {/* Banner Image and Overlay */}
      <div className="relative">
        <img
          src={homeBanner}
          alt="Banner showcasing the Mi Air Purifier product" // Improved alt description for accessibility
          className="w-full h-full object-cover rounded-md" // Full-width and height image with rounded corners
        />
        <div className="w-full h-full absolute top-0 left-0 bg-black/10" /> {/* Semi-transparent overlay */}
      </div>

      {/* Text and Call-to-Action (CTA) */}
      <div className="absolute inset-0 flex flex-col justify-center px-10">
        <h2 className="text-xl md:text-4xl lg:text-6xl text-whiteText font-bold">
        MSI Raider GE68 HX
        </h2>
        <p className="text-base md:text-lg font-semibold leading-6 text-whiteText/90 max-w-[250px] mt-4">
          The beast monster of the gaming world.
        </p>
        <LinkButton className="w-44 flex items-center justify-center bg-whiteText text-darkText hover:bg-maronText hover:text-whiteText duration-200 mt-4">
          Shop Now {/* Added CTA text */}
        </LinkButton>
      </div>
    </Container>
  );
};

export default HomeBanner;
