export type User = {
  user: {
    _id: string;
    name: string;
    email: string | null;
    image: string;
    emailVerified: boolean;
    banned: boolean | null;
    nickname: string | null;
    colormode: string | null;
  };
  token: string | string[] | undefined;
} | null;
