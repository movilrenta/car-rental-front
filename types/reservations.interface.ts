export interface ReservationsDB {
  id:                 number;
  car_id:             number;
  user_id:            null;
  code:               string;
  start_date:         Date;
  end_date:           Date;
  start_branch_id:    number;
  end_branch_id:      number;
  deleted_at:         null;
  created_at:         Date;
  updated_at:         Date;
  status:             string;
  aditionals:         Aditional[];
  origin?:            string;
  reservation_detail: ReservationDetail;
  payment:            Payment;
}

export interface Aditional {
  id:          number;
  name:        string;
  description: string;
  image:       string;
  price:       string;
  rate_id:     number;
  created_at:  Date;
  updated_at:  Date;
  pivot:       Pivot;
}

export interface Pivot {
  reservation_id: number;
  aditional_id:   number;
  amount:         number;
}

export interface Payment {
  id:                                number;
  reservation_id:                    number;
  site_transaction_id:               string;
  payment_method_id:                 number;
  card_brand:                        string;
  amount:                            string;
  currency:                          string;
  status:                            string;
  status_details:                    string;
  date:                              Date;
  payment_mode:                      null;
  customer:                          null;
  bin:                               string;
  installments:                      number;
  first_installment_expiration_date: null;
  payment_type:                      string;
  sub_payments:                      string;
  site_id:                           string;
  fraud_detection:                   null;
  aggregate_data:                    null;
  establishment_name:                null;
  spv:                               null;
  confirmed:                         null;
  pan:                               null;
  customer_token:                    null;
  card_data:                         string;
  token:                             string;
  created_at:                        Date;
  updated_at:                        Date;
  deleted_at:                        null;
}

export interface ReservationDetail {
  id:             number;
  firstname:      string;
  lastname:       string;
  email:          string;
  phone:          string;
  address_id:     null;
  observation:    string;
  reservation_id: number;
  created_at:     Date;
  updated_at:     Date;
}
