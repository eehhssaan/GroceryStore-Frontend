import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";

//internal import
import UserServices from "@services/UserServices";
import { UserContext } from "@context/UserContext";
import { notifyError, notifySuccess } from "@utils/toast";

const useLoginSubmit = (setModalOpen) => {
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = ({
    name,
    email,
    registerEmail,
    verifyEmail,
    password,
  }) => {
    setLoading(true);
    if (registerEmail && password) {
      UserServices.userLogin({
        registerEmail,
        password,
      })
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          router.push(redirect || "/");
          notifySuccess("Login Success!");
          dispatch({ type: "USER_LOGIN", payload: res });
          Cookies.set("userInfo", JSON.stringify(res));
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }
    if (name && email && password) {
      UserServices.verifyEmailAddress({ name, email, password })
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err.response.data.message);
        });
    }
    if (verifyEmail) {
      UserServices.forgetPassword({ verifyEmail })
        .then((res) => {
          setLoading(false);
          notifySuccess(res.message);
          setValue("verifyEmail");
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
        });
    }
  };
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const handleGoogleSignIn = (userResp) => {
    const user = parseJwt(userResp.credential);
    if (user.name) {
      UserServices.signUpWithProvider({
        name: user.name,
        email: user.email,
        image: user.imageUrl,
      })
        .then((res) => {
          setModalOpen(false);
          notifySuccess("Login success!");
          router.push(redirect || "/");
          dispatch({ type: "USER_LOGIN", payload: res });
          Cookies.set("userInfo", JSON.stringify(res));
        })

        .catch((err) => {
          notifyError(err.message);
          setModalOpen(false);
        });
    }
  };

  const handleFacebookSignIn = (user) => {
    console.log(user);
    if (user.name) {
      UserServices.signUpWithProvider({
        name: user.name,
        email: user.email,
        image: user.imageUrl,
      })
        .then((res) => {
          setModalOpen(false);
          notifySuccess("Login success!");
          router.push(redirect || "/");
          dispatch({ type: "USER_LOGIN", payload: res });
          Cookies.set("userInfo", JSON.stringify(res));
        })
        .catch((err) => {
          notifyError(err.message);
          setModalOpen(false);
        });
    }
  };

  return {
    handleSubmit,
    submitHandler,
    handleGoogleSignIn,
    handleFacebookSignIn,
    register,
    errors,
    GoogleLogin,
    FacebookLogin,
    loading,
  };
};

export default useLoginSubmit;
