import { useState } from "react";
import { baseUrl } from "../redux/baseUrl";
import { ErrorMessageType } from "../redux/types";

const usePostRequest = (url: string, body: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorMessageType | null>(null);

  const formatError = (error: any): ErrorMessageType => {
    if (
      error &&
      typeof error.statusCode === "number" &&
      typeof error.message === "string"
    ) {
      return error;
    } else {
      return {
        statusCode: 500,
        message: "An unexpected error occurred",
      };
    }
  };

  const sendRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(baseUrl + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(formatError(error));
      setLoading(false);
    }
  };

  return { data, loading, error, sendRequest };
};

export default usePostRequest;
