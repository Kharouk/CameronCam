import React from "react";
import FileUploader from "react-firebase-file-uploader";

const ImageUpload = props => {
  return (
    <div>
      <FileUploader
        accept="image/*"
        randomizeFilename
        maxWidth={200}
        maxHeight={200}
        storageRef={props.imageStorage}
        onUploadSuccess={props.handleUpload}
      />
    </div>
  );
};

export default ImageUpload;
