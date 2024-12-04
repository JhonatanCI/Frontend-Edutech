// components/Overlay.tsx
interface OverlayProps {
    backgroundImageUrl: string;
  }
  
const Overlay: React.FC<OverlayProps> = ({ backgroundImageUrl }) => {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
    </div>
  );
};
  
export default Overlay;
  