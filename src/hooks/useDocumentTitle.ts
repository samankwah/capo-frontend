import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title ? `${title} | Capo` : "Capo";
  }, [title]);
};

export default useDocumentTitle;
