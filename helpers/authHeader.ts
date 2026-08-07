import { cookies } from "next/headers";

export const getAuthCookieName = () =>
  process.env.NODE_ENV === "production"
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

export const getAuthHeader = async () => {
  const nextCookies = await cookies();

  // const cookieHeader = cookieStore
  //   .getAll()
  //   .map(({ name, value }) => `${name}=${value}`)
  //   .join("; ");

  // console.log(cookieStore.getAll());

  const cookieName = getAuthCookieName();

  const nextAuthSessionToken = nextCookies.get(cookieName);

  return {
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    },
  };
};
