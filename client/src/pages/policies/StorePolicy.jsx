import React from 'react';
import Footer from '../../components/Footer';
import MiddleNav from '../../components/MiddleNav';

function StorePolicy() {
  return (

    <>
<MiddleNav/>

<div className="container my-5">
      <div className="row">
        <div className="col">
          <h1 className="mb-4">Store Policy</h1>

          <h2 className="mt-4">General</h2>
          <ol>
            <li>
              <strong>Do I have to create an account to make a purchase?</strong>
              <p>You don't need any registration or account creation to browse through our store.</p>
            </li>
            <li>
              <strong>How can I see my orders?</strong>
              <p>You can go to the My Orders section on the storefront and see your orders.</p>
            </li>
            <li>
              <strong>Is ordering on your website secure?</strong>
              <p>Absolutely. We value your privacy and uphold your data to the highest safety standards. All transactions are completely secure and processed with secure paths via reputed payment gateways following global standards. All information is access controlled and cannot be released.</p>
            </li>
          </ol>

          <h2 className="mt-4">Shipping</h2>
          <ol>
            <li>
              <strong>Do you deliver Pan-India?</strong>
              <p>Yes. We serve more than 28000 pin codes across India.</p>
            </li>
            <li>
              <strong>What are the general shipping or delivery timelines?</strong>
              <p>We take 24-48 hours to process your order and prepare it for logistics partner to pick-up. The logistics partner takes 4-6 days to deliver the product post pick-up.</p>
            </li>
            <li>
              <strong>What are the shipping charges associated with an order?</strong>
              <p>The shipping charges for your order will be calculated and displayed at checkout. We are giving it for free as part of our launch offer.</p>
            </li>
            <li>
              <strong>How do I track my order?</strong>
              <p>You can track your orders from email and Whatsapp notifications from our logistics partner.</p>
            </li>
          </ol>

          <h2 className="mt-4">Payments</h2>
          <ol>
            <li>
              <strong>What payment methods do you accept?</strong>
              <p>You can pay for your orders using any of the payment methods below:</p>
              <ul>
                <li>Cards (Visa, Mastercard, Rupay, Discover, Amex)</li>
                <li>UPI</li>
                <li>Net Banking</li>
                <li>Wallets</li>
                <li>BNPL (Buy Now, Pay Later)</li>
              </ul>
            </li>
            <li>
              <strong>Do you offer COD (Cash on Delivery)?</strong>
              <p>We currently don't offer COD.</p>
            </li>
            <li>
              <strong>Will I get automatic refund for failed payments?</strong>
              <p>Yes. You will get an automated refund into your original payment source within 7-10 working days.</p>
            </li>
            <li>
              <strong>What if I have issues with my order?</strong>
              <p>Please reach out to us at contact info. in contact us. We will try to resolve all your issues on priority.</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
<Footer/>
</>
   
  );
}

export default StorePolicy;
