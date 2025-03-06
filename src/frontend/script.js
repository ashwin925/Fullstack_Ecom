async function fetchWithAuth(url, options = {}) {
  options.credentials = "include";

  let response = await fetch(url, options);

  if (response.status === 403) {
      await refreshToken();
      response = await fetch(url, options);
  }

  return response.json();
}

async function refreshToken() {
  await fetch("http://localhost:5000/api/auth/refresh", { 
      method: "POST", 
      credentials: "include" 
  });
}

async function getUserData() {
  const data = await fetchWithAuth("http://localhost:5000/api/auth/me", { credentials: "include" });
  console.log("User Data:", data);
}
