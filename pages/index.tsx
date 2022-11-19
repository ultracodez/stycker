import StyckerCard from '@/components/ui/StyckerCard';
import { StyckerCardProps } from '@/components/ui/StyckerCard/StyckerCard';
import { useUser } from '@/utils/useUser';
import {
  SimpleGrid,
  LoadingOverlay,
  Paper,
  Group,
  Button,
  NativeSelect
} from '@mantine/core';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { title } from 'process';
import { useEffect, useState } from 'react';
import StackGrid from 'react-stack-grid';

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
        image: { src: item.image, alt: item.imageAlt },
        link: item.link
      });
    });
    setData(newData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Paper>
        <Group position="apart" className="px-32 py-4">
          <Group>
            <NativeSelect
              data={['Upload Date', 'Funding', 'Upvotes', 'Views']}
              radius="xl"
            />
          </Group>
          <Button color="teal" radius="lg">
            Create
          </Button>
        </Group>
      </Paper>
      <StackGrid columnWidth={400} gutterWidth={20} gutterHeight={20}>
        {data.map((item) => {
          return <StyckerCard key={item.id} {...item} />;
        })}

        {data.map((item) => {
          return <StyckerCard key={item.id} {...item} />;
        })}
        {data.map((item) => {
          return <StyckerCard key={item.id} {...item} />;
        })}
        {data.map((item) => {
          return <StyckerCard key={item.id} {...item} />;
        })}
        {data.map((item) => {
          return <StyckerCard key={item.id} {...item} />;
        })}
      </StackGrid>
    </>
  );
}
