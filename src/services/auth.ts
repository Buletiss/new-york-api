export async function loginApi(username: string, password: string) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      console.error("Error:", response.statusText);
    }

    const data = await response.json();
    localStorage.setItem("token", data.accessToken);
    return data;
  } catch (error) {
    console.error("error login", error);
    throw error;
  }
}
