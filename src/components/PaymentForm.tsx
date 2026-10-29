import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IMaskInput } from 'react-imask';
import { useState, useEffect } from 'react';
import type { PaymentFormData, PaymentStatus } from '../types/payment';
import { processPayment } from '../api/paymentApi';

const paymentSchema = z.object({
  cardNumber: z.string().min(19, 'Введите полный номер карты'),
  expiryDate: z.string().min(5, 'Введите срок действия'),
  cvv: z.string().min(3, 'Введите CVV'),
  cardHolder: z.string().min(3, 'Введите имя держателя').regex(/^[A-Za-z\s]+$/, 'Только латинские буквы'),
});

interface PaymentFormProps {
  onStatusChange: (status: PaymentStatus, message?: string) => void;
  onDataChange: (data: Partial<PaymentFormData>) => void;
}

export const PaymentForm = ({ onStatusChange, onDataChange }: PaymentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolder: '',
    }
  });

  const watchedData = useWatch({ control });

  useEffect(() => {
    onDataChange(watchedData);
  }, [watchedData, onDataChange]);

  const onSubmit = async (data: PaymentFormData) => {
    setIsLoading(true);
    onStatusChange('loading');
    try {
      const result = await processPayment(data);
      onStatusChange('success', result.message);
    } catch (error) {
      if (error instanceof Error) {
        onStatusChange('error', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="payment-form">

      <div className="input-group">
        <label>Номер карты</label>
        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <IMaskInput
              mask="0000 0000 0000 0000"
              placeholder="0000 0000 0000 0000"
              value={field.value}
              onAccept={(value: string) => field.onChange(value)}
              className="input"
            />
          )}
        />
        {errors.cardNumber && <span className="error">{errors.cardNumber.message}</span>}
      </div>

      <div className="row">

        <div className="input-group">
          <label>Срок действия</label>
          <Controller
            name="expiryDate"
            control={control}
            render={({ field }) => (
              <IMaskInput
                mask="00/00"
                placeholder="MM/YY"
                value={field.value}
                onAccept={(value: string) => field.onChange(value)}
                className="input"
              />
            )}
          />
          {errors.expiryDate && <span className="error">{errors.expiryDate.message}</span>}
        </div>

        <div className="input-group">
          <label>CVV</label>
          <Controller
            name="cvv"
            control={control}
            render={({ field }) => (
              <IMaskInput
                mask="000"
                placeholder="***"
                type="password"
                value={field.value}
                onAccept={(value: string) => field.onChange(value)}
                className="input input-cvv"
              />
            )}
          />
          {errors.cvv && <span className="error">{errors.cvv.message}</span>}
        </div>
      </div>

      <div className="input-group">
        <label>Имя держателя</label>
        <input
          type="text"
          placeholder="IVAN IVANOV"
          {...register('cardHolder')}
          className="input"
          style={{ textTransform: 'uppercase' }}
        />
        {errors.cardHolder && <span className="error">{errors.cardHolder.message}</span>}
      </div>

      <button type="submit" disabled={isLoading} className="submit-btn">
        {isLoading ? 'Обработка...' : 'Оплатить'}
      </button>
    </form>
  );
};