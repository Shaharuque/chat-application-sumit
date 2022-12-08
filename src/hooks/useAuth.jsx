import { useSelector } from "react-redux";

export const useAuth = () => {
  //redux store thekey passi
  const { user, accessToken } = useSelector((state) => state?.authInfo);

  if (user && accessToken) {
    return true;
  } else {
    return false;
  }
};
