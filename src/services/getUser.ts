export async function authUser() {
  const token = localStorage.getItem("token");

  const parsedToken = JSON.parse(token || "");

  try {
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("email ou senha invalido");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
