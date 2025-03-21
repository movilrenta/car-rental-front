export interface UserReservation {
  id: number;
  car_id: number;
  user_id: null;
  code: string;
  start_date: Date;
  end_date: Date;
  start_branch_id: number;
  end_branch_id: number;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
  status: string;
  payment: Payment;
}

export interface Payment {
  id: number;
  reservation_id: number;
  site_transaction_id: string;
  payment_method_id: number;
  card_brand: string;
  amount: string;
  currency: string;
  status: string;
  status_details: string;
  date: Date;
  payment_mode: null;
  customer: null;
  bin: string;
  installments: number;
  first_installment_expiration_date: null;
  payment_type: string;
  sub_payments: string;
  site_id: string;
  fraud_detection: null;
  aggregate_data: null;
  establishment_name: null;
  spv: null;
  confirmed: null;
  pan: null;
  customer_token: null;
  card_data: string;
  token: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface Branches {
  id: number;
  name: string;
  address_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  distance_to_main_branch: number;
}

export interface ResponseUserReservation {
  car: string;
  group: string;
  insurances: string;
  image: string;
  fuel_type: string;
  transmission: string;
  seats: number;
  luggage: number;
  doors: number;
  brand_name: string;
  start_branch: string;
  end_branch: string;
  start_date: Date;
  end_date: Date;
  status: string;
  code: string;
}
