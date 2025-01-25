"use client"
import React, { useState } from 'react'
import style from "@/app/(auth)/ForgetPass/ForgerPass.module.css"
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { clearData } from '@/app/lib/Slice'
import nookies from "nookies";

export default function ForgetPass() {
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter()
      const dispatch = useDispatch();


  function handleChangePass(values:{}){
    setisLoading(true)
    axios
      .patch(
        `https://linked-posts.routemisr.com/users/change-password`,
        values,
        {
          headers: {
            token: nookies.get(null, "token").token,
          },
        }
      )
      .then(() => {
        toast.success("Done");
        setisLoading(false);
        dispatch(clearData());
        router.push("/Login");
      })
      .catch((error) => {
        setisLoading(false);
        toast.error(`${error.response.data.error}`);
      });
  }

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9@#$%^&*!]{2,16}$/,
        "Password must include at least one uppercase letter, one number, and one special character, and be 2-16 characters long."
      )
      .required("password is required"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9@#$%^&*!]{2,16}$/,
        "Password must include at least one uppercase letter, one number, and one special character, and be 2-16 characters long."
      )
      .required("password is required"),
  });
  

  const formikChangePass = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    onSubmit: handleChangePass,
    validationSchema,
  });



  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper className={style["form-container"]}>
        <Typography variant="h5">Forget Password:</Typography>
        <form className={style.form} onSubmit={formikChangePass.handleSubmit}>
          {/* password */}
          <div className={style["input-group"]}>
            <label htmlFor="password">password:</label>
            <input
              placeholder=""
              id="password"
              type="password"
              name="password"
              onBlur={formikChangePass.handleBlur}
              value={formikChangePass.values.password}
              onChange={formikChangePass.handleChange}
            />
            {formikChangePass.errors.password &&
              formikChangePass.touched.password && (
                <Box
                  sx={{
                    padding: "20px",
                    marginBlock: "10px",
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "rgb(6, 22, 58)",
                    borderRadius: "8px",
                    boxShadow: "2",
                  }}
                >
                  {formikChangePass.errors.password}
                </Box>
              )}
          </div>

          {/* newPassword */}
          <div className={style["input-group"]}>
            <label htmlFor="newPassword">newPassword</label>
            <input
              placeholder=""
              id="newPassword"
              type="passweord"
              name="newPassword"
              onBlur={formikChangePass.handleBlur}
              value={formikChangePass.values.newPassword}
              onChange={formikChangePass.handleChange}
            />
            {formikChangePass.errors.newPassword &&
              formikChangePass.touched.newPassword && (
                <Box
                  sx={{
                    padding: "20px",
                    marginBlock: "10px",
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "rgb(6, 22, 58)",
                    borderRadius: "8px",
                    boxShadow: "2",
                  }}
                >
                  {formikChangePass.errors.newPassword}
                </Box>
              )}
            
          </div>
          {/* onclick to home */}
          <Button
            variant="contained"
            sx={{ width: "100%", marginTop:"20px"}}
            type="submit"
            disabled={!formikChangePass.isValid || !formikChangePass.dirty}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={30} />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
