import { useState } from 'react';
import axios from 'axios';

const useUploadImage = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (photo) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', photo);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbApiKey}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUploading(false);
      return res.data.data.url;
    } catch (err) {
      setError('Image upload failed. Please try again.');
      setUploading(false);
      throw err;
    }
  };

  return { uploadImage, uploading, error };
};

export default useUploadImage;
