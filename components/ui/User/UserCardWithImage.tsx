import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  Button,
  Box
} from '@mantine/core';
import { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    }`
  }
}));

interface UserCardImageProps {
  image?: string;
  avatar?: any;
  name: string;
  job?: string;
  stats: { label: string; value?: string }[];
}

export function UserCardImage({
  image,
  avatar,
  name,
  job,
  stats
}: UserCardImageProps) {
  const { classes, theme } = useStyles();

  const [randomColor, setRandomColor] = useState('#FFFFFF');

  useEffect(() => {
    setRandomColor(
      '#000000'.replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
      })
    );
  }, []);

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text align="center" size="lg" weight={500}>
        {stat?.value ?? 'N/A'}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {stat?.label ?? 'N/A'}
      </Text>
    </div>
  ));

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Card.Section>
        <Box
          sx={{
            backgroundColor: image?.includes('http')
              ? randomColor
              : image ?? randomColor,
            height: 100
          }}
        ></Box>
      </Card.Section>
      <Avatar
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      >
        {avatar}
      </Avatar>
      <Text align="center" size="lg" weight={500} mt="sm">
        {name}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {job}
      </Text>
      <Group mt="md" position="center" spacing={30}>
        {items}
      </Group>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === 'dark' ? undefined : 'dark'}
      >
        Follow
      </Button>
    </Card>
  );
}
