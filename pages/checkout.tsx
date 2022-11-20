import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { StyckerCardProps } from '@/components/ui/StyckerCard/StyckerCard';
import CheckoutForm from '../components/ui/Stripe/CheckoutForm';
import { Container } from '@mantine/core';

const DonatePage: NextPage = () => {
  const router = useRouter();
  const { styckerId, type } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [styckerData, setStyckerData] = useState<StyckerCardProps | undefined>(
    undefined
  );
  const supabaseClient = useSupabaseClient();

  async function fetchData() {
    const item = (
      await supabaseClient
        .from('styckerBoard')
        .select('*')
        .eq('id', styckerId)
        .single()
    ).data;
    setStyckerData({
      id: item.id,
      title: item.title,
      description: item.description,
      callout: item.callout,
      badge: item.badge,
      image: { src: item.image, alt: item.imageAlt },
      link: item.link,
      createdAt: new Date(item.created_at),
      funding: item.funding_acquired,
      ownerId: item.owner_id,
      interested: item.interested,
      stars: item.stars
    });
    setIsLoading(false);
  }

  useEffect(() => {
    if (styckerId) fetchData();
  }, []);

  return (
    <Container>
      <h1>Donate with Checkout</h1>
      <p>
        Donate to <b>{styckerData?.title}</b>
      </p>
      <CheckoutForm />
    </Container>
  );
};

export default DonatePage;
