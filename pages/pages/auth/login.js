import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import AppConfig from "@/layout/AppConfig";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import { login_validation } from "@/lib/validation";
import { SignIn, getSignInErrorMessage } from "@/lib/firebase";

const LoginPage = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  const BASE_URL =
    process.env.NODE_ENV == "production"
      ? "https://sistem-kearsipan-dp-3-a.vercel.app/sakai-react"
      : "http://localhost:3000";

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  const simplifyError = (error) => {
    const errorMap = {
      CredentialsSignin: "Username atau password salah",
    };
    return errorMap[error] ?? "Unknown error occured";
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: login_validation,
    onSubmit,
  });

  // async function onSubmit(values) {
  //   setIsLoading(true);
  //   try {
  //     const response = await signIn("credentials", {
  //       username: values.username,
  //       password: values.password,
  //       redirect: false,
  //     });
  //     console.log(response);
  //     if (response.ok) {
  //       //authentication sucess
  //       router.push("/");
  //       setIsLoading(false);
  //     } else {
  //       setError(response.error);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Error during sign in:", error);
  //     setIsLoading(false);
  //   }
  // }

  async function onSubmit(values) {
    try {
      await SignIn(values.username, values.password);
      router.push(BASE_URL);
    } catch (error) {
      const message = getSignInErrorMessage(error) || "An error occured";
      console.log(message);
    }
  }

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: "53px" }}
          >
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">
                Welcome, Admin!!
              </div>
              <span className="text-600 font-medium">Sign in to continue</span>
              {/* <div className="my-1">
                {error && (
                  <Message severity="error" text={simplifyError(error)} />
                )}
              </div> */}
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Username
                </label>
                <InputText
                  inputid="username"
                  type="text"
                  placeholder="Username"
                  className={`w-full md:w-30rem mb-5 ${
                    formik.errors.username && formik.touched.username
                      ? "p-invalid"
                      : ""
                  }`}
                  style={{ padding: "1rem" }}
                  {...formik.getFieldProps("username")}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-900 font-medium text-xl mb-2"
                >
                  Password
                </label>
                <Password
                  inputid="password"
                  placeholder="Password"
                  toggleMask
                  feedback={false}
                  className={`w-full mb-5 ${
                    formik.errors.password && formik.touched.password
                      ? "p-invalid"
                      : ""
                  }`}
                  inputClassName="w-full p-3 md:w-30rem"
                  {...formik.getFieldProps("password")}
                ></Password>
              </div>
              <Button
                label={isLoading ? "Logging In..." : "Login"}
                className="w-full p-3 text-xl"
                // type="submit"
                // onClick={() => router.push("/")}
              ></Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return (
    <React.Fragment>
      {page}
      <AppConfig simple />
    </React.Fragment>
  );
};
export default LoginPage;
