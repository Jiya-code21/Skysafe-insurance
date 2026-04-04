const BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() || "/api/v1";

const getToken = () => localStorage.getItem("token");

const readResponse = async (res) => {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

const request = async (method, path, body = null, auth = true) => {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await readResponse(res);
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

const formatPlanName = (planType) => {
  if (!planType) return "Plan";
  return `${planType.charAt(0).toUpperCase()}${planType.slice(1)} Plan`;
};

const formatTriggerLabel = (triggerType) => {
  const labels = {
    rain: "Heavy Rain",
    aqi: "Poor AQI",
    heat: "Heat Wave",
    curfew: "Curfew",
    flood: "Flood",
  };
  return labels[triggerType] || triggerType;
};

const normalizePolicy = (policy) => ({
  id: policy._id,
  title: policy.title,
  description: policy.description,
  weeklyPremium: policy.price,
  coverageAmount: policy.coverageAmount,
  duration: policy.duration,
  planType: policy.planType,
  planLabel: formatPlanName(policy.planType),
  triggerTypes: Array.isArray(policy.triggerTypes) ? policy.triggerTypes : [],
});

const normalizeSubscription = (subscription) => {
  const policy = subscription.policy || {};
  return {
    id: subscription._id,
    policyId: policy._id,
    policyTitle: policy.title || formatPlanName(policy.planType),
    planType: policy.planType,
    planLabel: formatPlanName(policy.planType),
    weeklyPremium: policy.price ?? subscription.amountPaid ?? 0,
    coverageAmount: policy.coverageAmount ?? 0,
    duration: policy.duration ?? 0,
    triggerTypes: Array.isArray(policy.triggerTypes) ? policy.triggerTypes : [],
    status: (subscription.status || "").toUpperCase(),
    startDate: subscription.startDate,
    endDate: subscription.endDate,
    amountPaid: subscription.amountPaid,
    paymentId: subscription.paymentId,
  };
};

const normalizeClaim = (claim) => {
  const subscription = claim.subscription || {};
  const policy = subscription.policy || {};
  return {
    id: claim._id,
    subscriptionId: subscription._id,
    policyTitle: policy.title || "Policy Plan",
    triggerType: claim.triggerType,
    triggerTypeLabel: formatTriggerLabel(claim.triggerType),
    triggerValue: claim.triggerValue,
    claimAmount: claim.claimAmount,
    status: (claim.status || "").toUpperCase(),
    createdAt: claim.createdAt,
    adminNote: claim.adminNote || "",
  };
};

// ── AUTH ──────────────────────────────────────────────────
export const authAPI = {
  register:        (body) => request("POST",  "/auth/register",          body, false),
  login:           (body) => request("POST",  "/auth/login",             body, false),
  forgotPassword:  (body) => request("POST",  "/auth/forgot-password",   body, false),
  verifyOtp:       (body) => request("POST",  "/auth/verify-otp",        body, false),
  verifyForgotOtp: (body) => request("POST",  "/auth/verify-forgot-otp", body, false),
  resetPassword:   (body) => request("POST",  "/auth/reset-password",    body, false),
  getMe:           ()     => request("GET",   "/auth/me"),
  changePassword:  (body) => request("PATCH", "/auth/change-password",   body),
  updateProfile:   (body) => request("PATCH", "/auth/update-profile",    body),
};

// ── POLICIES ──────────────────────────────────────────────
export const policyAPI = {
  getCatalog: async () => {
    const data = await request("GET", "/policies", null, false);
    return (data.policies || []).map(normalizePolicy);
  },
};

// ── SUBSCRIPTIONS ─────────────────────────────────────────
export const subscriptionAPI = {
  buy: async ({ policyId }) => {
    const data = await request("POST", "/subscriptions", { policyId });
    return normalizeSubscription(data.subscription);
  },
  getAll: async () => {
    const data = await request("GET", "/subscriptions");
    return (data.subscriptions || []).map(normalizeSubscription);
  },
  cancel: (id) => request("POST", `/subscriptions/${id}/cancel`),
};

// ── CLAIMS ────────────────────────────────────────────────
export const claimAPI = {
  create: async (body) => {
    const data = await request("POST", "/claims", body);
    return normalizeClaim(data.claim);
  },
  getAll: async () => {
    const data = await request("GET", "/claims");
    return (data.claims || []).map(normalizeClaim);
  },
  delete:       (id)                        => request("DELETE", `/claims/${id}`),
  updateStatus: (id, status, adminNote = "") =>
    request("PATCH", `/claims/${id}/status`, { status, adminNote }),
};

// ── WEATHER ───────────────────────────────────────────────
export const weatherAPI = {
  checkRain: (city) => request("GET", `/weather/${encodeURIComponent(city)}`, null, false),
};

// ── ADMIN ─────────────────────────────────────────────────
export const adminAPI = {
  getDashboard:   ()                          => request("GET",   "/admin/dashboard"),
  getUsers:       ()                          => request("GET",   "/admin/users"),
  deactivateUser: (id)                        => request("PATCH", `/admin/users/${id}/deactivate`),
  activateUser:   (id)                        => request("PATCH", `/admin/users/${id}/activate`),
  getClaims:      ()                          => request("GET",   "/admin/claims"),
  updateClaim:    (id, status, adminNote = "") => request("PATCH", `/admin/claims/${id}/status`, { status, adminNote }),
  getPolicies:    ()                          => request("GET",   "/admin/policies"),
  login:          (body)                      => request("POST",  "/admin/login", body, false),
};

export { formatTriggerLabel };
