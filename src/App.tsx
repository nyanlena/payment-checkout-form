import { useState, useCallback } from 'react';
import { CardPreview } from './components/CardPreview';
import { PaymentForm } from './components/PaymentForm';
import type { PaymentStatus, PaymentFormData } from './types/payment';
import './App.css';

function App() {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [message, setMessage] = useState<string>('');
  
  const [formData, setFormData] = useState<Partial<PaymentFormData>>({});

  const handleDataChange = useCallback((data: Partial<PaymentFormData>) => {
    setFormData(data);
  }, []);

  const handleStatusChange = useCallback((newStatus: PaymentStatus, msg?: string) => {
    setStatus(newStatus);
    if (msg) setMessage(msg);
  }, []);

  const reset = () => {
    setStatus('idle');
    setMessage('');
    setFormData({}); 
    window.location.reload();
  };

  return (
    <div className="app-container">
      <header>
        <h1>Оплата билета</h1>
      </header>

      <div className="checkout-container">
        {status !== 'success' && status !== 'error' && (
          <div className="card-section">
            <CardPreview data={formData} />
          </div>
        )}

        <div className="form-section">
          {status === 'idle' && (
            <PaymentForm 
              onStatusChange={handleStatusChange} 
              onDataChange={handleDataChange} 
            />
          )}

          {status === 'loading' && (
            <div className="status-screen">
              <div className="spinner"></div>
              <p>Связываемся с банком...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="status-screen success">
              <div className="icon">✅</div>
              <h2>Успешно!</h2>
              <p>{message}</p>
              <button onClick={reset} className="submit-btn">Вернуться</button>
            </div>
          )}

          {status === 'error' && (
            <div className="status-screen error">
              <div className="icon">❌</div>
              <h2>Ошибка</h2>
              <p>{message}</p>
              <button onClick={reset} className="submit-btn">Попробовать снова</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;