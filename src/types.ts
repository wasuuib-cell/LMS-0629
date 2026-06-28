export type UserRole = 'admin' | 'student' | 'general' | 'pri';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  name?: string;
  class?: string;
  whatsapp?: string;
  password?: string;
  monthlyId?: string;
  address?: string;
  studentId?: string;
  indexNumber?: string;
  nic?: string;
  school?: string;
  yearId?: string;
  yearIds?: string[];
  hasSeenId?: boolean;
}

export interface Lesson {
  id: string;
  topic: string;
  subTopic: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  videoUrl?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName?: string;
  studentIndex?: string;
  yearId?: string;
  class?: string;
  amount?: number;
  month: string;
  courseId: string;
  paymentType?: 'class' | 'book';
  bookId?: string;
  bookTitle?: string;
  deliveryAddress?: string;
  contactNumber?: string;
  slipUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
