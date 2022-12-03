import { cookies } from "next/headers";

export default async function getUser() {
  const allCookies = cookies();
  const token = allCookies.get("next-auth.session-token");

  //Only read user data when token cookie is present
  if (token) {
    // Try to get user data from the token
    const getUser = await fetch(
      process.env.BASE_URL +
        "/api/user/getSelf?token=" +
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
    //When no user data is found, return null
    if (!user) {
      return null;
      // When user data is found, return user data
    } else {
      return user;
    }
    // When no token cookie found set user to null
  } else {
    return null;
  }
}
