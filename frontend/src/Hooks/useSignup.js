import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, SetLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullname,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputError({
      fullname,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    SetLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();
         
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Account Registered");
    } catch (error) {
      toast.error(error.message);

    } finally {
      SetLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

function handleInputError({
  fullname,
  username,  
  password,
  confirmPassword,
  gender,
}) {
  if (!username || !password || !confirmPassword || !fullname || !gender) {
    toast.error("please Fill in all the fields ");
   
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwaord doest not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Passwaord must be tleast 6 letters");
    return false;
  }
  return true;
}
