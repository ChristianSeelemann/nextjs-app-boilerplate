import { cookies } from "next/headers";

export default async function getUser() {
  const allCookies = cookies();
  const token = allCookies.get("next-auth.session-token");

  if (token) {
    const getUser = await fetch(
      process.env.BASE_URL +
        "/api/user/get?token=" +
        token.value +
        "&api_key=" +
        process.env.API_KEY,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const user = await getUser.json();

    if (!user) {
      return null;
    } else {
      return user;
    }
  }

  return null;
}
