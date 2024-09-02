import React from "react";
import Footer from '../../components/Footer';
import MiddleNav from '../../components/MiddleNav';

function CancellationRefunds() {
  return (
    <>
<MiddleNav/>
<div className="container my-5">
      <div className="row">
        <div className="col">
          <h1 className="mb-4">Cancellation & Refund</h1>
          <ol>
            <li>Full refund if the order is cancelled before it is accepted by us.</li>
            <li>No cancellation or refund if your order has been accepted or shipped.</li>
            <li>We are totally committed to delivering your orders on time. However, if the order is cancelled by us, you will get a full refund.</li>
            <li>In case of additional queries, please contact us with the details mentioned in the "About Us" section.</li>
          </ol>
        </div>
      </div>
    </div>

<Footer/>
</>

 
  );
}

export default CancellationRefunds;
