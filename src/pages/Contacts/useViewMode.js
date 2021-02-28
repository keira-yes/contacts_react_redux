import {useEffect, useState} from "react";
import {VIEW_MODE} from "../../constants/viewMode";

export const useViewMode = () => {
  const getInitialViewMode = () => {
    return localStorage.getItem("viewMode") || VIEW_MODE.TABLE;
  }

  const [viewMode, setViewMode] = useState(getInitialViewMode);

  useEffect(() =>{
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  return [viewMode, setViewMode];
}