export interface IMembership {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isActive: boolean;
  id: string;
}

export interface IMemberFilters {
  search?: string;
  alphaSearch?: string;
}
