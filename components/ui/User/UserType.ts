export default interface UserType {
  data?: UserData;
  id: any;
  updated_at: Date;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  avatar_bg?: string;
  website?: string;
  bio?: string;
}
interface UserData {
  job?: string;
}
export type { UserType, UserData };
