"use client";

import { useRegisterMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import React, {
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";
import RegistrationSuccess from "./RegistrationSuccess";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { name, email, phone, password } = user;

  const router = useRouter();

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      // router.push("/login");
      toast.success("Account Registered. You can login now");
    }
  }, [error, isSuccess]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      phone,
      password,
    };

    register(userData);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="wrapper">
      <div className="col-10 col-lg-3">
        <div className="row justify-content-center choose-us">
          <div className="p-4 border rounded-4 h-100 card">
            {isSuccess ? (
              <>
                <RegistrationSuccess />
              </>
            ) : (
              <div className="card-body">
                <form onSubmit={submitHandler}>
                  <h4 className="mb-4 text-center">Join Us</h4>

                  <div className="mb-3">
                    <label htmlFor="name_field" className="form-label">
                      {" "}
                      Full Name{" "}
                    </label>
                    <input
                      type="text"
                      id="name_field"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={onChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="email_field">
                      {" "}
                      Email{" "}
                    </label>
                    <input
                      type="email"
                      id="email_field"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={onChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="phone_field">
                      {" "}
                      Phone{" "}
                    </label>
                    <input
                      type="text"
                      id="phone_field"
                      className="form-control"
                      name="phone"
                      value={phone}
                      onChange={onChange}
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label" htmlFor="password_field">
                      {" "}
                      Password{" "}
                    </label>
                    <input
                      type="password"
                      id="password_field"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={onChange}
                      disabled={isLoading}
                    />
                  </div>

                  <button type="submit" className="btn form-btn w-100 py-2">
                    {isLoading ? <ButtonLoader /> : "Register"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
