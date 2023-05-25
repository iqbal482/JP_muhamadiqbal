type PatientCompanion = {
  relationship: string;
  name: string;
  gender: string;
  phone_number?: string;
  date_of_birth: string;
  address: string;
};

export type PatientType = {
  citizenship: string;
  nik: string;
  user_id: string;
  identity_type: string;
  identity_number: string;
  family_card_number: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  place_of_birth: string;
  religion: string;
  address: string;
  province: string;
  regency: string;
  district: string;
  village: string;
  area: string;
  postal_code: string;
  rw: string;
  rt: string;
  insurance: string;
  insurance_number: string;
  phone_number: string;
  blood_type: string;
  email: string;
  occupation: string;
  education: string;
  tribe: string;
  mother_name: string;
  marital_status: string;
  identity: string;
  disabilities: string[];
  companion: PatientCompanion;
};