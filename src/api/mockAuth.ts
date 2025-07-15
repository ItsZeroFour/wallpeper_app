export interface AuthResponse {
  authorized: boolean;
}

export interface StatusResponse {
  status: "active" | "inactive" | "banned";
}

export function checkAuthorization(): Promise<AuthResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ authorized: true });
    }, 300);
  });
}

export function checkStatus(): Promise<StatusResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: "active" });
    }, 300);
  });
}
