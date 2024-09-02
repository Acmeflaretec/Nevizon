import React from "react";
import Footer from '../../components/Footer';
import MiddleNav from '../../components/MiddleNav';

function ReturnPolicy() {
  return (
    <>
    <MiddleNav/>
    <div className="container my-5">
      <div className="row">
        <div className="col">
          <h1 className="mb-4">Return Policy</h1>
          <ol>
            <li>
              We ensure that our products reach you safely and on time and currently don't accept returns. In case of queries, please contact us with the details mentioned in the "About Us" section.
            </li>
            <li>
              In case you receive damaged products, please contact us within 24 hours with images and we will resolve this.
            </li>
            <li>
              We understand sometimes products don't meet your expectations. We will evaluate if we can offer returns at your location at an additional charge. In such cases, please contact us and we will evaluate and decide if we can offer returns at your location at an additional charge.
            </li>
            <li>
              Returns, if offered, will be at a nominal cost for picking the product from your doorstep and delivering it back to us. This cost will be communicated to you before processing returns.
            </li>
          </ol>
        </div>
      </div>
    </div>
    
    <Footer/>
    </>

  
  );
}

export default ReturnPolicy;
