const API_BASE_URL = "http://34.70.38.87:5000/api";

export const sendOtp = async (name: string, email: string) => {
  const response = await fetch(`${API_BASE_URL}/otp/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to send OTP");
  return data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await fetch(`${API_BASE_URL}/otp/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "OTP verification failed");
  return data;
};

export const submitContactForm = async (formData: any) => {
  const response = await fetch(`${API_BASE_URL}/contact/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to submit form");
  return data;
};
