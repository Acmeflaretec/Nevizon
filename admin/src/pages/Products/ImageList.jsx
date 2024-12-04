// import Box from 'components/Box'
// import PropTypes from "prop-types";
// import React from 'react'
// import { Grid, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import toast from 'react-hot-toast';

// const ImageList = ({ data = [], dispatch }) => {
//    const fileInputRef = React.useRef(null);

//    const handleImageChange = (e) => {
//       const image = [...data, ...e.target.files];
//       if (image?.length > 8) {
//          toast.error("Maximum 8 images are allowed");
//          image.length = 8;
//       }
//       dispatch(prev => ({ ...prev, image }));
//    };

//    const handleFileSelect = () => {
//       fileInputRef.current.click();
//    };

//    const handleRemoveImage = (index) => {
//       console.log('index',index);
//       if (data?.length === 1) {
//          toast.error('Atleast 1 image is required')
//          return
//       }
//       const updatedImages = data.filter((_, i) => i !== index);
//       dispatch(prev => ({ ...prev, image: updatedImages }));
//    };

//    return (
//       <Grid container spacing={2}>
//          {data?.map((image, index) => {
//             return (
//                <Grid key={index} item xs={6} lg={4} >
//                   <Box
//                      sx={{
//                         position: 'relative',
//                         cursor: "pointer",
//                         "&:hover": {
//                            backgroundColor: "#fff",
//                            opacity: [0.9, 0.8, 0.7],
//                         },
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         flexDirection: "column",
//                         borderRadius: '15px'
//                      }}
//                      onClick={handleFileSelect}
//                   >
//                      {image ? (
//                         <React.Fragment>
//                            <img
//                               style={{ width: 120, height: 100, borderRadius: '20px', border: 'solid 1px #D3D3D3' }}
//                               src={typeof (image) == 'object' ? URL.createObjectURL(image) : `${process.env.REACT_APP_API_URL}/uploads/${image}`}
//                            />
//                            <IconButton
//                               size='small'
//                               sx={{
//                                  position: 'absolute',
//                                  top: 0,
//                                  right: 0,
//                                  backgroundColor: 'rgba(255, 255, 255, 1)',
//                                  '&:hover': {
//                                     backgroundColor: '#949494',
//                                  },
//                               }}
//                               onClick={(e) => {
//                                  e.stopPropagation()
//                                  handleRemoveImage(index);
//                               }}
//                            >
//                               <CloseIcon />
//                            </IconButton>
//                         </React.Fragment>
//                      ) : (
//                         <React.Fragment>
//                            <svg
//                               width="56"
//                               height="56"
//                               viewBox="0 0 56 56"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                            >
//                               <path
//                                  d="M20.9994 51.3346H34.9994C46.666 51.3346 51.3327 46.668 51.3327 35.0013V21.0013C51.3327 9.33464 46.666 4.66797 34.9994 4.66797H20.9994C9.33268 4.66797 4.66602 9.33464 4.66602 21.0013V35.0013C4.66602 46.668 9.33268 51.3346 20.9994 51.3346Z"
//                                  stroke="#CDCDCD"
//                                  strokeWidth="3"
//                                  strokeLinecap="round"
//                                  strokeLinejoin="round"
//                               />
//                               <path
//                                  d="M21.0007 23.3333C23.578 23.3333 25.6673 21.244 25.6673 18.6667C25.6673 16.0893 23.578 14 21.0007 14C18.4233 14 16.334 16.0893 16.334 18.6667C16.334 21.244 18.4233 23.3333 21.0007 23.3333Z"
//                                  stroke="#CDCDCD"
//                                  strokeWidth="3"
//                                  strokeLinecap="round"
//                                  strokeLinejoin="round"
//                               />
//                               <path
//                                  d="M6.23047 44.2186L17.7338 36.4953C19.5771 35.2586 22.2371 35.3986 23.8938 36.8219L24.6638 37.4986C26.4838 39.0619 29.4238 39.0619 31.2438 37.4986L40.9505 29.1686C42.7705 27.6053 45.7105 27.6053 47.5305 29.1686L51.3338 32.4353"
//                                  stroke="#CDCDCD"
//                                  strokeWidth="3"
//                                  strokeLinecap="round"
//                                  strokeLinejoin="round"
//                               />
//                            </svg>
//                         </React.Fragment>
//                      )}
//                   </Box>
//                </Grid>
//             );
//          })}
//          <Grid item xs={12}>
//             <input
//                type="file"
//                accept="image/*"
//                style={{ display: "none" }}
//                multiple
//                ref={fileInputRef}
//                onChange={handleImageChange}
//             />
//          </Grid>
//       </Grid>
//    )
// }

// ImageList.propTypes = {
//    data: PropTypes.array.isRequired,
//    dispatch: PropTypes.func.isRequired,
// };

// export default ImageList


