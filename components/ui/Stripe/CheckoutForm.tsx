import React, { useState } from 'react';

//import CustomDonationInput from '../components/CustomDonationInput';
//import StripeTestCards from '../components/StripeTestCards';

import { getStripe } from '@/utils/stripe-client';
import { fetchPostJSON } from '@/utils/api-helpers'; //'../utils/api-helpers';
import { formatAmountForDisplay } from '@/utils/stripe-helpers';
import { Button, Center, Group, NumberInput } from '@mantine/core';
//import * as config from '../config';

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    customDonation: Math.round(1)
  });
  const [value, setValue] = useState(0.5);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: input.customDonation
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group>
        <NumberInput
          parser={(value: any) =>
            value.replace('$', '').replace(/[^0-9|\.]+/g, '')
          }
          formatter={(value: any) =>
            !Number.isNaN(parseFloat(value)) ? `$ ${value}` : '$ '
          }
          value={value}
          onChange={(val: any) => setValue(Math.round(val * 100) / 100)}
        />

        <Button
          className="checkout-style-background"
          type="submit"
          disabled={loading || !value || value < 0.5}
        >
          Donate {value ? formatAmountForDisplay(value, 'usd') : '$0'}
        </Button>
      </Group>
    </form>
  );
};

export default CheckoutForm;
