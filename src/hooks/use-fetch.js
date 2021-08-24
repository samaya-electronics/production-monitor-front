import { useState } from "react";

const useFetch = (setMessage) => {
  const [isLoading, setLoading] = useState(false);
  const sendReq = async (url, config,sucessAction) => {
    setLoading(true);
    try {
      const response = await fetch(url, config)
      if (!response.ok) {
        throw new Error("Error Sending Request");
      }

      const data = await response.json();
      console.log(response);
      sucessAction(data.data);
    } catch (error) {
      setMessage({val:error.message,type:"is-danger"})
    }
    setLoading(false);
  };
  return { sendReq, isLoading };
};
export default useFetch;
