export type User = {
  _id: string;
  name: string;
  email: string | null;
  image: string;
  emailVerified: boolean;
  banned?: boolean | null;
  nickname?: string | null;
  colormode: string | null;
  lastOnline: Date | null;
  privacy: {
    showLastOnline: boolean | null;
  };
  role: string[] | null;
  bannedReason?: string | null;
  bannedUntil?: number | null;
  alias: string | null;
  firstName: string | null;
  lastName: string | null;
} | null;

export type Session = {
  user: User;
  token: string | undefined;
} | null;
