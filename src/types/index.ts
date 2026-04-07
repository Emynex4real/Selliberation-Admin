export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'superadmin';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'affiliate' | 'admin';
  referralCode: string;
  referredBy?: string;
  stage: number;
  subscriptionStatus: 'trial' | 'premium' | 'expired';
  createdAt: string;
  trialEndsAt: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  status: 'published' | 'draft';
  modules: Module[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  orderIndex: number;
  isFree: boolean;
  submodules: SubModule[];
}

export interface SubModule {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  orderIndex: number;
  videos: Video[];
}

export interface Video {
  id: string;
  submoduleId: string;
  title: string;
  videoUrl: string;
  duration: number;
  orderIndex: number;
}

export interface Commission {
  id: string;
  payerId: string;
  payerName: string;
  beneficiaryId: string;
  beneficiaryName: string;
  courseId: string;
  courseName: string;
  level: number;
  amount: number;
  status: 'pending' | 'withdrawable' | 'withdrawn';
  createdAt: string;
}

export interface Withdrawal {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNote?: string;
  createdAt: string;
}

export interface PlatformSettings {
  paystack: {
    publicKey: string;
    secretKey: string;
    planId: string;
  };
  bank: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  commissions: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    level5: number;
    level6: number;
  };
  general: {
    trialDays: number;
    minWithdrawal: number;
    subscriptionPrice: number;
    platformName: string;
    supportEmail: string;
  };
}

export interface DashboardStats {
  totalUsers: number;
  activeSubscribers: number;
  monthlyRevenue: number;
  pendingWithdrawals: number;
  totalCommissions: number;
  trialUsers: number;
}
