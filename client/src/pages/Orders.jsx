import React,{useState,useEffect} from 'react'
import axiosInstance from '../axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import LoadingScreen from '../components/loading/LoadingScreen';
import {
  FaPlus
  } from 'react-icons/fa';

const orderData = [
  {
    id: 1,
    name: 'ECO-FRIENDLY COTTON BUDS',
    // category: 'Seeds',
    price: 999,
    status: 'Order Placed',
    statusDetails: 'Your order has been placed',
    image: 'https://img.freepik.com/premium-photo/heap-bamboo-cotton-swabs-buds-top-view-beige-surface-copy-space_224798-1095.jpg?w=996'
  },
  // Add more order objects as needed
];

function OrderCard({ order }) {
   
  return (
<>

  <Card className="mb-3 shadow-sm">
  <Card.Body>

    <Row>
      <Col md={3} className="mb-3 mb-md-0">
        <img
       src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${order?.products?.item[0]?.product_id?.image[0]}`}
          alt={order?.name} className="img-fluid rounded"
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
      </Col>
      <Col md={6}>
{order?.products?.item?.map((item,index)=>(

<h5 className="mb-1">{index+1}. {item?.product_id?.name}</h5>

))
        }
        <p className="text-muted mb-2">{order?.category}</p>
        <span bg="info" className="mb-2" style={{color:'green',fontWeight:'bold'}} >{order?.status}</span>
        {/* <p className="small mb-0">{order.statusDetails}</p> */}
      </Col>
      <Col md={3} className="text-md-end">
        <h5 className="mb-3">₹{order?.amount
        }</h5>
        <Link to={`/ordertrack/${order?._id}`} className="btn btn-outline-primary btn-sm">
          Track Order
        </Link>
      </Col>
    </Row>
  </Card.Body>
</Card>

</>

   
  );
}

function Orders() {
  const [ordersData,setOrdersData] = useState([])
  const navigate = useNavigate();
  const [loadScreenState, setLoadScreenState] = useState(true); // Loading state


const fetchOrderData  = async()=>{

  try {
    const response = await axiosInstance.get(`/orders/getuserorders`)
    setOrdersData(response?.data?.data)
     
  } catch (error) {
    
  }finally{
    setLoadScreenState(false);
  }
}


useEffect(()=>{
fetchOrderData()
},[])



  return (
    <div className="d-flex flex-column min-vh-100">
      <MiddleNav />
      {
 loadScreenState ? (
  <LoadingScreen/>
)  :
 (
<>
<h2 className="mb-4" style={{textAlign:'center',marginTop:'50px'}} >Your Orders</h2>
{
!ordersData?.length <1 ? (
  <Container className="flex-grow-1 py-5">

  {ordersData?.map((order,index) => (
    <OrderCard key={order?._id} order={order} />
  ))}
</Container>
)  : 
(
  <div className="text-center py-5" style={{marginBottom:'100px'}} >
  <p className="text-muted mb-4">You don't have any order</p>
  <Link to="/allproducts" className="btn btn-success btn-lg">
    <FaPlus className="me-2" />Browse Products
  </Link>
</div>
)


}


</>



)
      }
 
      <Footer />
    </div>
  );
}

export default Orders;