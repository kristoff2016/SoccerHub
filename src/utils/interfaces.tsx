export enum Roles {
  BRAND = 'BRAND',
  USER = 'USER',
}

export enum Status {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
}

export interface User {
  address?: string;
  city?: string;
  country?: string;
  createdAt?: Date;
  dob?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  postalCode: string;
  roles: Roles;
  status: Status;
  updatedAt?: Date;
}
