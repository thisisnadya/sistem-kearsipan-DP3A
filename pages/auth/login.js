import getConfig from "next/config";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import AppConfig from "@/layout/AppConfig";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import { login_validation } from "@/lib/validation";
import { signIn, signOut } from "next-auth/react";

const LoginPage = () => {
  const callbackUrl =
    process.env.NODE_ENV == "production"
      ? "https://sistem-kearsipan-dp-3-a.vercel.app/sakai-react/index.js"
      : "http://localhost:3000";
  const { layoutConfig } = useContext(LayoutContext);
  const contextPath = getConfig().publicRuntimeConfig.contextPath;
  const router = useRouter();
  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: login_validation,
    onSubmit,
  });

  async function onSubmit(values) {
    setIsLoading(true);
    const status = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl,
    });

    console.log(status);
    if (status.ok) {
      setIsLoading(false);
      router.push(callbackUrl);
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
                  className="w-full md:w-30rem mb-5"
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
                  className="w-full mb-5"
                  inputClassName="w-full p-3 md:w-30rem"
                  {...formik.getFieldProps("password")}
                ></Password>
              </div>

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <span
                  className="font-medium no-underline ml-2 text-right cursor-pointer"
                  style={{ color: "var(--primary-color)" }}
                >
                  Forgot password?
                </span>
              </div>
              <Button
                label={isLoading ? "Logging In..." : "Login"}
                className="w-full p-3 text-xl"
                // type='submit'
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
