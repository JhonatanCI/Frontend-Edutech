import NavBar from "../components/NavBar"
import HeroSection from "../components/HeroSection"
import WorldsSection from "../components/WorldsSection"
import ProgramSection from "../components/ProgramsSection"
import AdventureSection from "../components/AdventureSection"
import TalentDevSection from "../components/TalenDevSection"

export const Home = () => {
    return (
        <>
            <NavBar />
            <HeroSection />
            <WorldsSection />
            <TalentDevSection/>
            <ProgramSection />
            <AdventureSection />
        </>
    )
}