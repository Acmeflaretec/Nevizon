import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from 'react'
import PageLayout from 'layouts/PageLayout';
import { useAddCategory } from "queries/ProductQuery";
import toast from "react-hot-toast";
import Input from "components/Input";
import { useNavigate } from "react-router-dom";


const AddCategory = () => {
  const [data, setData] = useState({})
  const navigate = useNavigate()
  const fileInputRef = React.useRef(null);
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setData(prev => ({ ...prev, image: file }));
  };

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { mutateAsync: addCategory, isLoading } = useAddCategory()

  const handleSubmit = () => {
    try {
      if (!data?.name) {
        return toast.error("name is required")
      }
      if (!data?.desc) {
        return toast.error("description is required")
      }
      if (!data?.image) {
        return toast.error("image is required")
      }
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key) && key !== "image") {
          formData.append(key, data[key]);
        }
      }
      typeof (data.image) == 'object' && formData.append("image", data.image, data?.image?.name);
      addCategory(formData)
        .then((res) => {
          toast.success(res?.message ?? "category added");
          navigate('/category')
        })
        .catch((err) => {
          toast.error(err?.message ?? "Something went wrong");
        });
        

    } catch (error) {
      console.error(error)
    }
  }
  return (
    <PageLayout
      title={'Add Category'}
    >
      <Box sx={{ flexGrow: 1 }} display={'flex'} justifyContent={'center'}>
        <Grid container spacing={2} maxWidth={600} py={5}>
          <Grid item xs={12} sm={6}>
            <Input
              required
              placeholder="Category Name"
              id="name"
              name="name"
              label="Category Name"
              value={data?.name || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="name"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              id="description"
              name="desc"
              placeholder="Category Description"
              label="Category Description *"
              value={data?.desc || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="Description"
              multiline
              rows={4}
              helperText="Short Description (about 10-20 words)"
            />
          </Grid>

          <Grid item xs={12} >
            <Box
              sx={{
                width: 200,
                height: 100,
                cursor: "pointer",
                backgroundColor: "#212121",
                "&:hover": {
                  backgroundColor: "#424242",
                  opacity: [0.9, 0.8, 0.7],
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
              onClick={handleFileSelect}
            >
              {data?.image ? (
                <img
                  style={{ width: 240, height: 135, padding: 22 }}
                  src={typeof (data?.image) == 'object' ? URL.createObjectURL(data.image) : `${process.env.REACT_APP_BASE_URL}/${data.image}`}
                />
              ) : (
                <React.Fragment>
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.9994 51.3346H34.9994C46.666 51.3346 51.3327 46.668 51.3327 35.0013V21.0013C51.3327 9.33464 46.666 4.66797 34.9994 4.66797H20.9994C9.33268 4.66797 4.66602 9.33464 4.66602 21.0013V35.0013C4.66602 46.668 9.33268 51.3346 20.9994 51.3346Z"
                      stroke="#CDCDCD"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.0007 23.3333C23.578 23.3333 25.6673 21.244 25.6673 18.6667C25.6673 16.0893 23.578 14 21.0007 14C18.4233 14 16.334 16.0893 16.334 18.6667C16.334 21.244 18.4233 23.3333 21.0007 23.3333Z"
                      stroke="#CDCDCD"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.23047 44.2186L17.7338 36.4953C19.5771 35.2586 22.2371 35.3986 23.8938 36.8219L24.6638 37.4986C26.4838 39.0619 29.4238 39.0619 31.2438 37.4986L40.9505 29.1686C42.7705 27.6053 45.7105 27.6053 47.5305 29.1686L51.3338 32.4353"
                      stroke="#CDCDCD"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Typography sx={{ mt: 1, fontSize: 13 }}>
                    Upload Thumbnail
                  </Typography>
                </React.Fragment>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit}>Add Category</Button>
          </Grid>
          <Grid item xs={12}>
            <Alert color="primary" severity="info" sx={{ mt: 3, fontSize: 13 }}>
              <ul style={{ margin: "0", padding: "0" }}>
                <li> Make your thumbnail 1280 by 720 pixels (16:9 ratio)</li>
                <li>Ensure that your thumbnail is less than 2MB</li>
                <li>Use a JPG, PNG, or JPEG file format</li>
              </ul>
            </Alert>
          </Grid>
        </Grid>
      </Box>

    </PageLayout>
  )
}

export default AddCategory