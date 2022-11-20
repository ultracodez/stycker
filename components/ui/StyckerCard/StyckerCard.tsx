import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  MantineColor,
  BadgeVariant,
  AspectRatio,
  MANTINE_COLORS,
  Spoiler
} from '@mantine/core';
import Link from 'next/link';

export interface StyckerCardProps {
  id?: any;
  badge?: StyckerCardBadge;
  title: string;
  description: string;
  modifiers?: StyckerModifier[];
  callout?: string;
  image?: StyckerImage;
  link?: string;
  createdAt: Date;
  funding?: number;
  ownerId: any;
  interested?: any[];
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
    <Link href={`/stycker/${props.id}`} passHref>
      <Card shadow="sm" p="lg" radius="md" component="a" withBorder>
        <Card.Section>
          {props.image && props.image.src ? (
            <AspectRatio style={{ height: 400 }} ratio={16 / 9}>
              <Image
                src={props.image.src}
                alt={props.image.alt ?? 'No image description provided'}
              />
            </AspectRatio>
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
          <Spoiler maxHeight={110} showLabel="Show more" hideLabel="Hide">
            {props.description}
          </Spoiler>
          <br />
          <i>Created on {props.createdAt.toLocaleDateString()}</i>
        </Text>

        {props.link ? (
          <Link href={props.link} passHref>
            <Button
              component="a"
              variant="light"
              color={
                MANTINE_COLORS[
                  Math.floor(Math.random() * (MANTINE_COLORS.length - 0))
                ]
              }
              fullWidth
              mt="md"
              radius="md"
            >
              {props.callout ?? 'Go'}
            </Button>
          </Link>
        ) : undefined}
      </Card>
    </Link>
  );
}
