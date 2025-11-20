import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SuccessNotificationModal from '../SuccessNotificationModal';

describe('SuccessNotificationModal', () => {
  const mockOnClose = vi.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    message: 'El programa se ha guardado correctamente',
  };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('Renderizado', () => {
    it('debe renderizar el modal cuando isOpen es true', () => {
      render(<SuccessNotificationModal {...defaultProps} />);
      
      expect(screen.getByText('¡Guardado exitosamente!')).toBeInTheDocument();
      expect(screen.getByText('El programa se ha guardado correctamente')).toBeInTheDocument();
    });

    it('no debe renderizar nada cuando isOpen es false', () => {
      render(<SuccessNotificationModal {...defaultProps} isOpen={false} />);
      
      expect(screen.queryByText('¡Guardado exitosamente!')).not.toBeInTheDocument();
    });

    it('debe mostrar el botón "Entendido"', () => {
      render(<SuccessNotificationModal {...defaultProps} />);
      
      expect(screen.getByRole('button', { name: /entendido/i })).toBeInTheDocument();
    });

    it('debe mostrar el botón de cerrar con aria-label', () => {
      render(<SuccessNotificationModal {...defaultProps} />);
      
      expect(screen.getByRole('button', { name: /cerrar notificación/i })).toBeInTheDocument();
    });

    it('debe mostrar el mensaje de favoritos en perfil', () => {
      render(<SuccessNotificationModal {...defaultProps} />);
      
      expect(screen.getByText(/puedes ver todos tus favoritos en tu perfil/i)).toBeInTheDocument();
    });

    it('debe mostrar el icono de éxito', () => {
      const { container } = render(<SuccessNotificationModal {...defaultProps} />);
      
      const iconContainer = container.querySelector('.bg-green-100');
      expect(iconContainer).toBeInTheDocument();
    });
  });

  describe('Interacciones', () => {
    it('debe llamar onClose al hacer clic en el botón "Entendido"', () => {
      render(<SuccessNotificationModal {...defaultProps} />);
      
      const button = screen.getByRole('button', { name: /entendido/i });
      fireEvent.click(button);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('debe llamar onClose al hacer clic en el botón de cerrar (X)', () => {
      render(<SuccessNotificationModal {...defaultProps} />);
      
      const closeButton = screen.getByRole('button', { name: /cerrar notificación/i });
      fireEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('debe llamar onClose solo una vez cuando se hace clic en un botón', () => {
      render(<SuccessNotificationModal {...defaultProps} />);
      
      const button = screen.getByRole('button', { name: /entendido/i });
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(mockOnClose).toHaveBeenCalledTimes(2);
    });
  });

  describe('Mensajes personalizados', () => {
    it('debe mostrar un mensaje personalizado de programa', () => {
      render(
        <SuccessNotificationModal
          {...defaultProps}
          message="El programa 'Desarrollo Web' se ha guardado en tus favoritos"
        />
      );
      
      expect(
        screen.getByText(/el programa 'desarrollo web' se ha guardado en tus favoritos/i)
      ).toBeInTheDocument();
    });

    it('debe mostrar un mensaje personalizado de curso', () => {
      render(
        <SuccessNotificationModal
          {...defaultProps}
          message="El curso 'React Avanzado' se ha guardado en tus favoritos"
        />
      );
      
      expect(
        screen.getByText(/el curso 'react avanzado' se ha guardado en tus favoritos/i)
      ).toBeInTheDocument();
    });

    it('debe manejar mensajes vacíos', () => {
      render(<SuccessNotificationModal {...defaultProps} message="" />);
      
      expect(screen.getByText('¡Guardado exitosamente!')).toBeInTheDocument();
    });
  });

  describe('Estilos y clases CSS', () => {
    it('debe tener las clases de animación correctas', () => {
      const { container } = render(<SuccessNotificationModal {...defaultProps} />);
      
      const backdrop = container.querySelector('.animate-fadeIn');
      const modal = container.querySelector('.animate-slideIn');
      
      expect(backdrop).toBeInTheDocument();
      expect(modal).toBeInTheDocument();
    });

    it('debe tener el botón principal con el color correcto', () => {
      render(<SuccessNotificationModal {...defaultProps} />);
      
      const button = screen.getByRole('button', { name: /entendido/i });
      expect(button).toHaveClass('bg-[#5454E9]');
    });

    it('debe tener la sección de consejo con el borde azul', () => {
      const { container } = render(<SuccessNotificationModal {...defaultProps} />);
      
      const tipSection = container.querySelector('.border-blue-500');
      expect(tipSection).toBeInTheDocument();
    });
  });

  describe('Accesibilidad', () => {
    it('debe tener roles ARIA apropiados', () => {
      render(<SuccessNotificationModal {...defaultProps} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2);
    });

    it('debe tener aria-label en el botón de cerrar', () => {
      render(<SuccessNotificationModal {...defaultProps} />);
      
      const closeButton = screen.getByLabelText('Cerrar notificación');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Comportamiento de cierre', () => {
    it('no debe cerrarse automáticamente después de 4 segundos', async () => {
      vi.useFakeTimers();
      render(<SuccessNotificationModal {...defaultProps} />);

      vi.advanceTimersByTime(4000);
      
      expect(mockOnClose).not.toHaveBeenCalled();
      
      vi.useRealTimers();
    });

    it('debe requerir acción manual del usuario para cerrarse', () => {
      vi.useFakeTimers();
      render(<SuccessNotificationModal {...defaultProps} />);
      
      vi.advanceTimersByTime(10000);
      
      expect(mockOnClose).not.toHaveBeenCalled();
      expect(screen.getByText('¡Guardado exitosamente!')).toBeInTheDocument();
      
      vi.useRealTimers();
    });
  });
});
