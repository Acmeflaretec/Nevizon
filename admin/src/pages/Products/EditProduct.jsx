

// import { Button, Grid, ToggleButton, TextField, IconButton } from '@mui/material'
// import Input from 'components/Input'
// import PageLayout from 'layouts/PageLayout'
// import React, { useEffect, useState } from 'react'
// import Typography from 'components/Typography'
// import toast from 'react-hot-toast'
// import { useGetProductById } from 'queries/ProductQuery'
// import { useNavigate, useParams } from 'react-router-dom'
// import ImageList from './ImageList'
// import { useUpdateProduct, useDeleteProduct } from 'queries/ProductQuery'
// import Box from 'components/Box'
// import CancelIcon from '@mui/icons-material/Cancel'

// const EditProduct = () => {
//    const { id } = useParams()
//    const navigate = useNavigate()
//    const [details, setDetails] = useState({})
//    const { data, isLoading } = useGetProductById({ id })

//    const [benefits, setBenefits] = useState([])
//    const [benefitInput, setBenefitInput] = useState('')


//    useEffect(() => {
//       setDetails(data?.data)
//       // setBenefits(data?.data?.benefits)
//      setBenefits(data?.data?.benefits || []);

//    }, [])
//    const { mutateAsync: updateProduct, isLoading: loading } = useUpdateProduct()
//    const { mutateAsync: deleteProduct, isLoading: deleting } = useDeleteProduct()


   
//    // Benefits  ///////
 

//    const handleBenefitChange = (e) => {
//       setBenefitInput(e.target.value)
//    }

//    const handleAddBenefit = () => {
//       if (benefitInput.trim()) {
//          setBenefits(prev => [...prev, benefitInput.trim()])
//          console.log(benefits)
//          console.log(benefitInput)
//          setBenefitInput('')
//       }
//    }

//    const handleRemoveBenefit = (index) => {
//       setBenefits(prev => prev.filter((_, i) => i !== index))
//    }
// console.log('benefits for server pass',benefits)


// // ///////

//    const handleChange = (e) => {
//       setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
//    }

//    useEffect(() => {
//       console.log(details)
//    }, [details])

//    const handleSubmit =async () => {
//       try {
//          const formData = new FormData()
//          const image = details?.image?.filter((image) => typeof image === 'string')
//          formData.append('image', JSON.stringify(image))
//          details?.image?.forEach((image) => {
//             if (typeof image === 'object') {
//                formData.append('images', image, image.name)
//             }
//          })



//          console.log(benefits)
//          // benefits?.forEach((ben, index) => {
//          //    console.log(`benefits[${index}]`, ben)
//          //    formData.append(`benefits[${index}]`,ben);
//          //  });
//          benefits.forEach((benefit, index) => {
//             formData.append(`benefits[${index}]`, benefit);
//           });
// // benefits.forEach((ben, index) => {
// //             formData.append('benefits', JSON.stringify(ben));
// //           });

//          console.log('benefits near formdata',benefits)





//          for (const key in details) {
//             if (details.hasOwnProperty(key) && key !== 'image') {
//                formData.append(key, details[key])
//             }
//          }
       

         
//          // benefits.forEach((ben, index) => {
//          //    formData.append('benefits', JSON.stringify(ben));
//          //  });
          
//          updateProduct(formData)
//             .then((res) => {
//                if (res) {
//                   toast.success(res?.message ?? 'Product updated successfully')
//                   navigate('/products')
//                }
//             })
//             .catch((err) => {
//                toast.error(err?.message ?? 'Something went wrong')
//             })
//       } catch (error) {
//          console.error(error)
//       }
//    }


  
   

//    const handleDelete = () => {
//       deleteProduct(details)
//          .then((res) => {
//             if (res) {
//                toast.success(res?.message ?? 'Product deleted successfully')
//                navigate('/products')
//             }
//          })
//          .catch((err) => {
//             toast.error(err?.message ?? 'Something went wrong')
//          })
//    }

//    return (
//       <PageLayout
//          title={'Edit Product'}
//       >
//          {isLoading ? <Typography fontSize={14} sx={{ paddingX: 5 }}>loading...</Typography> :
//             <Grid container spacing={5} display={'flex'} direction={'row'} p={8} >
//                <Grid item container spacing={2} xs={12} sm={12} md={6} py={5}>
//                   <Grid item xs={12} sm={12} md={6}>
//                      <Input
//                         required
//                         placeholder="Item name"
//                         id="name"
//                         name="name"
//                         value={details?.name || ''}
//                         onChange={handleChange}
//                      />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                      <Input
//                         placeholder="Brand name"
//                         name="brand"
//                         value={details?.brand || ''}
//                         onChange={handleChange}
//                      />
//                   </Grid>
//                   <Grid item xs={12}>
//                      <Input
//                         required
//                         placeholder="Item subheading"
//                         id="subheading"
//                         name="subheading"
//                         value={details?.subheading || ''}
//                         onChange={handleChange}
//                      />
//                   </Grid>

