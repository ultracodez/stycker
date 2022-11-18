import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  MantineColor,
  BadgeVariant
} from '@mantine/core';

export interface StyckerCardProps {
  id?: any;
  badge?: StyckerCardBadge;
  title: string;
  description: string;
  modifiers?: StyckerModifier[];
  callout?: string;
  image?: StyckerImage;
}

export interface StyckerImage {
  src: string;
  alt?: string;
}

export enum StyckerModifier {
  FavModifier,
  SupportedModifier,
  TimeRunningOutModifier,
  NewModifier,
  WowModifier,
  Tier1Modifier,
  Tier2Modifier,
  Tier3Modifier,
  PlaceAtTop
}

export interface StyckerCardBadge {
  color: MantineColor;
  text: string;
  variant?: BadgeVariant;
}

export function StyckerCard(props: StyckerCardProps) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        {props.image && props.image.src ? (
          <Image
            src={props.image.src}
            height={160}
            alt={props.image.alt ?? 'No image description provided'}
          />
        ) : undefined}
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{props.title}</Text>
        {props.badge ? (
          <Badge
            color={props.badge.color}
            variant={props.badge.variant ?? 'light'}
          >
            {props.badge.text}
          </Badge>
        ) : undefined}
      </Group>

      <Text size="sm" color="dimmed">
        {props.description}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        {props.callout ?? 'Go'}
      </Button>
    </Card>
  );
}
