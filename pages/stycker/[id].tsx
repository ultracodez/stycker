import { StyckerCardProps } from '@/components/ui/StyckerCard/StyckerCard';
import {
  Anchor,
  AspectRatio,
  Box,
  Breadcrumbs,
  Center,
  Container,
  LoadingOverlay,
  Paper
} from '@mantine/core';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const StyckerSpecific = () => {
  const router = useRouter();
  const { id } = router.query;

  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<StyckerCardProps | undefined>(undefined);

  const items = [
    { title: 'styckers', href: '/styckers' },
    { title: data?.title ?? '', href: `/stycker/${id}` }
  ].map((item, index) => (
    <Link href={item.href} key={index} passHref>
      <Anchor component="a">{item.title}</Anchor>
    </Link>
  ));

  async function fetchData() {
    const item = (
      await supabaseClient
        .from('styckerBoard')
        .select('*')
        .eq('id', id)
        .single()
    ).data;
    setData({
      id: item.id,
      title: item.title,
      description: item.description,
      callout: item.callout,
      badge: item.badge,
      image: { src: item.image, alt: item.imageAlt },
      link: item.link,
      createdAt: new Date(item.created_at),
      funding: item.funding_acquired
    });
    setIsLoading(false);
  }

  useEffect(() => {
    if (id) fetchData();
  }, []);

  return (
    <>
      {
        // `id` is defined after hydrating client-side
        id && (
          <Container sx={{ paddingTop: '2rem', position: 'relative' }}>
            <Breadcrumbs>{items}</Breadcrumbs>
            <Box sx={{ paddingTop: '2rem' }}>
              <Paper
                sx={(theme) => ({
                  height: '22rem',
                  backgroundImage: theme.fn.gradient({
                    from: '#8338ec',
                    to: theme.colorScheme === 'dark' ? '#C239ED' : '#3969ED',
                    deg: 45
                  }),
                  color: theme.white,
                  borderRadius: '1rem'
                })}
              >
                <Box sx={{ paddingTop: '1rem' }}>
                  <AspectRatio
                    ratio={16 / 9}
                    sx={{
                      height: '20rem'
                    }}
                  >
                    {data?.image ? (
                      <Image
                        layout="fill"
                        src={data?.image?.src ?? ''}
                        alt={
                          data?.image?.alt ??
                          'No description was provided for this image'
                        }
                      />
                    ) : undefined}
                  </AspectRatio>
                </Box>
              </Paper>
            </Box>
            <h1>{data?.title}</h1>
            <p>{data?.description}</p>
          </Container>
        )
      }
    </>
  );
};

export default StyckerSpecific;
