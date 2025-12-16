import type { User, UpdateProfilePayload } from "../types";

// The URL of the backend server we created (running on port 5000)
const API_URL = "http://localhost:5000/api/profile";

// Endpoint 1: Fetch Profile [cite: 20-22]
// Real network call to GET /api/profile
export const getProfile = async (): Promise<User> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Error fetching profile: ${response.statusText}`);
  }

  // Returns the JSON object { id, username, bio, mood } [cite: 23-30]
  return response.json();
};

// Endpoint 2: Update Profile [cite: 31-33]
// Real network call to PUT /api/profile
export const updateProfile = async (data: UpdateProfilePayload): Promise<User> => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Sends { bio, mood } [cite: 34-39]
  });

  if (!response.ok) {
    throw new Error(`Error updating profile: ${response.statusText}`);
  }

  // NOTE: The Backend API spec says the PUT response is just a success message [cite: 40-44].
  // However, your function signature expects "Promise<User>".
  // To satisfy the type and ensure the UI shows the latest data, we fetch the fresh profile.
  return getProfile(); 
};