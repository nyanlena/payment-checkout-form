import type { PaymentFormData, PaymentResponse } from '../types/payment';

export const processPayment = async (data: PaymentFormData): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.cardNumber.replace(/\s/g, '').endsWith('0000')) {
        reject(new Error('Недостаточно средств на карте. Попробуйте другую карту.'));
        return;
      }

      resolve({
        success: true,
        message: 'Оплата прошла успешно!',
        transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      });
    }, 2500);
  });
};