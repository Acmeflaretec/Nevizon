import React, { useState,useEffect } from 'react'
import axiosInstance from '../axios'
import { Modal, Button, Form } from 'react-bootstrap';
import LoadingScreen from '../components/loading/LoadingScreen';

function ManageAddress() {

  const [addressDatas,setAddressDatas] = useState([])
  const [loadScreenState, setLoadScreenState] = useState(true); // Loading state

  const [showEdit, setShowEdit] = useState(false);

  const fetchAddress = async(urlQ) =>{

    try {
      
    const response = await axiosInstance.get(urlQ)
    setAddressDatas(response?.data?.data)
    } catch (error) {
      console.log(error)
    }finally {
      setLoadScreenState(false); // Set loading to false after data is fetched
  }
    
      }
    
    
      useEffect(()=>{
    
          fetchAddress('/address')
    
      },[])

      const setPrimary = async(addId)=>{
        console.log(addId)
        try {
          const response = await axiosInstance.patch('/address/setprimary', {addressId:addId});
        // Update the local state to reflect the changes
        setAddressDatas((prevAddresses) =>
          prevAddresses.map((addr) =>
            addr._id === addId ? { ...addr, primary: true } : { ...addr, primary: false }
          )
        );
        
        } catch (error) {
          console.log(error)
        }
        
          }

// for edit
const handleCloseEdit = async() => {
  setShowEdit(false);
}
const [editData, setEditData] = useState({});
const handleShowEdit = async(addr) => {
  setShowEdit(true);
  setEditData(addr)
//console.log(addr)
}




  // 
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', name: 'User', phone: '9548598788', address: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum animi impedit', pincode: '691312' },
    { id: 2, type: 'Work', name: 'User', phone: '9548598788', address: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum animi impedit', pincode: '691312' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setCurrentAddress(null);
  };

  const handleShow = (address = null) => {
    setCurrentAddress(address);
    setShowModal(true);
  };

  const handleSave = (newAddress) => {
    if (currentAddress) {
      setAddresses(addresses.map(addr => addr.id === currentAddress.id ? { ...newAddress, id: currentAddress.id } : addr));
    } else {
      setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    }
    handleClose();
  };
// delete
  const handleDelete = async(id) => {
    // setAddresses(addresses.filter(addr => addr.id !== id));
try {
  const response = await axiosInstance.delete(`/address/${id}`);

  fetchAddress('/address')

} catch (error) {
  
}

  };

  return (
    <>
    {
 loadScreenState ? (
  <LoadingScreen/>
)  : (
  <div className='p-4 shadow rounded'>
  <h5 className='fw-bold mb-4'>Manage Addresses</h5>
  <Button variant="outline-success" className='w-100 mb-4' onClick={() => handleShow()}>
    Add a new address
  </Button>
  {addressDatas.map((address) => (
    <div key={address._id} className='mb-3 border p-3 rounded'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <span className='bg-secondary-subtle p-1 rounded'>
          {address.type}
        </span>
        <div>
        {! address.primary && (<Button variant="outline-primary" size="sm" className="me-2" type="submit" 
        onClick={(e)=> setPrimary(address._id)}
         >
   Set as default
  </Button>)}

          {/* <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowEdit(address)}>Edit</Button>
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(address._id)}>Delete</Button> */}
        </div>
      </div>
      <p className='fw-bold mb-1'>{address.firstname}</p>
      <p className='text-muted mb-1'>{address.address_line_1}</p>
      <p className='text-muted mb-1'>{address.address_line_2}</p>
      <p className='text-muted mb-1'>{address.city}</p>
      <p className='text-muted mb-1'>{address.state}</p>
      <p className='text-muted mb-1'>{address.country}</p>
      <p className='fw-bold mb-0'>Pincode: {address.zip}</p>
      <p className='fw-bold mb-1'>Phone: {address.mobile}</p>

      <div className='d-flex justify-content-between align-items-center mb-2'>
  <div style={{paddingLeft:'10px',paddingTop:'10px'}} >
 <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowEdit(address)}>Edit</Button>
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(address._id)}>Delete</Button>
        </div>
      </div>

      <AddressEditModal
    showEdit={showEdit}
    handleCloseEdit={handleCloseEdit}
    handleSave={handleSave}
    address={address}
    setAddressDatasM={setAddressDatas}
    fetchAddressM={fetchAddress}
    setEditDataM={setEditData}
    editDataM={editData}
  />
    </div>
  ))}

  <AddressModal
    show={showModal}
    handleClose={handleClose}
    handleSave={handleSave}
    address={currentAddress}
    setAddressDatasM={setAddressDatas}
    fetchAddressM={fetchAddress}
  />
  

</div>
)
    }
    </>


   
  );
}

