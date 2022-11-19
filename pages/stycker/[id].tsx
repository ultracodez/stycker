import { StyckerCardProps } from '@/components/ui/StyckerCard/StyckerCard';
import {
  Anchor,
  AspectRatio,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Container,
  Group,
  LoadingOverlay,
  Paper,
  Spoiler,
  Text,
  ThemeIcon,
  useMantineColorScheme
} from '@mantine/core';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IconCash } from '@tabler/icons';

const StyckerSpecific = () => {
  const router = useRouter();
  const { id } = router.query;

  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<StyckerCardProps | undefined>(undefined);
  const { colorScheme } = useMantineColorScheme();

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
            {data?.image?.src ? (
              <Box sx={{ paddingTop: '2rem' }}>
                <Paper
                  withBorder
                  sx={(theme) => ({
                    /*backgroundImage: theme.fn.gradient({
                    from: '#8338ec',
                    to: theme.colorScheme === 'dark' ? '#C239ED' : '#3969ED',
                    deg: 45
                  }),*/
                    borderWidth: '2px',
                    color: theme.white,
                    borderRadius: '1rem'
                  })}
                >
                  <AspectRatio ratio={16 / 9} sx={{ height: '20rem' }}>
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
                </Paper>
              </Box>
            ) : undefined}
            <Group position="apart">
              <h1>{data?.title}</h1>

              <Button
                color={colorScheme === 'dark' ? 'teal.4' : 'teal.6'}
                sx={(theme) => ({
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[7]
                      : '#FFFFFF'
                })}
              >
                Sponsor This Stycker
              </Button>
            </Group>
            <Group position="apart">
              <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                {/* Content here */}
                <p>{data?.description}</p>
              </Spoiler>
              <Text c={colorScheme === 'dark' ? 'teal.4' : 'teal.6'}>
                <Center>
                  <ThemeIcon
                    sx={{ marginRight: '4px' }}
                    variant="light"
                    color={colorScheme === 'dark' ? 'teal.4' : 'teal.6'}
                  >
                    <IconCash />
                  </ThemeIcon>
                  ${data?.funding}
                </Center>
              </Text>
            </Group>
          </Container>
        )
      }
    </>
  );
};

export default StyckerSpecific;
