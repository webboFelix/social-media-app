import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/service";
import { useSelector } from "react-redux";

export const useFetchRecipientUser = (chat) => {
  const { user } = useSelector((state) => state.authReducer.authData) || {};

  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members.find((id) => id !== user?._id);
  console.log("recipientUser", recipientUser);
  console.log("current user", user);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      const response = await getRequest(`${baseUrl}/user/${recipientId}`);

      if (response.error) {
        return setError(error);
      }

      setRecipientUser(response);
    };

    getUser();
  }, [recipientId]);

  return { recipientUser };
};
