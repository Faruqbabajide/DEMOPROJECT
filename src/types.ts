// src/types.ts

export interface User {
  id: string;
  username: string;
  bio: string;
  mood: string;
}

export interface UpdateProfilePayload {
  bio: string;
  mood: string;
}
