"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";
import RegistrationSuccess from "./RegistrationSuccess";

const Login = () => {
  const [email, setEmail] = useState("");
  const [toggleForm, setToggleForm] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // Email not verified, please validate your email address.
    // Invalid email or password

    if (result?.error && result?.error.includes("Email not verified")) {
      setToggleForm(false);
      setLoading(false);
    } else if (result?.error) {
      toast.error(result.error);
      setToggleForm(true);
      setLoading(false);
    } else {
      router.replace("/");
    }
  };
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-3 choose-us">
        {toggleForm ? (
          <div className="card p-4 border rounded">
            <form onSubmit={submitHandler}>
              <h4 className="mb-3 text-center">Login</h4>
              <div className="mb-3">
                <label className="form-label" htmlFor="email_field">
                  {" "}
                  Email{" "}
                </label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  placeholder="customers@zhelps.in"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="password_field">
                  Password{" "}
                </label>
                <input
                  type="password"
                  id="password_field"
                  placeholder="your secreate password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Link href="/password/forgot" className="float-end mt-2">
                Forgot Password?
              </Link>

              <button
                id="login_button"
                type="submit"
                className="btn form-btn w-100 py-2"
                disabled={loading}
              >
                {loading ? <ButtonLoader /> : "LOGIN"}
              </button>

              <div className="mt-3 mb-4">
                <a href="/register" className="float-end">
                  {" "}
                  New User? Register Here{" "}
                </a>
              </div>
            </form>
          </div>
        ) : (
          <RegistrationSuccess />
        )}
      </div>
    </div>
  );
};

export default Login;
