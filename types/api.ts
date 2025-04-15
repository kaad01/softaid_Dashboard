// Location types
export interface LocationCreate {
  name: string;
  city_id: number;
  maximum_participants?: number;
  passport_photos_offered: boolean;
  passport_photo_price?: number;
  vision_test_offered: boolean;
  vision_test_price?: number;
  location_instructions_instructor?: string;
  location_instructions_customer?: string;
  offered_courses?: string[];
  conditions?: ConditionsCreate;
}

export interface Location extends LocationCreate {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface LocationInventory {
  article_id: number;
  location_id: number;
  quantity?: number;
  is_available: boolean;
}

// Instructor types
export interface InstructorCreate {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  bafoeg: boolean;
  bafoeg_amount?: number;
  drivers_license: boolean;
  insurance: string;
  phone_number?: string;
  email_address?: string;
  languages?: string;
  salary?: number;
  employment_type: string;
  study_start?: string;
  work_start?: string;
  licensed_until?: string;
  workplace_id?: number;
}

export interface Instructor extends InstructorCreate {
  id: number;
  created_at: string;
  updated_at: string;
}

// Conditions types
export interface ConditionsCreate {
  contact_person: string;
  contact_email?: string;
  contact_phone?: string;
  rental_price?: number;
  rental_period?: string;
  payment_terms?: string;
  additional_notes?: string;
}

export interface Conditions extends ConditionsCreate {
  id: number;
  created_at: string;
  updated_at: string;
}

// Article types
export interface Article {
  id: number;
  name: string;
  is_checkbox: boolean;
  is_consumable: boolean;
}

// StandortArtikel types
export interface StandortArtikel {
  id: number;
  standort_id: number;
  artikel_id: number;
  checkbox_value: boolean;
  quantity_value: number;
}

// City types
export interface City {
  id: number;
  name: string;
}

// Constants
export const ALLOWED_COURSES = [
  'basic_course',
  'advanced_course',
  'special_course',
  'intensive_course'
] as const;

export type CourseType = typeof ALLOWED_COURSES[number];