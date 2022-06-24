import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router";

const DisplayTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

export default DisplayTop;