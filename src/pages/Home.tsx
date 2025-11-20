import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/Commons/NavBar";
import HeroSection from "../components/Home/HeroSection";
// import WorldsSection from "../components/Home/WorldsSection"
import ProgramSection from "../components/Home/ProgramsSection";
import AdventureSection from "../components/Home/AdventureSection";
import TalentDevSection from "../components/Home/TalentDevSection";
import PartnerSection from "../components/Home/PartnerSection";
import SuccessNotificationModal from "../components/Commons/SuccessNotificationModal";

import TalentDevProvider from "../context/talentDevContext";
import { RootState } from "../redux/store";
import { clearFavoriteMessage } from "../redux/authSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const favoriteMessage = useSelector((state: RootState) => state.auth.favoriteMessage);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (favoriteMessage) {
      setShowNotification(true);
    }
  }, [favoriteMessage]);

  const handleCloseNotification = () => {
    setShowNotification(false);
    dispatch(clearFavoriteMessage());
  };

  return (
    <>
      <NavBar />
      <div className="pt-16">
        <HeroSection />
        {/* <WorldsSection /> */}
        <TalentDevProvider>
          <TalentDevSection />
        </TalentDevProvider>
        <ProgramSection />
        <PartnerSection />
        <AdventureSection />
      </div>

      {/* Notificación de favorito guardado */}
      <SuccessNotificationModal
        isOpen={showNotification}
        onClose={handleCloseNotification}
        message={favoriteMessage || ""}
      />
    </>
  );
};
