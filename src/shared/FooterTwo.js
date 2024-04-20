import React from "react";

const FooterTwo = () => {
  return (
    <footer
      className="text-center"
      style={{
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <div className="container">
        &copy; {new Date().getFullYear()} 📇Invoicely
      </div>
    </footer>
  );
};

export default FooterTwo;
