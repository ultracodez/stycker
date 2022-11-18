import StyckerCard from '@/components/ui/StyckerCard';
import { StyckerCardProps } from '@/components/ui/StyckerCard/StyckerCard';
import { useUser } from '@/utils/useUser';
import { SimpleGrid, LoadingOverlay } from '@mantine/core';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { title } from 'process';
import { useEffect, useState } from 'react';

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [data, setData] = useState<StyckerCardProps[]>([]);

  async function fetchData() {
    const dat = await supabaseClient.from('styckerBoard').select('*');
    const newData: Array<StyckerCardProps> = [];
    dat.data?.forEach((item) => {
      newData.push({
        id: item.id,
        title: item.title,
        description: item.description,
        callout: item.callout,
        badge: item.badge,
        image: { src: item.image, alt: item.imageAlt }
      });
    });
    setData(newData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SimpleGrid cols={5} sx={{ position: 'relative' }}>
        <LoadingOverlay visible={isLoading} />
        <StyckerCard badge={{ text: 'wow', color: 'pink' }} />
        <StyckerCard />
        <StyckerCard />
        <StyckerCard />
        <StyckerCard />
        <StyckerCard />
        <StyckerCard />
        {data.map((item) => {
          return <StyckerCard key={item.id} {...item} />;
        })}
      </SimpleGrid>
    </>
  );
}
