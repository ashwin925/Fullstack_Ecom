async function fetchWithAuth(url, options = {}) {
  let response = await fetch(url, options);

  // If token expired, refresh and retry
  if (response.status === 403) {
      await refreshToken();
      response = await fetch(url, options); // Retry the request
  }

  return response.json();
}

async function refreshToken() {
  await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });
}

// Example: Fetch user data
async function getUserData() {
  const data = await fetchWithAuth('/api/auth/user', { credentials: 'include' });
  console.log("User Data:", data);
}
