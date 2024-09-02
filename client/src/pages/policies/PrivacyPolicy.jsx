import React from "react";
import Footer from '../../components/Footer';
import MiddleNav from '../../components/MiddleNav';

function PrivacyPolicy() {
  return (
    <>
<MiddleNav/>
<div className="container my-5">
      <div className="row">
        <div className="col">
          <h1 className="mb-4">Privacy Policy</h1>
          <p>
            This Privacy Policy ("Privacy Policy") explains how we use your information when you access or use our storefront, its corresponding mobile site or mobile application (collectively, "Storefront"), and/or purchase products, and/or utilize any services or other offerings made available through the Storefront (collectively, "Storefront Features").
          </p>
          <p>
            This Privacy Policy does not apply to any information that you provide to, or that is collected by, any third-party. Please consult directly with such third-party about its information security practices, policies, and procedures.
          </p>
          
          <h2 className="mt-5">User Acceptance</h2>
          <p>
            By accessing or using the Storefront, you agree to the terms of this Privacy Policy for collection, use, storage, disclosure, and otherwise processing of your personal information (including sensitive personal data or information) in accordance with the terms and conditions of this Privacy Policy and as permitted under applicable laws, including but not limited to the Information Technology Act, 2000 and the rules framed thereunder ("IT Laws").
          </p>
          
          <h2 className="mt-5">Information Collection</h2>
          <ol>
            <li>
              We may collect certain personal information from you, such as your name, email address, phone number, etc. to enable you to access the Storefront and all Storefront Features. You must ensure that you update your personal information and ensure that such information remains accurate and up to date at all times.
            </li>
            <li>
              We may also collect your personal information via other sources such as updated delivery address or contact information from our courier partners, and information from our payment service providers.
            </li>
          </ol>
          
          <h2 className="mt-5">Use of Your Information</h2>
          <ul>
            <li>To enable you to access the Storefront and/or avail the Storefront Features.</li>
            <li>To handle your orders - deliver products and services, or communicate with you about your orders, any new products and services, or promotional offers or in connection with the Storefront and Storefront Features via different channels (e.g., by phone, e-mail).</li>
            <li>To recommend products or promotional offers to you that might be of interest to you, and identify your preferences.</li>
            <li>To comply with applicable law or requests received from regulators, government or judicial authorities.</li>
            <li>To prevent and detect fraud and abuse.</li>
            <li>To help improve the quality and design of our Storefront and/ or Storefront Features and to create new features, promotions, functionality, and services.</li>
            <li>To fulfil any other purpose for which you provide us the information and/or for any other purpose with your consent.</li>
          </ul>
        </div>
      </div>
    </div>

<Footer/>
</>


  );
}

export default PrivacyPolicy;
