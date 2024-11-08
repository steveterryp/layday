// Common types used across the application

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  HR_MANAGER = 'HR_MANAGER',
  FINANCE_MANAGER = 'FINANCE_MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

export interface Employee extends User {
  employeeId: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  manager?: string;
  status: EmployeeStatus;
  benefits: Benefit[];
}

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  TERMINATED = 'TERMINATED',
}

export interface Benefit {
  id: string;
  name: string;
  description: string;
  type: BenefitType;
  cost: number;
  coverage: number;
}

export enum BenefitType {
  HEALTH = 'HEALTH',
  DENTAL = 'DENTAL',
  VISION = 'VISION',
  LIFE_INSURANCE = 'LIFE_INSURANCE',
  RETIREMENT = 'RETIREMENT',
}

export interface Payroll {
  id: string;
  employeeId: string;
  periodStart: string;
  periodEnd: string;
  basePay: number;
  overtime: number;
  deductions: Deduction[];
  taxes: Tax[];
  netPay: number;
  status: PayrollStatus;
}

export interface Deduction {
  id: string;
  name: string;
  amount: number;
  type: DeductionType;
}

export enum DeductionType {
  BENEFIT_PREMIUM = 'BENEFIT_PREMIUM',
  RETIREMENT_CONTRIBUTION = 'RETIREMENT_CONTRIBUTION',
  OTHER = 'OTHER',
}

export interface Tax {
  id: string;
  name: string;
  amount: number;
  type: TaxType;
}

export enum TaxType {
  FEDERAL = 'FEDERAL',
  STATE = 'STATE',
  LOCAL = 'LOCAL',
  FICA = 'FICA',
}

export enum PayrollStatus {
  DRAFT = 'DRAFT',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export interface TimeEntry {
  id: string;
  employeeId: string;
  date: string;
  hoursWorked: number;
  overtimeHours: number;
  status: TimeEntryStatus;
  notes?: string;
}

export enum TimeEntryStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  reason?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export enum LeaveType {
  VACATION = 'VACATION',
  SICK = 'SICK',
  PERSONAL = 'PERSONAL',
  MATERNITY = 'MATERNITY',
  PATERNITY = 'PATERNITY',
  BEREAVEMENT = 'BEREAVEMENT',
}

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Common query parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, string | number | boolean>;
}
