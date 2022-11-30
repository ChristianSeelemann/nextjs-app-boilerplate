import { cookies } from "next/headers";

export default async function getUser() {
  const allCookies = cookies();
  const token = allCookies.get("next-auth.session-token");

  //Only read user data when token cookie is present
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
    const user = getUser.json();

    //No user found
    if (!user) {
      return null;
    } else {
      return user;
    }
  }

  return null;
}
