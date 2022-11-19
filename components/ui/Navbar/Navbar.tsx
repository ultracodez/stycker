import Link from 'next/link';
import s from './Navbar.module.css';

import Logo from 'components/icons/Logo';
import { useRouter } from 'next/router';
import { useUser } from 'utils/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import ColorLogo from '@/components/icons/ColorLogo';
import { Anchor, createStyles, useMantineColorScheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  navbar: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`
  }
}));

const Navbar = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const { colorScheme } = useMantineColorScheme();

  return (
    <nav className={classes.navbar}>
      <a href="#skip" tabIndex={10} className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="pt-2 mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/" passHref>
              <Anchor tabIndex={9} className={s.logo} aria-label="Logo">
                <ColorLogo
                  style={{ marginTop: '2px' }}
                  height={'30'}
                  width="160"
                />
              </Anchor>
            </Link>
            <nav className="space-x-2 ml-6 hidden lg:block">
              <Link href="/" passHref>
                <Anchor tabIndex={10}>Pricing</Anchor>
              </Link>
              <Link href="/account" passHref>
                <Anchor tabIndex={10}>Account</Anchor>
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 justify-end space-x-8">
            {user ? (
              <span
                tabIndex={9}
                className={s.link}
                onClick={async () => {
                  await supabaseClient.auth.signOut();
                  router.push('/signin');
                }}
              >
                Sign out
              </span>
            ) : (
              <Link tabIndex={9} href="/signin" passHref>
                <Anchor tabIndex={10} component="a">
                  Sign in
                </Anchor>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
