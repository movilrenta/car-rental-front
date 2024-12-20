export interface CarResponse {
  id:           number;
  name:         string;
  brand_id:     number;
  group_id:     number;
  branch_id:    number;
  doors:        number;
  seats:        number;
  transmission: string;
  luggage:      number;
  fuel_type:    string;
  image:        string;
  description:  string;
  created_at:   Date;
  updated_at:   Date;
  deleted_at:   null;
  brand:        Brand;
  group:        Brand;
  branch:       Branch;
}

export interface Branch {
  id:         number;
  name:       string;
  address_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface Brand {
  id:          number;
  name:        string;
  image:       string;
  description: string;
  created_at:  Date;
  updated_at:  Date;
  deleted_at:  null;
  rate?:       string;
  insurances?: string;
}
