import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title ? `${title} | TipToe` : "TipToe";
  }, [title]);
};

export default useDocumentTitle;
