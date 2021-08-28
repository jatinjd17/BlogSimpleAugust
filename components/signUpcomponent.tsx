import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignUp } from "../actions/user";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required().lowercase(),
  password: yup
    .string()
    .min(4, "atleast 5 letter required")
    .required()
    .lowercase(),
  // photo: yup.mixed().test("fileSize", "The file is too large", (value) => {
  //     if (!value.length) return true // attachment is optional
  //     return value[0].size <= 2000000
  //   }),
});

function SignUpComponent() {
  const [values, setValues] = useState({
    loading: false,
    error: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setValues({ ...values, loading: true });
    let formdata = new FormData();
    // console.log(data);
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("photo", data.photo);
    SignUp(data)
      .then((data) => {
        setValues({ ...values, loading: false, message: data.message });
      })
      .catch((e) => {
        setValues({ ...values, loading: false, error: data.error });
      });
  };

  return (
    <div className="formcontainer">
      <h1 className="SignUpH1">SignUp</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            {...register("name")}
          />
          <p className="errorcolor">{errors.name?.message}</p>
        </div>
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
        {/* <input type="file" name="photo" {...register('photo')} />
                <p className="errorcolor">{errors.photo?.message}</p> */}

        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
}

export default SignUpComponent;
