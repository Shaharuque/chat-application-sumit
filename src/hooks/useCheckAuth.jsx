import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

//Here this custom hook will check weather in the localstorage accesstoken and user is stored or not then dispatch redux action to store accessToken and user info in the redux store
//reload diley jeno redux store info abr set hoa jay shei jnno ai process
export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  //useEffect ar moddhey rakha bhalo
  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    console.log(localAuth);

    if (localAuth) {
      const auth = JSON.parse(localAuth); //JSON.stringify kora silo tai sheita parse korey newa holo
      console.log("useCheckAuth hook", auth?.accessToken, auth?.user);

      if (auth?.accessToken && auth?.user) {
        //now dispatch action to store data in redux store
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
      // setChecked(true);
      setTimeout(function () {
        setChecked(true);
      }, 2000);
    }
  }, [dispatch, setChecked]);

  return checked;
};
