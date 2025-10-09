import HeroTitle from "./HeroTitle";
import SearchBar from "../Commons/SearchBar";
import PopularTags from "./PopularTags";
import { useSelector } from "react-redux";
import { TagsState } from "../../redux/tagsSlice";
import icesiImage from "../../assets/Icesi.jpg";

const HeroSection: React.FC = () => {
  const recentSearches = useSelector(
    (state: { tags: TagsState }) => state.tags.tags,
  );

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${icesiImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 flex flex-col pt-20">
        <HeroTitle
          heading={
            <>
              ¿Qué mundo <br /> quieres explorar?
            </>
          }
          subheading="Adéntrate en nuestros mundos de conocimiento, con más de 200 cursos, certificaciones, especializaciones y maestrías."
        />
        <div className="w-3/5">
          <SearchBar
            search="mundos"
            by="Negocios, Liderazgo"
            handleClick={() => null}
            navigateToSearch={true}
          />
        </div>

        <PopularTags tags={recentSearches.slice(-5)} />
      </div>
    </div>
  );
};

export default HeroSection;
