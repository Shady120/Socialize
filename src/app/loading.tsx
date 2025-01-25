import React from 'react'
export default function Loading() {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>

   <div className="hourglassBackground">
  <div className="hourglassContainer">
    <div className="hourglassCurves" />
    <div className="hourglassCapTop" />
    <div className="hourglassGlassTop" />
    <div className="hourglassSand" />
    <div className="hourglassSandStream" />
    <div className="hourglassCapBottom" />
    <div className="hourglassGlass" />
  </div>
</div>

    </div>
  );
}