//                   <Grid item xs={12} sm={8}>
//                      <Input
//                         required
//                         disabled
//                         placeholder="Category"
//                         id="Category"
//                         name="Category"
//                         value={details?.category?.name || ''}
//                      />
//                   </Grid>

//                   <Grid item xs={12} sm={4}>
//                      <Input
//                         placeholder="Enter Quantity"
//                         name="stock"
//                         value={details?.stock || ''}
//                         onChange={handleChange}
//                      />
//                   </Grid>
//                   <Grid item xs={12} sm={4}>
//                      <Input
//                         placeholder="MRP (Maximum Retail Price)"
//                         name="price"
//                         value={details?.price || ''}
//                         onChange={handleChange}
//                      />
//                   </Grid>
//                   <Grid item xs={12} sm={4}>
//                      <Input
//                         placeholder="Discount (%)"
//                         name="discount"
//                         value={details?.discount || ''}
//                         onChange={handleChange}
//                      />
//                   </Grid>
//                   <Grid item xs={12} sm={4}>
//                      <Input
//                         placeholder="Enter Sale Rate"
//                         name="sale_rate"
//                         value={details?.sale_rate || ''}
//                         onChange={handleChange}
//                      />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                      <Typography variant="caption">
//                         Product status &nbsp;
//                      </Typography>
//                      <ToggleButton
//                         value={details?.isAvailable}
//                         selected={details?.isAvailable}
//                         onChange={() => {
//                            setDetails(prev => ({ ...prev, isAvailable: !details?.isAvailable }))
//                         }}
//                      >
//                         {details?.isAvailable ? 'Active' : 'Blocked'}
//                      </ToggleButton>
//                   </Grid>
//                   <Grid item xs={12}>
//                      <Input
//                         id="description"
//                         placeholder="Product Description"
//                         name="description"
//                         value={details?.description || ''}
//                         onChange={handleChange}
//                         multiline
//                         rows={5}
//                      />
//                   </Grid>

//                   {/* Benefits Input */}
//                   <Grid item xs={12}>
//                      <TextField
//                         placeholder="Add Benefit"
//                         value={benefitInput}
//                         onChange={handleBenefitChange}
//                         sx={{ mr: 2 }}
//                      />
//                      <Button onClick={handleAddBenefit} variant='contained'>Add</Button>
//                      <Box mt={2}>
//                         {benefits?.map((benefit, index) => (
//                            <Box key={index} display="flex" alignItems="center">
//                               <Typography variant="body2">
//                                  {benefit}
//                               </Typography>
//                               <IconButton size="small" onClick={() => handleRemoveBenefit(index)}>
//                                  <CancelIcon fontSize="small" />
//                               </IconButton>
//                            </Box>
//                         ))}
//                      </Box>
//                   </Grid>

//                   <Grid item xs={12} sm={12} mt={'auto'}>
//                      <Grid item xs={12}>
//                         <Button onClick={handleSubmit}>UPDATE PRODUCT</Button>
//                         <Button color="secondary" onClick={handleDelete}>DELETE PRODUCT</Button>
//                      </Grid>
//                   </Grid>
//                </Grid>
//                <Grid item container spacing={2} xs={12} sm={12} md={6}>
//                   <Grid sx={{ width: '100%' }}>
//                      <ImageList data={details?.image} dispatch={setDetails} />
//                   </Grid>
//                </Grid>
//             </Grid>}
//       </PageLayout>
//    )
// }

