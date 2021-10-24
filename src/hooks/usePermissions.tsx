import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function usePermissions(roles: string[]) {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  const allowed = roles.find((role) => user?.role === role);

  if (!allowed) {
    return false;
  }

  return true;
}
