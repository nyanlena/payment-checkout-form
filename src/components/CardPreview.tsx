import type { PaymentFormData } from '../types/payment';

interface CardPreviewProps {
  data: Partial<PaymentFormData>;
}

export const CardPreview = ({ data }: CardPreviewProps) => {
  const displayCardNumber = data.cardNumber 
    ? data.cardNumber.replace(/(\d{4})/g, '$1 ').trim() 
    : '#### #### #### ####';

  return (
    <div className="card-preview">
      <img 
        src="/public/hello-kitty.png" 
        alt="Card Chip" 
        className="card-chip-img" 
      />
      <div className="card-number">{displayCardNumber}</div>
      <div className="card-bottom">
        <div className="card-holder">
          <span className="label">Card Holder</span>
          <span className="value">{data.cardHolder || 'YOUR NAME'}</span>
        </div>
        <div className="card-expiry">
          <span className="label">Expires</span>
          <span className="value">{data.expiryDate || 'MM/YY'}</span>
        </div>
      </div>
    </div>
  );
};