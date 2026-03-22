// const BASE_URL = "http://localhost:5000/api/v1";

// // ─── Helper ───────────────────────────────────────────────────────────────────
// const getToken = () => localStorage.getItem("token");

// const request = async (method, path, body = null, auth = true) => {
//   const headers = { "Content-Type": "application/json" };
//   if (auth) headers["Authorization"] = `Bearer ${getToken()}`;

//   const res = await fetch(`${BASE_URL}${path}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : null,
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Something went wrong");
//   return data;
// };

// // ─── AUTH ─────────────────────────────────────────────────────────────────────
// export const authAPI = {
//   register: (body) => request("POST", "/auth/register", body, false),
//   login: (body) => request("POST", "/auth/login", body, false),
//   forgotPassword: (body) => request("POST", "/auth/forgot-password", body, false),
//   verifyOtp: (body) => request("POST", "/auth/verify-otp", body, false),
//   resetPassword: (body) => request("POST", "/auth/reset-password", body, false),
//   getMe: () => request("GET", "/auth/me"),
//   changePassword: (body) => request("PATCH", "/auth/change-password", body),
//   updateProfile: (body) => request("PATCH", "/auth/update-profile", body),
// };

// // ─── POLICY ───────────────────────────────────────────────────────────────────
// export const policyAPI = {
//   buy: (body) => request("POST", "/policy/buy", body),
//   getAll: () => request("GET", "/policy/"),
// };

// // ─── CLAIM ────────────────────────────────────────────────────────────────────
// export const claimAPI = {
//   create: (body) => request("POST", "/claim/", body),
//   getAll: () => request("GET", "/claim/"),
//   delete: (id) => request("DELETE", `/claim/${id}`),
//   updateStatus: (id, status) => request("PATCH", `/claim/${id}/status`, { status }),
// };

// // ─── WEATHER ──────────────────────────────────────────────────────────────────
// export const weatherAPI = {
//   checkRain: (city) => request("GET", `/weather/${city}`, null, false),
// };
const BASE_URL = "http://localhost:5000/api/v1";

// ─── Helper ───────────────────────────────────────────────────────────────────
const getToken = () => localStorage.getItem("token");

const request = async (method, path, body = null, auth = true) => {
  const headers = { "Content-Type": "application/json" };
  if (auth) headers["Authorization"] = `Bearer ${getToken()}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (body) => request("POST", "/auth/register", body, false),
  login: (body) => request("POST", "/auth/login", body, false),
  forgotPassword: (body) => request("POST", "/auth/forgot-password", body, false),
  verifyOtp: (body) => request("POST", "/auth/verify-otp", body, false),
  resetPassword: (body) => request("POST", "/auth/reset-password", body, false),
  getMe: () => request("GET", "/auth/me"),
  changePassword: (body) => request("PATCH", "/auth/change-password", body),
  updateProfile: (body) => request("PATCH", "/auth/update-profile", body),
};

// ─── POLICY ───────────────────────────────────────────────────────────────────
export const policyAPI = {
  buy: (body) => request("POST", "/policy/buy", body),
  getAll: () => request("GET", "/policy/"),
};

// ─── CLAIM ────────────────────────────────────────────────────────────────────
export const claimAPI = {
  create: (body) => request("POST", "/claim/", body),
  getAll: () => request("GET", "/claim/"),
  delete: (id) => request("DELETE", `/claim/${id}`),
  updateStatus: (id, status) => request("PATCH", `/claim/${id}/status`, { status }),
};

// ─── WEATHER ──────────────────────────────────────────────────────────────────
export const weatherAPI = {
  checkRain: (city) => request("GET", `/weather/${city}`, null, false),
};
