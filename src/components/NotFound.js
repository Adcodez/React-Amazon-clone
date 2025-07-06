import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div classNameName="not_found">
      <Link to='/'>
      <div>
        <img classNameName="img_top" src="#add error title" alt="page not found" />
      </div>
      <div>
        <img src="#add error title" alt="page not found" />
      </div>
      </Link>
    </div>
  );
}

export default NotFound;
