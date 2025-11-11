// Función para decodificar JWT sin verificar la firma (solo para extraer datos)
export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decodificando JWT:', error);
    return null;
  }
};

// Función para verificar si el token ha expirado
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

// Función para extraer información del usuario del token
export const getUserFromToken = (token: string) => {
  const decoded = decodeJWT(token);
  if (!decoded) return null;
  
  // Adaptamos esto según la estructura que envía tu backend
  // Típicamente un JWT contiene: sub (user id), email, username, etc.
  return {
    id: decoded.sub || decoded.id || decoded.userId,
    username: decoded.username || decoded.name || decoded.email?.split('@')[0],
    email: decoded.email,
  };
};

// Función para verificar si el token es válido
export const isValidToken = (token: string | null): boolean => {
  if (!token) return false;
  
  try {
    return !isTokenExpired(token);
  } catch {
    return false;
  }
};