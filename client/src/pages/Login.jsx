import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { DataContext } from "../App";
import { userSchema } from "../schemas/userSchema";

function Login() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [userId, setUserId] = useState("");

  const { setUser, isLoggedIn, setIsLoggedIn } = useContext(DataContext);

  const handleLogin = async (info) => {
    // console.log(info);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
      // credentials: "include",
    });
    console.log("Response", response);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setUserId(data.user._id);
      setUser(data.user.username);
      // setNotLoggedIn(false);
      setIsLoggedIn(true);
      setMsg("Login successful");
      navigate("/");
    } else {
      setMsg("Invalid login");
    }
  };

  useEffect(() => {
    console.log(msg);
  }, [msg]);

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  return isLoggedIn ? (
    <p>
      Already logged in. Return to <Link to="/">Home</Link>.
    </p>
  ) : (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={userSchema}
        initialValues={{ email: "", password: "" }}
        // onSubmit={(values) => {
        //   // Alert the input values of the form that we filled
        //   alert(JSON.stringify(values));
        // }}
        onSubmit={handleLogin}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              <fieldset>
                <legend>LOG IN</legend>
                {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                <form noValidate onSubmit={handleSubmit}>
                  {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                  <label>
                    Email:{" "}
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter email"
                      className="form-control inp_text"
                      id="email"
                    />
                  </label>
                  {/* If validation is not passed show errors */}
                  <p className="error">
                    {errors.email && touched.email && errors.email}
                  </p>
                  {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                  <label>
                    Password:{" "}
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      className="form-control"
                    />
                  </label>
                  {/* If validation is not passed show errors */}
                  <p className="error">
                    {errors.password && touched.password && errors.password}
                  </p>
                  {/* Click on submit button to submit the form */}
                  <button type="submit">Login</button>
                </form>
                <p>{msg}</p>
              </fieldset>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
