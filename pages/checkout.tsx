import { NextPage } from 'next';
import Layout from '../components/Layout';

import CheckoutForm from '../components/ui/Stripe/CheckoutForm';

const DonatePage: NextPage = () => {
  return (
    <div className="page-container">
      <h1>Donate with Checkout</h1>
      <p>Donate to our project 💖</p>
      <CheckoutForm />
    </div>
  );
};

export default DonatePage;
