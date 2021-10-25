import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

type Document = {
  id: string;
  pdf: string;
  description: string;
  hours: number;
  type: string;
  status: number;
  createdAt: Date;
  user_id: string;
};

export async function getAllDocuments(): Promise<Document[]> {
  const documents = await api
    .get('/documents')
    .then((response) => response.data as Document[]);
  return documents;
}

export async function getUserDocuments(): Promise<Document[]> {
  const documents = await api
    .get('/documents/user')
    .then((response) => response.data as Document[]);
  return documents;
}

export function useDocuments() {
  const { user } = useContext(AuthContext);

  return useQuery(
    'documents',
    user?.role === 'admin' ? () => getAllDocuments() : () => getUserDocuments(),
    {
      staleTime: 1000 * 5
    }
  );
}
