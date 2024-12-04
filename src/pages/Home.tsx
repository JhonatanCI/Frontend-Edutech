import NavBar from "../components/NavBar"
import HeroSection from "../components/HeroSection"
import WorldsSection from "../components/WorldsSection"
import ProgramSection from "../components/ProgramsSection"
import AdventureSection from "../components/AdventureSection"
import TalentDevSection from "../components/TalentDevSection"

import DevTalentProvider from "../context/devTalentContext"
import PartnerSection from "../components/PartnerSection"

export const Home = () => {
    return (
        <>
            <NavBar />
            <HeroSection />
            <WorldsSection />
            <DevTalentProvider>
                <TalentDevSection/>
            </DevTalentProvider>
            <ProgramSection />
            <PartnerSection/>
            <AdventureSection />
        </>
    )
}