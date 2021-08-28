import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authenticate, isAuth, SignIn } from "../actions/user";
import Router from "next/router";

const schema = yup.object().shape({
  email: yup.string().email().required().lowercase(),
  password: yup
    .string()
    .min(4, "atleast 5 letter required")
    .required()
    .lowercase(),
});

function SignInComponent() {
  const [values, setValues] = useState({
    loading: false,
    message: "",
    error: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    let formdata = new FormData();
    setValues({ ...values, loading: true });

    formdata.append("email", data.email);
    formdata.append("password", data.password);
    console.log(data);
    SignIn(data)
      .then((data) => {
        setValues({
          ...values,
          loading: false,
          message: "Sign In Successfully",
        });
        authenticate(data, () => {
          if (isAuth()) {
            // console.log(JSON.parse(isAuth()));
            // let isauth:any = isAuth();
            // console.log(JSON.parse(isauth));
            Router.push(`/profile/${isAuth().name}`);
          }
        });
        console.log(data);
      })
      .catch((e) => {
        setValues({ ...values, loading: false, error: data.error });
      });
  };

  return (
    <div className="formcontainer">
      <h1 className="SignUpH1">SignIn</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group"></div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            {...register("email")}
          />

          <p className="errorcolor">{errors.email?.message}</p>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password")}
          />
          <p className="errorcolor">{errors.password?.message}</p>
        </div>

        <button type="submit" className="btn btn-primary">
          SignIn
        </button>
      </form>
    </div>
  );
}

export default SignInComponent;
