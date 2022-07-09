import { Typography, Stack } from "@mui/material";
import React, { useState } from "react";

const UploadAndDisplayImage = ({selectedImage, setSelectedImage}) => {

  return (
    <>
      {selectedImage && (
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
      )}
      <Typography>Upload image!</Typography>
      <Stack direction = "row" spacing = {1}>
        {selectedImage ? <button onClick={()=>setSelectedImage(null)}>Remove</button> : <></>}
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
          }}
        />
      </Stack>
    </>
  );
};

export default UploadAndDisplayImage;