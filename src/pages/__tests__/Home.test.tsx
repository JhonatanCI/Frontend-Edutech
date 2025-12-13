import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '../Home';
import authReducer, { clearFavoriteMessage } from '../../redux/authSlice';

// Mock de los componentes
vi.mock('../../components/Commons/NavBar', () => ({
  default: () => <div data-testid="navbar">NavBar</div>,
}));

vi.mock('../../components/Home/HeroSection', () => ({
  default: () => <div data-testid="hero-section">HeroSection</div>,
}));

vi.mock('../../components/Home/ProgramsSection', () => ({
  default: () => <div data-testid="programs-section">ProgramsSection</div>,
}));

vi.mock('../../components/Home/AdventureSection', () => ({
  default: () => <div data-testid="adventure-section">AdventureSection</div>,
}));

vi.mock('../../components/Home/TalentDevSection', () => ({
  default: () => <div data-testid="talentdev-section">TalentDevSection</div>,
}));

vi.mock('../../components/Home/PartnerSection', () => ({
  default: () => <div data-testid="partner-section">PartnerSection</div>,
}));

vi.mock('../../components/Commons/SuccessNotificationModal', () => ({
  default: ({ isOpen, onClose, message }: { isOpen: boolean; onClose: () => void; message: string }) => (
    isOpen ? (
      <div data-testid="success-notification-modal">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    ) : null
  ),
}));

vi.mock('../../context/talentDevContext', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        isAuthenticated: false,
        user: null,
        favoriteMessage: null,
        token: null,
        loading: false,
        error: null,
        redirectPath: null,
        successMessage: null,
        ...initialState,
      },
    },
  });
};

