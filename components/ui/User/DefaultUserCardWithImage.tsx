import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UserCardImage } from './UserCardWithImage';
import UserType from './UserType';

interface DefaultUserCardImageProps {
  id: any;
}

export function DefaultUserCardImage({ id }: DefaultUserCardImageProps) {
  const [userData, setUserData] = useState<UserType | undefined>();
  const supabaseClient = useSupabaseClient();

  async function FetchDataReqd() {
    const data = await (
      await supabaseClient.from('profiles').select('*').eq('id', id).single()
    ).data;
    if (data)
      setUserData({
        id: id,
        avatar_url: data.avatar_url,
        data: data.data,
        bio: data.bio,
        updated_at: new Date(data.updated_at),
        website: data.website,
        username: data.username,
        full_name: data.full_name,
        avatar_bg: data.avatar_bg,
        email: data.email
      });
  }
  useEffect(() => {
    FetchDataReqd();
  }, [id]);

  return (
    <>
      {userData ? (
        <UserCardImage
          name={userData.full_name || 'Unknown User'}
          job={userData.data?.job}
          avatar={
            userData.avatar_url ? (
              <Image
                height={80}
                width={80}
                style={{ borderRadius: '100rem' }}
                src={userData.avatar_url}
              />
            ) : (
              userData.full_name?.charAt(0) ?? 'N/A'
            )
          }
          image={userData.avatar_bg}
          stats={[
            { label: 'Joined' },
            { label: 'Followers' },
            { label: 'Styckers' }
          ]}
        />
      ) : undefined}
    </>
  );
}
