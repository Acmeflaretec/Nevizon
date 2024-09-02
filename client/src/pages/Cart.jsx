import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import { FaShoppingCart, FaPlus, FaMinus, FaTrash, FaReceipt } from 'react-icons/fa';
import LoadingScreen from '../components/loading/LoadingScreen';

function Cart() {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [filteredCartData, setFilteredCartData] = useState([]);
  const [salePriceTotal, setSalePriceTotal] = useState(0);
  const [proPriceTotal, setProPriceTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [notif, setNotif] = useState(true);
  const deliveryCharge = 30;
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [loadScreenState, setLoadScreenState] = useState(true); // Loading state

  const calculateTotalSalePrice = (items) => {
    let totalSalePrice = 0;
    items.forEach((item) => {
      totalSalePrice += item?.productId?.sale_rate * item?.qty;
    });
    return totalSalePrice;
  };

  const calculateTotalProPrice = (items) => {
    let totalProPrice = 0;
    items.forEach((item) => {
      totalProPrice += item?.productId?.price * item?.qty;
    });
    return totalProPrice;
  };

  const calculateTotalDiscountPrice = (items) => {
    let totalDiscountPrice = 0;
    items.forEach((item) => {
      totalDiscountPrice += item?.productId?.discount;
    });
    return totalDiscountPrice;
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/user/getcarts`);
      setCartData(response?.data?.data);
      
      const items = response?.data?.data?.item;
      const filteredItems = items.filter((obj) => obj.productId.isAvailable !== false);
      setFilteredCartData(filteredItems);

      // Calculate the totals
      setSalePriceTotal(calculateTotalSalePrice(filteredItems));
      setProPriceTotal(calculateTotalProPrice(filteredItems));
      setDiscountTotal(calculateTotalDiscountPrice(filteredItems));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadScreenState(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuantityChange = async (item, operation, index) => {
    let newQty = item?.qty;

    if (operation === 'increment' && item?.qty < item?.productId?.stock) {
      newQty += 1;
    } else if (operation === 'decrement' && item.qty > 1) {
      newQty -= 1;
    }

    // Optimistically update the UI
    const updatedCartData = { ...cartData };
    updatedCartData.item[index].qty = newQty;
    setCartData(updatedCartData);

    setLoadingIndex(index); // Set loading state

    try {
      await axiosInstance.patch(`/user/updateQty`, { qty: newQty, productId: item?.productId?._id });
      await fetchData();
    } catch (error) {
      console.log(error);

      // Revert the state change if the API call fails
      const revertedCartData = { ...cartData };
      revertedCartData.item[index].qty = item?.qty;
      setCartData(revertedCartData);
    } finally {
      setLoadingIndex(null); // Clear loading state
    }
  };

  const handleRemoveItem = async (itemId) => {
    let urlQuery = `/user/removeFromCart/${itemId}`;
    try {
      await axiosInstance.patch(urlQuery);
      const updatedCartItems = cartData.item.filter((item) => item?._id !== itemId);
      setCartData({ ...cartData, item: updatedCartItems });

      const filteredItems = updatedCartItems.filter((obj) => obj.productId.isAvailable !== false);
      setSalePriceTotal(calculateTotalSalePrice(filteredItems));
      setProPriceTotal(calculateTotalProPrice(filteredItems));
      setNotif(prev => !prev);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const discount = 300;
  const deliveryCharges = 300;

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MiddleNav notification={notif} />
      {loadScreenState ? (
        <LoadingScreen />
      ) : (
        <div style={{ padding: '2rem', flexGrow: 1 }}>
          <h1 style={{ color: '#e63946', marginBottom: '1.5rem', textAlign: 'center' }}>
            <FaShoppingCart style={{ marginRight: '0.5rem' }} /> Your Cart
          </h1>
          {cartData?.item?.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: '#6c757d', marginBottom: '1rem' }}>Your cart is empty</p>
              <Link to="/allproducts" style={{ backgroundColor: '#e63946', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', textDecoration: 'none' }}>
                <FaPlus style={{ marginRight: '0.5rem' }} /> Browse Products
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1 }}>
                {cartData?.item?.slice().reverse().map((item, index) => (
                  <div key={item?._id} style={{ border: '1px solid #dee2e6', borderRadius: '0.25rem', marginBottom: '1rem', boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.1)' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <div style={{ flex: '0 0 25%', padding: '1rem' }}>
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL_LOCALHOST}/uploads/${item?.productId?.image[0]}`}
                          alt={item?.productId?.name}
                          style={{ width: '100%', borderRadius: '0.25rem' }}
                        />
                      </div>
                      <div style={{ flex: '1', padding: '1rem' }}>
                        <h5 style={{ color: '#e63946' }}>{item?.productId?.name}</h5>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                          <p style={{ fontWeight: 'bold', margin: '0 1rem 0 0' }}>₹{item?.productId?.sale_rate}</p>
                          <span style={{ color: '#6c757d', textDecoration: 'line-through', marginRight: '0.5rem' }}>₹{item?.productId?.price}</span>
                          <span style={{ backgroundColor: '#f1faee', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', color: '#e63946' }}>{item?.productId?.discount}% off</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ display: 'flex', marginRight: '1rem' }}>
                            {item?.productId?.isAvailable ? (
                              <>
                                <button
                                  style={{ border: '1px solid #e63946', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', backgroundColor: '#ffffff', color: '#e63946', cursor: 'pointer', marginRight: '0.25rem' }}
                                  onClick={() => handleQuantityChange(item, 'decrement', index)}
                                  disabled={item.qty === 1 || loadingIndex === index}
                                >
                                  {loadingIndex === index ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <FaMinus />}
                                </button>
                                <button style={{ border: '1px solid #e63946', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', backgroundColor: '#ffffff', color: '#e63946', cursor: 'default' }} disabled>
                                  {item?.qty}
                                </button>
                                <button
                                  style={{ border: '1px solid #e63946', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', backgroundColor: '#ffffff', color: '#e63946', cursor: 'pointer', marginLeft: '0.25rem' }}
                                  onClick={() => handleQuantityChange(item, 'increment', index)}
                                  disabled={item.qty === item?.productId?.stock || loadingIndex === index}
                                >
                                  {loadingIndex === index ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <FaPlus />}
                                </button>
                              </>
                            ) : (
                              <p style={{ color: '#6c757d' }}>Out of Stock</p>
                            )}
                          </div>
                          <button
                            style={{ border: '1px solid #e63946', borderRadius: '0.25rem', backgroundColor: '#e63946', color: '#ffffff', padding: '0.5rem 1rem', cursor: 'pointer' }}
                            onClick={() => handleRemoveItem(item?._id)}
                          >
                            <FaTrash style={{ marginRight: '0.5rem' }} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ width: '300px', padding: '1rem', border: '1px solid #dee2e6', borderRadius: '0.25rem', boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.1)' }}>
                <h5 style={{ color: '#e63946' }}>Cart Summary</h5>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Subtotal:</span>
                    <span>₹{salePriceTotal}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Discount:</span>
                    <span style={{ color: '#e63946' }}>- ₹{discountTotal}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Delivery Charges:</span>
                    {salePriceTotal > 299 ? (
                      <span>
                        <span style={{ textDecoration: 'line-through', marginRight: '0.5rem' }}>₹{deliveryCharge}</span>
                        <span style={{ color: '#e63946' }}>Free Delivery</span>
                      </span>
                    ) : (
                      <span>₹{deliveryCharge}</span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span>₹{salePriceTotal < 299 ? salePriceTotal + deliveryCharge : salePriceTotal}</span>
                </div>
                <button
                  style={{ backgroundColor: '#e63946', color: '#ffffff', padding: '1rem', border: 'none', borderRadius: '0.25rem', width: '100%', marginTop: '1rem', cursor: 'pointer' }}
                  onClick={() => navigate('/checkout')}
                  disabled={salePriceTotal < 80}
                >
                  {salePriceTotal < 80 ? 'Add above ₹80 to continue' : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Cart;
