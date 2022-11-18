import {
  createStyles,
  Container,
  Group,
  Anchor,
  useMantineColorScheme,
  Box
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import styckerDark from '../../../public/stycker_dark.svg';
import styckerLight from '../../../public/stycker_light.svg';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column'
    }
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md
    }
  }
}));

interface FooterSimpleProps {
  links: { link: string; label: string }[];
  style: any;
}

export default function FooterSimple({ links, style }: FooterSimpleProps) {
  const { colorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  const items = links?.map((link) => (
    <Link key={link.label} href={link.link} passHref>
      <Anchor<'a'> color="dimmed" size="sm">
        {link.label}
      </Anchor>
    </Link>
  ));

  return (
    <div style={style} className={classes.footer}>
      <Container className={classes.inner}>
        <Box sx={{ height: 28, position: 'relative' }}>
          <Image
            src={colorScheme === 'dark' ? styckerDark : styckerLight}
            height="28"
            width="120"
          />
        </Box>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