function AddressModal({ show, handleClose, handleSave, address,setAddressDatasM,fetchAddressM }) {
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    type:'Home',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    mobile: '',
    country: '',
    // primary: true,
  });

   
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name,':',e.target.value)

    setFormData((prevData) => (
      
      {
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axiosInstance.post('/address', formData);
      console.log('Address submitted: ', response.data);
      setFormData('')
      handleClose();
      setAddressDatasM([])

await fetchAddressM('/address')


    } catch (error) {
      console.error('Error submitting address: ', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{address ? 'Edit Address' : 'Add New Address'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Address Type</Form.Label>
            <Form.Select name="type" value={formData.type} onChange={handleChange}>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control as="textarea" rows={3} name="address_line_1" value={formData.address_line_1} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address Line 2</Form.Label>
            <Form.Control as="textarea" rows={3} name="address_line_2" value={formData.address_line_2} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pincode</Form.Label>
            <Form.Control type="text" name="zip" value={formData.zip} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Address
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
function AddressEditModal({ showEdit, handleCloseEdit, handleSave, address,setAddressDatasM,fetchAddressM,editDataM,setEditDataM }) {

const handleSubmitEdit = async (e) => {


  e.preventDefault()
  try {
    // Prepare the updated address data object from the form fields
    const updatedAddressData = {
      firstname: editDataM.firstname,
      lastname: editDataM.lastname,
      type:editDataM.type,
      address_line_1: editDataM.address_line_1,
      address_line_2: editDataM.address_line_2,
      mobile: editDataM.mobile,
      country: editDataM.country,
      city: editDataM.city,
      state: editDataM.state,
      zip: editDataM.zip,
      _id:editDataM._id
    };

    // Make a POST request to send the updated address data to the backend
    const response = await axiosInstance.patch('/address', updatedAddressData);
    
    // Close the modal after successful submission
    setAddressDatasM([])

    await fetchAddressM('/address')
    handleCloseEdit();

    // Optionally, you can perform additional actions after a successful submission
  } catch (error) {
    // Handle errors if the POST request fails
    console.error('Error updating address:', error);
  }
};
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    
    setEditDataM((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    };

  return (
    <Modal show={showEdit} onHide={handleCloseEdit}>
      <Modal.Header closeButton>
        <Modal.Title>{address ? 'Edit Address' : 'Add New Address'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitEdit}>
          <Form.Group className="mb-3">
            <Form.Label>Address Type</Form.Label>
            <Form.Select name="type" value={editDataM.type} onChange={handleChangeEdit}>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" name="firstname" value={editDataM.firstname} onChange={handleChangeEdit} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" name="lastname" value={editDataM.lastname} onChange={handleChangeEdit} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" name="mobile" value={editDataM.mobile} onChange={handleChangeEdit} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control as="textarea" rows={3} name="address_line_1" value={editDataM.address_line_1} onChange={handleChangeEdit} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address Line 2</Form.Label>
            <Form.Control as="textarea" rows={3} name="address_line_2" value={editDataM.address_line_2} onChange={handleChangeEdit} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" value={editDataM.city} onChange={handleChangeEdit} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" name="state" value={editDataM.state} onChange={handleChangeEdit} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" name="country" value={editDataM.country} onChange={handleChangeEdit} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pincode</Form.Label>
            <Form.Control type="text" name="zip" value={editDataM.zip} onChange={handleChangeEdit} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Address
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ManageAddress;