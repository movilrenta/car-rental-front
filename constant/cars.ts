export type VehicleType = {
  id: number;
  name: string;
  brand_id: number;
  group_id: number;
  doors: number;
  seats: number;
  transmission: string;
  luggage: number;
  fuel_type: string;
  branch_id: number;
  image: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  brand: Brand;
  group: Group;
  branch: Branch;
  locked_status?: boolean;
};

type Brand = {
  id: number;
  name: string;
  image: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

type Branch = {
  id: number;
  name: string;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

type Group = {
  id: number;
  name: string;
  description: string;
  rate: string;
  image: string;
  insurances: string;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
};
