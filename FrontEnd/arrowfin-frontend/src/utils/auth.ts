// Maneja el login y retorna el token JWT
export async function login(traderId: string, brokerId: string): Promise<string> {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ traderId, brokerId }),
  });

  if (!res.ok) {
    throw new Error("Error en login");
  }

  const data = await res.json();
  return data.access_token;
}
