import NavBar from "../components/Commons/NavBar"
import HeroSection from "../components/Home/HeroSection"
import WorldsSection from "../components/Home/WorldsSection"
import ProgramSection from "../components/Home/ProgramsSection"
import AdventureSection from "../components/Home/AdventureSection"
import TalentDevSection from "../components/Home/TalentDevSection"
import PartnerSection from "../components/Home/PartnerSection"

import TalentDevProvider from "../context/talentDevContext"

export const Home = () => {
    return (
        <>
            <NavBar />
            <HeroSection />
            <WorldsSection />
            <TalentDevProvider>
                <TalentDevSection/>
            </TalentDevProvider>
            <ProgramSection />
            <PartnerSection/>
            <AdventureSection />
        </>
    )
}