// export default EditProduct
import { Button, Grid, ToggleButton, TextField, IconButton } from '@mui/material';
import Input from 'components/Input';
import PageLayout from 'layouts/PageLayout';
import React, { useEffect, useState } from 'react';
import Typography from 'components/Typography';
import toast from 'react-hot-toast';
import { useGetProductById } from 'queries/ProductQuery';
import { useNavigate, useParams } from 'react-router-dom';
import ImageList from './ImageList';
import { useUpdateProduct, useDeleteProduct } from 'queries/ProductQuery';
import Box from 'components/Box';
import CancelIcon from '@mui/icons-material/Cancel';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const { data, isLoading } = useGetProductById({ id });

  const [benefitInput, setBenefitInput] = useState('');

  useEffect(() => {
    if (data?.data) {
      setDetails(data.data);
    }
  }, [data]);

  const { mutateAsync: updateProduct, isLoading: loading } = useUpdateProduct();
  const { mutateAsync: deleteProduct, isLoading: deleting } = useDeleteProduct();

  // Benefits handling
  const handleBenefitChange = (e) => {
    setBenefitInput(e.target.value);
  };

  const handleAddBenefit = () => {
    if (benefitInput.trim()) {
      setDetails((prev) => ({
        ...prev,
        benefits: [...(prev.benefits || []), benefitInput.trim()],
      }));
      setBenefitInput('');
    }
  };

  const handleRemoveBenefit = (index) => {
    setDetails((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(details);
  }, [details]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const image = details?.image?.filter((image) => typeof image === 'string');
      formData.append('image', JSON.stringify(image));
      details?.image?.forEach((image) => {
        if (typeof image === 'object') {
          formData.append('images', image, image.name);
        }
      });

      details.benefits?.forEach((benefit, index) => {
        formData.append(`benefits[${index}]`, benefit);
      });

      for (const key in details) {
        if (details.hasOwnProperty(key) && key !== 'image' && key !== 'benefits') {
          formData.append(key, details[key]);
        }
      }

      const response = await updateProduct(formData);
      if (response) {
        toast.success(response?.message ?? 'Product updated successfully');
        navigate('/products');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message ?? 'Something went wrong');
    }
  };

  const handleDelete = () => {
    deleteProduct(details)
      .then((res) => {
        if (res) {
          toast.success(res?.message ?? 'Product deleted successfully');
          navigate('/products');
        }
      })
      .catch((err) => {
        toast.error(err?.message ?? 'Something went wrong');
      });
  };

  return (
    <PageLayout title={'Edit Product'}>
      {isLoading ? (
        <Typography fontSize={14} sx={{ paddingX: 5 }}>loading...</Typography>
      ) : (
        <Grid container spacing={5} display={'flex'} direction={'row'} p={8}>
          <Grid item container spacing={2} xs={12} sm={12} md={6} py={5}>
            <Grid item xs={12} sm={12} md={6}>
              <Input
                required
                placeholder="Item name"
                id="name"
                name="name"
                value={details?.name || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                placeholder="Brand name"
                name="brand"
                value={details?.brand || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                required
                placeholder="Item subheading"
                id="subheading"
                name="subheading"
                value={details?.subheading || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Input
                required
                disabled
                placeholder="Category"
                id="Category"
                name="Category"
                value={details?.category?.name || ''}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Input
                placeholder="Enter Quantity"
                name="stock"
                value={details?.stock || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input
                placeholder="MRP (Maximum Retail Price)"
                name="price"
                value={details?.price || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input
                placeholder="Discount (%)"
                name="discount"
                value={details?.discount || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input
                placeholder="Enter Sale Rate"
                name="sale_rate"
                value={details?.sale_rate || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption">
                Product status &nbsp;
              </Typography>
              <ToggleButton
                value={details?.isAvailable}
                selected={details?.isAvailable}
                onChange={() => {
                  setDetails((prev) => ({ ...prev, isAvailable: !details?.isAvailable }));
                }}
              >
                {details?.isAvailable ? 'Active' : 'Blocked'}
              </ToggleButton>
            </Grid>
            <Grid item xs={12}>
              <Input
                id="description"
                placeholder="Product Description"
                name="description"
                value={details?.description || ''}
                onChange={handleChange}
                multiline
                rows={5}
              />
            </Grid>

            {/* Benefits Input */}
            <Grid item xs={12}>
              <TextField
                placeholder="Add Benefit"
                value={benefitInput}
                onChange={handleBenefitChange}
                sx={{ mr: 2 }}
              />
              <Button onClick={handleAddBenefit} variant='contained'>Add</Button>
              <Box mt={2}>
                {details?.benefits?.map((benefit, index) => (
                  <Box key={index} display="flex" alignItems="center">
                    <Typography variant="body2">{benefit}</Typography>
                    <IconButton size="small" onClick={() => handleRemoveBenefit(index)}>
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} mt={'auto'}>
              <Grid item xs={12}>
                <Button onClick={handleSubmit}>UPDATE PRODUCT</Button>
                {/* <Button color="secondary" onClick={handleDelete}>DELETE PRODUCT</Button> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={2} xs={12} sm={12} md={6}>
            <Grid sx={{ width: '100%' }}>
              <ImageList data={details?.image} dispatch={setDetails} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </PageLayout>
  );
};

export default EditProduct;
