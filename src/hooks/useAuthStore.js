import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onLogoutCalendar,
} from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(
        onLogout(error.response?.data?.msg || "Credenciales incorrectas")
      );
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 3000);
    }
  };
  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(
        onLogout(
          error.response?.data?.msg || "No se logró registrar el usuario"
        )
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(onLogout());
      return;
    }
    try {
      const { data } = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      localStorage.removeItem("token-init-date");
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    // Properties
    status,
    user,
    errorMessage,
    // Methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
