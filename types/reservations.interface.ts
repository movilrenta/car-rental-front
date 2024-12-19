
export interface ReservationsDB {
  id: number,
  car_id: number,
  user_id: null,
  code: string,
  start_date: Date,
  end_date: Date,
  start_branch_id: number,
  end_branch_id: number,
  deleted_at: null,
  created_at: Date,
  updated_at: Date,
  status: string,
  payment: {
    id: number;
    site_transaction_id: string;
    payment_method_id: number;
    card_brand: string;
    amount: number;
    currency: string;
    status: string;
    status_details: string;
    date: string;
    payment_mode: null;
    customer: null;
    bin: string;
    installments: number;
    first_installment_expiration_date: null;
    payment_type: string;
    sub_payments: any[];
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
    created_at: Date,
    updated_at: Date,
    deleted_at: null
  }
}