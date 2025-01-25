"use client"
import * as Yup from "yup"
import React from 'react'
import style from "@/app/(auth)/Login/Login.module.css"
import { Box, Button, CircularProgress, Paper } from '@mui/material'
import Link from 'next/link'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogin } from '@/app/lib/Slice'
import { dispatch, stateStore } from '@/app/lib/store'
import { useRouter } from 'next/navigation'

export default function Login() {
    const  router = useRouter()
    const {isLoading} = useSelector((state:stateStore)=>state.auth)   
     
    const dispatch = useDispatch<dispatch>()

   const validationSchema = Yup.object().shape(
    {
      email:Yup.string().email("Email is invalid").required("Email is required"),
      password:Yup.string().matches(/^(?=.*[!@#$%^&*])[A-Z][A-Za-z0-9@#$%^&*!]{1,15}$/,"password must be include letters and numbers").required("password is required"),    
    }
  )

    const formikLogin = useFormik({
      validationSchema,
      initialValues: {
        email: '',
        password: '',
      },
     onSubmit: (values:{email:string,password:string}) => {
      dispatch(handleLogin(values))
      .then((res)=>{
        if(res.meta.requestStatus === "fulfilled"){
          router.push("/")
        }
      })
        }})


  return (
    <Paper elevation={20}>
    <Box sx={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div className={style["form-container"]}>
      <p className={style.title}>Login</p>
      <form className={style.form} onSubmit={formikLogin.handleSubmit}>
        {/* Email */}
        <div className={style["input-group"]}>
          <label htmlFor="email">email:</label>
                    <input placeholder="" id="email" type="email"  name="email" 
                    onBlur={formikLogin.handleBlur}
                    value={formikLogin.values.email}
                    onChange={formikLogin.handleChange}/>
                    {formikLogin.errors.email && formikLogin.touched.email && (
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
                          {formikLogin.errors.email}
                        </Box>
                      )}
        </div>

        {/* Password */}
        <div className={style["input-group"]}>
          <label htmlFor="passweord">passweord</label>
                    <input placeholder="" id="passweord" type="passweord"  
                    name="password"
                    onBlur={formikLogin.handleBlur} 
                    value={formikLogin.values.password}
                    onChange={formikLogin.handleChange}/>
                    {formikLogin.errors.password && formikLogin.touched.password && (
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
                          {formikLogin.errors.password}
                        </Box>
                      )}
          <div className={style.forgot}>
            <Link rel="noopener noreferrer" href="/ForgetPass">Forgot Password ?</Link>
          </div>
        </div>
        {/* onclick to home */}
        <Button variant="contained" sx={{width:"100%"}}  type="submit" disabled={!formikLogin.isValid || !formikLogin.dirty} >
          {isLoading?
           <CircularProgress color="inherit" size={30}/> :"Sign in"}
          </Button>
      </form>

      <p className={style.signup}>Don't have an account?
        <Link href="/Signup" className={style.link} rel="noopener noreferrer">Register</Link>
      </p>
    </div>
    </Box>
    </Paper>
  )
}