import Box from 'components/Box'
import PropTypes from "prop-types";
import React from 'react'
import { Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

const ImageList = ({ data = [], dispatch }) => {
   const fileInputRef = React.useRef(null);

   const handleImageChange = (e) => {
      const image = [...data, ...e.target.files];
      if (image?.length > 8) {
         toast.error("Maximum 8 images are allowed");
         image.length = 8;
      }
      dispatch(prev => ({ ...prev, image }));
   };

   const handleFileSelect = () => {
      fileInputRef.current.click();
   };

   const handleSwapImage = (index_1, index_2) => {
      const image = data
      const x = image[index_1]
      image[index_1] = image[index_2]
      image[index_2] = x
      dispatch(prev => ({ ...prev, image }));
   };

   const handleRemoveImage = (index) => {
      if (data?.length === 1) {
         toast.error('Atleast 1 image is required')
         return
      }
      const image = data.filter((_, i) => i !== index);
      dispatch(prev => ({ ...prev, image: [...image] }));
   };

   const renderThumbnail = (image) => {
      if (image instanceof File) {
         const extension = image.name.split('.').pop().toLowerCase();
         if (extension === 'mp4' || extension === 'avi' || extension === 'mov') {
            return (
               <video
                  style={{ width: 120, height: 100, borderRadius: '20px', border: 'solid 1px #D3D3D3' }}
                  width="120" height="100" controls loop muted autoPlay>
                  <source src={URL.createObjectURL(image)} type={`video/${extension}`} />
                  Your browser does not support the video tag.
               </video>
            );
         } else {
            return (
               <img
                  style={{ width: 120, height: 100, borderRadius: '20px', border: 'solid 1px #D3D3D3' }}
                  src={URL.createObjectURL(image)}
                  alt="Product Image"
               />
            );
         }
      } else if (typeof image === 'string') {
         const extension = image.split('.').pop().toLowerCase();
         if (extension === 'mp4' || extension === 'avi' || extension === 'mov') {
            return (
               <video
                  style={{ width: 120, height: 100, borderRadius: '20px', border: 'solid 1px #D3D3D3' }}
                  width="180" height="140" controls loop muted autoPlay>
                  <source src={`${process.env.REACT_APP_API_URL}/uploads/${image}`} type={`video/${extension}`} />
                  Your browser does not support the video tag.
               </video>
            );
         } else {
            return (
               <img
                  style={{ width: 120, height: 100, borderRadius: '20px', border: 'solid 1px #D3D3D3' }}
                  src={`${process.env.REACT_APP_API_URL}/uploads/${image}`}
                  alt="Product Image"
               />
            );
         }
      } else {
         return null;
      }
   };
   return (
      <Grid container spacing={2}>
         {data?.map((image, index) => {
            return (
               <Grid key={index} item xs={6} lg={4} >
                  <Box
                     sx={{
                        position: 'relative',
                        cursor: "pointer",
                        "&:hover": {
                           backgroundColor: "#fff",
                           opacity: [0.9, 0.8, 0.7],
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        borderRadius: '15px'
                     }}
                     onClick={handleFileSelect}
                  >
                     {image ? (
                        <React.Fragment>
                           {renderThumbnail(image)}
                           <IconButton
                              size='small'
                              sx={{
                                 position: 'absolute',
                                 top: -10,
                                 right: 0,
                                 backgroundColor: 'rgba(255, 255, 255, 1)',
                                 '&:hover': {
                                    backgroundColor: '#949494',
                                 },
                              }}
                              onClick={(e) => {
                                 e.stopPropagation()
                                 handleRemoveImage(index);
                              }}
                           >
                              <CloseIcon />
                           </IconButton>
                           <IconButton
                              size='small'
                              sx={{
                                 position: 'absolute',
                                 top: "40%",
                                 left: 0,
                                 backgroundColor: 'rgba(255, 255, 255, 1)',
                                 '&:hover': {
                                    backgroundColor: '#949494',
                                 },
                              }}
                              disabled={index === 0}
                              onClick={(e) => {
                                 e.stopPropagation()
                                 handleSwapImage(index, index - 1);
                              }}
                           >
                              <ArrowBackIosNew />
                           </IconButton>
                           <IconButton
                              size='small'
                              sx={{
                                 position: 'absolute',
                                 top: "40%",
                                 right: 0,
                                 backgroundColor: 'rgba(255, 255, 255, 1)',
                                 '&:hover': {
                                    backgroundColor: '#949494',
                                 },
                              }}
                              disabled={index === data?.length - 1}
                              onClick={(e) => {
                                 e.stopPropagation()
                                 handleSwapImage(index, index + 1);
                              }}
                           >
                              <ArrowForwardIos />
                           </IconButton>
                        </React.Fragment>
                     ) : (
                        <React.Fragment>
                           <svg
                              style={{ width: 120, height: 100, borderRadius: '20px', border: 'solid 1px #D3D3D3' }}
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
                        </React.Fragment>
                     )}
                  </Box>
               </Grid>
            );
         })}
         {!data?.length &&
            <Grid item xs={6} lg={4} >
               <Box
                  sx={{
                     position: 'relative',
                     cursor: "pointer",
                     "&:hover": {
                        backgroundColor: "#fff",
                        opacity: [0.9, 0.8, 0.7],
                     },
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     flexDirection: "column",
                     borderRadius: '15px'
                  }}
                  onClick={handleFileSelect}
               >
                  <React.Fragment>
                     <svg
                        style={{ width: 120, height: 100, borderRadius: '20px', border: 'solid 1px #D3D3D3' }}
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
                  </React.Fragment>
               </Box>
            </Grid>}
         <Grid item xs={12}>
            <input
               type="file"
               accept="image/*,video/*"
               style={{ display: "none" }}
               multiple
               ref={fileInputRef}
               onChange={handleImageChange}
            />
         </Grid>
      </Grid>
   )
}

ImageList.propTypes = {
   data: PropTypes.array.isRequired,
   dispatch: PropTypes.func.isRequired,
};

export default ImageList
