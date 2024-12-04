import React, { useEffect, useState } from "react";
import "./style.css";

const WhatsAppIcon = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+918124666888";
    const message = "Hello! I have an inquiry."; 
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div
      className={`whatsapp-icon ${isVisible ? "" : "hidden"}`}
      onClick={handleWhatsAppClick}
    >
      <i className="fab fa-whatsapp"></i>
    </div>
  );
};

export default WhatsAppIcon;