const renderWithProviders = (component: React.ReactElement, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderizado de componentes', () => {
    it('debe renderizar todos los componentes principales', () => {
      renderWithProviders(<Home />);

      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('hero-section')).toBeInTheDocument();
      expect(screen.getByTestId('programs-section')).toBeInTheDocument();
      expect(screen.getByTestId('adventure-section')).toBeInTheDocument();
      expect(screen.getByTestId('talentdev-section')).toBeInTheDocument();
      expect(screen.getByTestId('partner-section')).toBeInTheDocument();
    });

    it('debe aplicar el padding correcto al contenedor principal', () => {
      const { container } = renderWithProviders(<Home />);
      
      const mainContainer = container.querySelector('.pt-16');
      expect(mainContainer).toBeInTheDocument();
    });
  });

  describe('SuccessNotificationModal - Sin mensaje de favorito', () => {
    it('no debe mostrar el modal cuando no hay favoriteMessage', () => {
      renderWithProviders(<Home />);

      expect(screen.queryByTestId('success-notification-modal')).not.toBeInTheDocument();
    });

    it('debe pasar isOpen=false cuando favoriteMessage es null', () => {
      const store = createMockStore({ favoriteMessage: null });
      renderWithProviders(<Home />, store);

      expect(screen.queryByTestId('success-notification-modal')).not.toBeInTheDocument();
    });
  });

  describe('SuccessNotificationModal - Con mensaje de favorito', () => {
    it('debe mostrar el modal cuando hay favoriteMessage', async () => {
      const store = createMockStore({
        favoriteMessage: 'El programa se ha guardado en tus favoritos',
      });
      
      renderWithProviders(<Home />, store);

      await waitFor(() => {
        expect(screen.getByTestId('success-notification-modal')).toBeInTheDocument();
      });
    });

    it('debe pasar el mensaje correcto al modal', async () => {
      const testMessage = 'El curso React Avanzado se ha guardado';
      const store = createMockStore({
        favoriteMessage: testMessage,
      });
      
      renderWithProviders(<Home />, store);

      await waitFor(() => {
        expect(screen.getByText(testMessage)).toBeInTheDocument();
      });
    });

    it('debe mostrar el modal con diferentes mensajes', async () => {
      const messages = [
        'Programa guardado exitosamente',
        'Curso añadido a favoritos',
        'Se ha guardado en tu lista',
      ];

      for (const message of messages) {
        const store = createMockStore({ favoriteMessage: message });
        const { unmount } = renderWithProviders(<Home />, store);

        await waitFor(() => {
          expect(screen.getByText(message)).toBeInTheDocument();
        });

        unmount();
      }
    });
  });

  describe('Manejo de cierre del modal', () => {
    it('debe limpiar el mensaje al cerrar el modal', async () => {
      const store = createMockStore({
        favoriteMessage: 'Mensaje de prueba',
      });
      
      renderWithProviders(<Home />, store);

      await waitFor(() => {
        expect(screen.getByTestId('success-notification-modal')).toBeInTheDocument();
      });

      const closeButton = screen.getByText('Cerrar');
      closeButton.click();

      await waitFor(() => {
        expect(screen.queryByTestId('success-notification-modal')).not.toBeInTheDocument();
      });
    });

    it('debe dispatch clearFavoriteMessage al cerrar', async () => {
      const store = createMockStore({
        favoriteMessage: 'Mensaje de prueba',
      });
      
      const dispatchSpy = vi.spyOn(store, 'dispatch');
      
      renderWithProviders(<Home />, store);

      await waitFor(() => {
        expect(screen.getByTestId('success-notification-modal')).toBeInTheDocument();
      });

      const closeButton = screen.getByText('Cerrar');
      closeButton.click();

      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(clearFavoriteMessage());
      });
    });
  });

  describe('useEffect - Reactividad al favoriteMessage', () => {
    it('debe reaccionar cuando favoriteMessage cambia de null a un valor', async () => {
      const store = createMockStore({ favoriteMessage: null });
      
      const { rerender } = renderWithProviders(<Home />, store);

      expect(screen.queryByTestId('success-notification-modal')).not.toBeInTheDocument();

      // Simular cambio en el store
      store.dispatch({ 
        type: 'auth/setFavoriteMessage', 
        payload: 'Nuevo mensaje de favorito' 
      });

      rerender(
        <Provider store={store}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('success-notification-modal')).toBeInTheDocument();
      });
    });

    it('debe mantener el modal abierto si favoriteMessage persiste', async () => {
      const store = createMockStore({
        favoriteMessage: 'Mensaje persistente',
      });
      
      renderWithProviders(<Home />, store);

      await waitFor(() => {
        expect(screen.getByTestId('success-notification-modal')).toBeInTheDocument();
      });

      // Esperar un poco para asegurar que no se cierra automáticamente
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(screen.getByTestId('success-notification-modal')).toBeInTheDocument();
    });
  });

  describe('Estado inicial del modal', () => {
    it('debe inicializar showNotification en false', () => {
      renderWithProviders(<Home />);

      expect(screen.queryByTestId('success-notification-modal')).not.toBeInTheDocument();
    });

    it('debe pasar un mensaje vacío cuando favoriteMessage es null', () => {
      const store = createMockStore({ favoriteMessage: null });
      renderWithProviders(<Home />, store);

      // El modal no debe estar visible, por lo que no hay mensaje que verificar
      expect(screen.queryByTestId('success-notification-modal')).not.toBeInTheDocument();
    });
  });

  describe('Integración completa del flujo de notificación', () => {
    it('debe manejar el flujo completo: mostrar modal -> cerrar -> limpiar estado', async () => {
      const store = createMockStore({
        favoriteMessage: 'Flujo completo de notificación',
      });
      
      renderWithProviders(<Home />, store);

      // Paso 1: Modal debe mostrarse
      await waitFor(() => {
        expect(screen.getByTestId('success-notification-modal')).toBeInTheDocument();
        expect(screen.getByText('Flujo completo de notificación')).toBeInTheDocument();
      });

      // Paso 2: Cerrar modal
      const closeButton = screen.getByText('Cerrar');
      closeButton.click();

      // Paso 3: Modal debe desaparecer
      await waitFor(() => {
        expect(screen.queryByTestId('success-notification-modal')).not.toBeInTheDocument();
      });

      // Paso 4: Estado debe estar limpio
      const state = store.getState();
      expect(state.auth.favoriteMessage).toBeNull();
    });
  });

  describe('Casos extremos', () => {
    it('debe manejar favoriteMessage con string vacío', async () => {
      const store = createMockStore({
        favoriteMessage: '',
      });
      
      renderWithProviders(<Home />, store);

      // Con string vacío, el modal no debería mostrarse debido a la condición if (favoriteMessage)
      expect(screen.queryByTestId('success-notification-modal')).not.toBeInTheDocument();
    });

    it('debe manejar favoriteMessage con espacios en blanco', async () => {
      const store = createMockStore({
        favoriteMessage: '   ',
      });
      
      renderWithProviders(<Home />, store);

      await waitFor(() => {
        expect(screen.getByTestId('success-notification-modal')).toBeInTheDocument();
      });
    });

    it('debe manejar mensajes muy largos', async () => {
      const longMessage = 'Este es un mensaje muy largo '.repeat(20);
      const store = createMockStore({
        favoriteMessage: longMessage,
      });
      
      renderWithProviders(<Home />, store);

      await waitFor(() => {
        // Verificar que el modal está visible
        expect(screen.getByTestId('success-notification-modal')).toBeInTheDocument();
        // Usar getAllByText con matcher y verificar que al menos uno existe
        const elements = screen.getAllByText((_, element) => {
          return element?.tagName === 'P' && (element?.textContent?.includes('Este es un mensaje muy largo') ?? false);
        });
        expect(elements.length).toBeGreaterThan(0);
      });
    });
  });
});
