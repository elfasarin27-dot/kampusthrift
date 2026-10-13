import { INITIAL_PRODUCTS as MOCK_PRODUCTS } from '../data/mockData';

export const INITIAL_PRODUCTS = MOCK_PRODUCTS;

export const INITIAL_USER_SEED = [
  {
    userId: 'user-101',
    full_name: 'Dimas Prasetyo',
    email: 'dimas.ft@students.unnes.ac.id',
    is_student: true,
    campus_name: 'UNNES (Fakultas Teknik)',
    badge_verified: true,
    phone_number_wa: '6281234567890',
    rating_honesty: 5.0,
    total_reviews: 18,
    created_at: new Date().toISOString()
  },
  {
    userId: 'user-102',
    full_name: 'Annisa Rahmawati',
    email: 'annisa.mipa@students.unnes.ac.id',
    is_student: true,
    campus_name: 'UNNES (Fakultas MIPA)',
    badge_verified: true,
    phone_number_wa: '6285712345678',
    rating_honesty: 4.9,
    total_reviews: 24,
    created_at: new Date().toISOString()
  }
];
