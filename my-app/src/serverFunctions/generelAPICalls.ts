import { baseUrl } from "../globalVariables/global";
import { CustomToast } from "../pages/general/toast.style";

export async function sendPostRequest(url: string, data: any) {
  const response = await fetch(baseUrl + url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function getRequest(url: string) {
  const response = await fetch(baseUrl + url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    throw new Error(`${response.status}`);
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function sendPutRequest(url: string, data?: any) {
  const response = await fetch(baseUrl + url, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function sendDeleteRequest(url: string) {
  const response = await fetch(baseUrl + url, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export const errorHandlerNotfound = (
  error: any,
  message?: string
): string | undefined => {
  if (error.message === "404") {
    return "404";
  }
  CustomToast.error(message ? message : "Something went wrong");
  return;
};
