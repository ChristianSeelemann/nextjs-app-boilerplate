export type User = {
  _id: string;
  name: string;
  email: string | null;
  image: string;
  emailVerified: boolean;
  banned?: boolean | null;
  nickname?: string | null;
  colormode: string | null;
} | null;

export type Session = {
  user: User;
  token: string | undefined;
} | null;
