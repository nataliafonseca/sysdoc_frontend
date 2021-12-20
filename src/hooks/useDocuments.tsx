import { useQuery } from 'react-query';
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
  user: User;
};

type User = {
  id: string;
  name: string;
  enrolment: string;
  role: string;
};

export async function getAllDocuments(page: number, status: number) {
  const response = await api.get(`/documents?page=${page}&status=${status}`);
  const headers = response.headers;
  const documents = response.data as Document[];
  const totalCount = Number(headers['x-total-count']);

  return { documents, totalCount };
}

export async function getUserDocuments(page: number, status: number) {
  const response = await api.get(
    `/documents/user?page=${page}&status=${status}`
  );
  const headers = response.headers;
  const documents = response.data as Document[];
  const totalCount = Number(headers['x-total-count']);

  return { documents, totalCount };
}

export function useDocuments(page: number, status: number, role: string) {
  return useQuery(
    ['documents', page, status],
    role === 'admin'
      ? () => getAllDocuments(page, status)
      : () => getUserDocuments(page, status)
  );
}
