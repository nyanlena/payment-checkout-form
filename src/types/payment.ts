export interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
}

export type PaymentStatus = 'idle' | 'loading' | 'success' | 'error';

export interface PaymentResponse {
  success: boolean;
  message: string;
  transactionId?: string;
}