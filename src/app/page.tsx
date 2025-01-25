"use client"
import Grid from '@mui/material/Grid2';
import React from 'react'
import Post from '@/app/Posts/page';
import CreatPost from '@/app/_CreatPost/CreatPost';

export default function page() {
 

  return (

    <Grid container spacing={2}>
        <Grid size={{xs:0 , md:3}}>
        </Grid>
        <Grid size={{xs:12 , md: 6} }  > 
              <CreatPost/>
              <Post/>
        </Grid>
        <Grid size={{xs:0 , md:3}}>
        </Grid>
    </Grid>
  )
}
