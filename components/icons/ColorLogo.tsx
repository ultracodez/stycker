import { useMantineColorScheme } from '@mantine/core';
import Image from 'next/image';
import styckerDark from '../../public/stycker_dark.svg';
import styckerLight from '../../public/stycker_light.svg';

export default function ColorLogo(props: any) {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Image
      {...props}
      src={colorScheme === 'dark' ? styckerDark : styckerLight}
    />
  );
}
