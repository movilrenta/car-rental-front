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
  plate: string;
  vehicle_type: "car" | "van" | "utility";
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  brand: Brand;
  group: Group;
  branch: Branch;
}

type Brand = {
  id: number;
  name: string;
  image: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

type Branch = {
  id: number;
  name: string;
  address_id: number; // o number
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

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
}