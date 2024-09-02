import { Button, Grid, Input, Stack, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import React from 'react'

const Details = ({ data }) => {
    const handleChange =()=>{
        console.log(data);
    }
    return (
        <Grid item container spacing={2} xs={12} sm={12} md={5} lg={4}>
            <Grid item xs={12}>
                <Typography variant='body2' pb={2} fontWeight={600}>Shipping Address</Typography>
                <Typography fontSize={14}>{data?.address?.firstname?.toUpperCase()} {data?.address?.lastname?.toUpperCase()}</Typography>
                <Typography fontSize={14}>{data?.address?.address_line_1}</Typography>
                <Typography fontSize={14}>{data?.address?.address_line_2}</Typography>
                <Typography fontSize={14}>{data?.address?.city}, {data?.address?.state}</Typography>
                <Typography fontSize={14}>{data?.address?.country} {data?.address?.zip}</Typography>
                <Typography fontSize={14}>Phone : {data?.address?.mobile}</Typography>
                <Typography fontSize={14}>Email : {data?.email}</Typography>
            </Grid>

            <Grid item xs={12}>
            <Typography variant='body2' pb={2} fontWeight={600}>Ordered Date</Typography>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontSize={14}>Date</Typography>
                <Typography fontSize={14}>{new Date(data?.createdAt).toDateString()}</Typography>
            </Stack>
 </Grid>
            
            <Grid item xs={12}>
            <Typography variant='body2' pb={2} fontWeight={600}>Payment details</Typography>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontSize={14}>Payment mode</Typography>
                <Typography fontSize={14}>{data?.payment_mode}</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontSize={14}>Order Subtotal</Typography>
                <Typography fontSize={14}>₹ {data?.amount}/-</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontSize={14}>Shipping charges</Typography>
                <Typography fontSize={14}>Free</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontSize={14}>Tax</Typography>
                <Typography fontSize={14}>N/A</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} pt={1}>
                <Typography fontSize={14} fontWeight={600}>Total</Typography>
                <Typography fontSize={14} fontWeight={600}>₹ {data?.amount}/-</Typography>
            </Stack>
            </Grid>
          
            <Grid item xs={12} sm={4} mt={'auto'}>
                <Grid item xs={12}>
                    {/* <Button onClick={handleSubmit}>Update Product</Button> */}
                    {/* <Button color="secondary" onClick={handleDelete}>Delete Blog</Button> */}
                </Grid>
            </Grid>
    </Grid>
    )
}

Details.propTypes = {
    data: PropTypes.object.isRequired,
};
export default Details