import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { API } from './../global';
import { useState } from "react";
import * as Yup from "yup";


export function Login() {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const entry = () => navigate("/createurl");
  
    const loginUser = (userDetail) => {
      fetch(`${API}/login`, {
        method: "POST",
        body: JSON.stringify(userDetail),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((data1) => {
          if (data1.message === "successful login") {
            entry();
          } else {
            setErrorMsg(data1.message);
          }
        });
    };
    const initialValues = {
      Email: "",
      Password: "",
    };
    const userValidationSchema = Yup.object({
      Email: Yup.string().email().required("Required"),
      Password: Yup.string().required("Required"),
    });
  
    const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
      useFormik({
        initialValues: initialValues,
        validationSchema: userValidationSchema,
        onSubmit: (userDetail) => {
          console.log("onSubmit", userDetail);
          setErrorMsg("");
          loginUser(userDetail);
        },
      });
  
    return (
      <div className="add-user-container" style={{marginTop:"100px"}}>
        <form onSubmit={handleSubmit} className="add-user-form">
          <Typography
            variant="h4"
            pb={2}
            sx={{
              textAlign: "center",
            }}
          >
            Login Details
          </Typography>
  
          <TextField
            className="add-user-name"
            label="User Name - Email"
            type="Email"
            value={values.Email}
            name="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            sx={{marginBottom:"20px"}}
            error={touched.Email && errors.Email ? true : false}
            helperText={touched.Email && errors.Email ? errors.Email : ""}
          /> <br />
          <TextField
            className="add-user-name"
            label="Password"
            type="password"
            value={values.Password}
            name="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            sx={{marginBottom:"20px"}}
            error={touched.Password && errors.Password ? true : false}
            helperText={
              touched.Password && errors.Password ? errors.Password : ""
            }
          />
          <br />
          <Button
            className="add-user-btn"
            color="primary"
            type="submit"
            variant="contained"
            sx={{marginBottom:"20px"}}
          >
            Login
          </Button>
          <div className="text-center" style={{ color: "red" }}>
            {errorMsg}
          </div>
          <div className="text-center" style={{ color: "blue" }}>
            <Link to="/Register">Create Account!</Link>
            <br />
            <br />
            <Link to="/ForgetPassword">Forget Password?</Link>
          </div>
        </form>
      </div>
    );
  }
  