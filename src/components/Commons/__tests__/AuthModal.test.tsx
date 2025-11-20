import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import AuthModal from "../AuthModal";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("AuthModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    itemName: "Test Program",
    itemType: "PROGRAM" as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should not render when isOpen is false", () => {
      renderWithRouter(<AuthModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByText(/Inicia sesión para guardar/i)).not.toBeInTheDocument();
    });

    it("should render when isOpen is true", () => {
      renderWithRouter(<AuthModal {...defaultProps} />);

      expect(screen.getByText(/Inicia sesión para guardar programas/i)).toBeInTheDocument();
    });

    it("should display program-specific title", () => {
      renderWithRouter(<AuthModal {...defaultProps} itemType="PROGRAM" />);

      expect(screen.getByText(/Inicia sesión para guardar programas/i)).toBeInTheDocument();
    });

    it("should display course-specific title", () => {
      renderWithRouter(<AuthModal {...defaultProps} itemType="COURSE" />);

      expect(screen.getByText(/Inicia sesión para guardar cursos/i)).toBeInTheDocument();
    });

    it("should display generic title when no itemType provided", () => {
      const propsWithoutType = {
        isOpen: true,
        onClose: vi.fn(),
        itemName: "Test Item",
      };
      renderWithRouter(<AuthModal {...propsWithoutType} />);

      expect(screen.getByText(/Inicia sesión para guardar programas o cursos/i)).toBeInTheDocument();
    });

    it("should display item name in message", () => {
      renderWithRouter(<AuthModal {...defaultProps} />);

      expect(screen.getByText(/"Test Program"/i)).toBeInTheDocument();
    });

    it("should display generic message when no itemName provided", () => {
      const propsWithoutName = {
        isOpen: true,
        onClose: vi.fn(),
        itemType: "PROGRAM" as const,
      };
      renderWithRouter(<AuthModal {...propsWithoutName} />);

      expect(screen.getByText(/Para guardar este programa en tus favoritos/i)).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should close modal when clicking close button", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      renderWithRouter(<AuthModal {...defaultProps} onClose={onClose} />);

      const closeButton = screen.getByRole("button", { name: /cerrar modal/i });
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should navigate to login and close modal when clicking 'Iniciar Sesión'", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      renderWithRouter(<AuthModal {...defaultProps} onClose={onClose} />);

      const loginButton = screen.getByRole("button", { name: /iniciar sesión/i });
      await user.click(loginButton);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/login");
      });
    });

    it("should navigate to register and close modal when clicking 'Registrarse'", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      renderWithRouter(<AuthModal {...defaultProps} onClose={onClose} />);

      const registerButton = screen.getByRole("button", { name: /registrarse/i });
      await user.click(registerButton);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/register");
      });
    });
  });

  describe("Content Display", () => {
    it("should display heart icon", () => {
      const { container } = renderWithRouter(<AuthModal {...defaultProps} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it("should display both action buttons", () => {
      renderWithRouter(<AuthModal {...defaultProps} />);

      expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /registrarse/i })).toBeInTheDocument();
    });

    it("should display additional info message", () => {
      renderWithRouter(<AuthModal {...defaultProps} />);

      expect(
        screen.getByText(/Guardaremos este programa automáticamente después de que inicies sesión/i)
      ).toBeInTheDocument();
    });

    it("should display correct itemType in additional info for courses", () => {
      renderWithRouter(<AuthModal {...defaultProps} itemType="COURSE" />);

      expect(
        screen.getByText(/Guardaremos este curso automáticamente después de que inicies sesión/i)
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle missing optional props gracefully", () => {
      renderWithRouter(
        <AuthModal isOpen={true} onClose={vi.fn()} />
      );

      expect(screen.getByText(/Inicia sesión para guardar programas o cursos/i)).toBeInTheDocument();
      expect(screen.getByText(/Para guardar este elemento en tus favoritos/i)).toBeInTheDocument();
    });

    it("should handle all itemType values", () => {
      const { rerender } = renderWithRouter(<AuthModal {...defaultProps} itemType="PROGRAM" />);
      expect(screen.getByRole('heading', { name: /programas/i })).toBeInTheDocument();

      rerender(
        <BrowserRouter>
          <AuthModal {...defaultProps} itemType="COURSE" />
        </BrowserRouter>
      );
      expect(screen.getByRole('heading', { name: /cursos/i })).toBeInTheDocument();
    });

    it("should prevent multiple rapid clicks on buttons", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      renderWithRouter(<AuthModal {...defaultProps} onClose={onClose} />);

      const loginButton = screen.getByRole("button", { name: /iniciar sesión/i });
      
      await user.click(loginButton);
      await user.click(loginButton);
      await user.click(loginButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe("Accessibility", () => {
    it("should have accessible close button", () => {
      renderWithRouter(<AuthModal {...defaultProps} />);

      const closeButton = screen.getByRole("button", { name: /cerrar modal/i });
      expect(closeButton).toBeInTheDocument();
    });

    it("should have proper button roles", () => {
      renderWithRouter(<AuthModal {...defaultProps} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);
    });
  });
});
