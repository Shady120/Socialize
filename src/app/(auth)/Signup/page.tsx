"use client"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React, { useState } from 'react'
import style from "@/app/(auth)/Signup/Sginup.module.css"
import { Box, Button, CircularProgress } from '@mui/material'
import Link from 'next/link'
import { useFormik } from 'formik'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from "yup"

export default function Signup() {
    const [loading,setIsLoading]= useState(false)
   const router = useRouter()
  function register(values: {}){
     setIsLoading(true)
    axios.post("https://linked-posts.routemisr.com/users/signup",values)
    .then(()=>{
      router.push("/Login")
      toast.success("Welcome to Socialilze")
      setIsLoading(false)
    })
    .catch((error)=>{
      toast.error(`${error.response.data.error}`)
       setIsLoading(false)
    })
  }

  const validationSchema = Yup.object().shape(
  {
    name: Yup.string().min(3,"min 3 at least").max(20,"max 10 at least").required("name is required"),
    email:Yup.string().email("Email is invalid").required("Email is required"),
    password:Yup.string().matches(/^(?=.*[!@#$%^&*])[A-Z][A-Za-z0-9@#$%^&*!]{1,15}$/,"password must be include letters and numbers").required("password is required"),    
    rePassword:Yup.string().oneOf([Yup.ref("password")],"rePassword not Match").required("rePassword is required"),
    dateOfBirth: Yup.date().required('Date of Birth is required').nullable(),
    gender: Yup.string().oneOf(['female', 'male'], "Please select a valid gender").required("Gender is required"),
  }
)

  const formikRegister  = useFormik({
    validationSchema,
    initialValues: {
      name : "",
      email:"",
      password:"",
      rePassword:"",
      dateOfBirth:"",
      gender:""
  },
  onSubmit:register
})





  return (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",m:"20px",paddingTop:"80px"}}>
    <div className={style['form-container']}>
      <p className={style.title}>Register</p>
      <form className={style.form} onSubmit={formikRegister.handleSubmit}>
        <div className={style['input-group']}>
          {/* Name */}
          <label htmlFor="name">name :</label>
          <input placeholder="" id="name" type="text" 
           name="name" 
           onBlur={formikRegister.handleBlur}
          value={formikRegister.values.name}
          onChange={formikRegister.handleChange}/>
        {formikRegister.errors.name && formikRegister.touched.name && (
        <Box sx={{padding: "20px",marginBlock: "10px",textAlign: "center",color: "white",backgroundColor: "rgb(6, 22, 58)",
        borderRadius: '8px',boxShadow: "2"}}>
        {formikRegister.errors.name}
              </Box>
        )}
        </div>

        <div className={style['input-group']}>

          {/* Email */}
          <label htmlFor="email">email:</label>
          <input placeholder="" id="email" type="email"  name="email" 
          onBlur={formikRegister.handleBlur}
          value={formikRegister.values.email}
          onChange={formikRegister.handleChange}/>
          {formikRegister.errors.email && formikRegister.touched.email && (
              <Box
               sx={{
        padding: "20px",
        marginBlock: "10px",
        textAlign: "center",
        color: "white",
        backgroundColor: "rgb(6, 22, 58)",
        borderRadius: '8px',
        boxShadow: "2", 
      }}
              >
                {formikRegister.errors.email}
              </Box>
            )}

          {/* Password */}
          <label htmlFor="passweord">passweord</label>
          <input placeholder="" id="passweord" type="passweord"  
          name="password"
          onBlur={formikRegister.handleBlur} 
          value={formikRegister.values.password}
          onChange={formikRegister.handleChange}/>
          {formikRegister.errors.password && formikRegister.touched.password && (
              <Box
               sx={{
        padding: "20px",
        marginBlock: "10px",
        textAlign: "center",
        color: "white",
        backgroundColor: "rgb(6, 22, 58)",
        borderRadius: '8px',
        boxShadow: "2", 
      }}
              >
                {formikRegister.errors.password}
              </Box>
            )}
          {/* Repassword */}
          <label htmlFor="rePassword">rePassword</label>
          <input placeholder="" type="password"  name="rePassword" 
          onBlur={formikRegister.handleBlur}
          value={formikRegister.values.rePassword}
          onChange={formikRegister.handleChange}/>
           {formikRegister.errors.rePassword && formikRegister.touched.rePassword && (
              <Box
               sx={{
        padding: "20px",
        marginBlock: "10px",
        textAlign: "center",
        color: "white",
        backgroundColor: "rgb(6, 22, 58)",
        borderRadius: '8px',
        boxShadow: "2", 
      }}
              >
                {formikRegister.errors.rePassword}
              </Box>
            )}



          {/* data of birth */}
          <label htmlFor="dateOfBirth">dateOfBirth</label>
          <input placeholder="" type="date"  name="dateOfBirth" 
          onBlur={formikRegister.handleBlur}
          value={formikRegister.values.dateOfBirth}
          onChange={formikRegister.handleChange} />
           {formikRegister.errors.dateOfBirth && formikRegister.touched.dateOfBirth && (
              <Box
               sx={{
        padding: "20px",
        marginBlock: "10px",
        textAlign: "center",
        color: "white",
        backgroundColor: "rgb(6, 22, 58)",
        borderRadius: '8px',
        boxShadow: "2", 
      }}
              >
                {formikRegister.errors.dateOfBirth}
              </Box>
            )}
        </div>

          {/* gender */}
            <FormControl>
            <FormLabel 
              id="gender-label" 
              sx={{ mt: "10px", color: "rgba(156, 163, 175, 1)" }}
            >
              Gender
            </FormLabel>
            <RadioGroup
              sx={{ display: "flex", flexDirection: "row" }}
              aria-labelledby="gender-label"
              name="gender"
              value={formikRegister.values.gender}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
            >
              <FormControlLabel 
                value="female" 
                control={<Radio />} 
                label="Female" 
              />
              <FormControlLabel 
                value="male" 
                control={<Radio />} 
                label="Male" 
              />
           
            </RadioGroup>
          </FormControl>

         <Button
      style={{ marginTop: '6%' }}
      sx={{
        width: "100%",  
      }}
      type="submit"
      variant='contained'
      disabled={!formikRegister.isValid || !formikRegister.dirty}
    >
      {loading?
                 <CircularProgress color="inherit" size={30}/> :"Submit"}
      
    </Button>   

      </form>

      <div className={style['social-message']}>
        <div className={style.line} />
        <Link href="/Login" className={style.message}>Do you have account</Link>
        <div className={style.line} />
      </div>
    </div>
    </Box>
  )
}
