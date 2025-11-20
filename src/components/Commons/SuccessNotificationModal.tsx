import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";

interface SuccessNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  itemType?: "PROGRAM" | "COURSE";
}

const SuccessNotificationModal: React.FC<SuccessNotificationModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative bg-white rounded-lg w-[26rem] shadow-2xl p-6 animate-slideIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl transition-colors"
          aria-label="Cerrar notificación"
        >
          <IoMdClose />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          ¡Guardado exitosamente!
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-4">
          {message}
        </p>

        {/* Additional Info */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
          <p className="text-sm text-blue-700 flex items-center gap-1">
            <HiLightBulb className="text-yellow-500 flex-shrink-0" />
            Puedes ver todos tus favoritos en tu perfil
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full mt-4 bg-[#5454E9] text-white py-3 rounded-lg hover:bg-[#3d3db5] transition-colors duration-200 font-medium"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default SuccessNotificationModal;
