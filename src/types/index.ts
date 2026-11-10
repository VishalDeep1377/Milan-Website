export interface EventItem {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  longDescription: string;
  team: string;
  prize: string;
  accent: 'pink' | 'orange' | 'violet' | 'blue' | 'green' | 'yellow' | string;
  tag: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  college: string;
  event: string;
}

export interface RegistrationRecord extends RegistrationFormData {
  id: string;
  registrationNumber: string;
  submittedAt: string;
}

export interface RegistrationValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  college?: string;
  event?: string;
  duplicate?: string;
}
