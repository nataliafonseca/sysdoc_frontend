import { ReactNode } from 'react';
import { usePermissions } from '../hooks/usePermissions';

interface AllowProps {
  children: ReactNode;
  roles: string[];
}

export function PermissionController({ children, roles }: AllowProps) {
  const userCanSeeComponent = usePermissions(roles);

  if (!userCanSeeComponent) {
    return null;
  }

  return <>{children}</>;
}
