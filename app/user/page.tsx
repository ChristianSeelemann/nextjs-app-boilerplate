import UserList from "../components/user/userList";
import getUser from "../lib/getUser";

async function getUsers() {
  const res = await fetch(
    process.env.BASE_URL + "/api/user/find?api_key=" + process.env.API_KEY
  );
  const users = await res.json();
  return users;
}

export default async function UserPage() {
  // Get user data
  const userData = await getUser();

  // Get all users
  const users = await getUsers();

  return (
    <>
      <section className="pagetitle">
        <h1 className="text-3xl font-bold">User!</h1>
        <p>This is the user page.</p>
      </section>
      <section>
        <UserList user={userData.user} users={users} />
      </section>
    </>
  );
}
