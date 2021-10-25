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

export async function getAllDocuments(page: number) {
  const response = await api.get(`/documents?page=${page}`);
  const headers = response.headers;
  const documents = response.data as Document[];
  const totalCount = Number(headers['x-total-count']);

  return { documents, totalCount };
}

export async function getUserDocuments(page: number) {
  const response = await api.get(`/documents/user?page=${page}`);
  const headers = response.headers;
  const documents = response.data as Document[];
  const totalCount = Number(headers['x-total-count']);

  return { documents, totalCount };
}

export function useDocuments(page: number) {
  const { user } = useContext(AuthContext);

  return useQuery(
    ['documents', page],
    user?.role === 'admin'
      ? () => getAllDocuments(page)
      : () => getUserDocuments(page),
    {
      staleTime: 1000 * 5
    }
  );
}
