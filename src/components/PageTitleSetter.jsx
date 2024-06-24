import React, { useEffect } from "react";

const PageTitleSetter = ({ title }) => {
  useEffect(() => {
    document.title = "Apelio - " + title;
  }, [title]);

  return null; // Este componente no renderiza nada en el DOM
};

export default PageTitleSetter;
