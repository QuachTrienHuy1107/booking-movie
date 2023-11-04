import { BackTop } from "antd";
import LoginSuccess from "components/login-success";
import { useScreenType } from "hooks/useScreenType";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { getMe } from "store/features/auth.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { Loading } from "./components/common/loading";
import NotFoundPage from "./pages/notfound";
import { renderRoutes, routes } from "./router";
import "./styles/pages/App.scss";
import { ROUTES } from "./utils/constant";

function App() {
  const { Mobile, FullScreen } = useScreenType();
  const dispatch = useAppDispatch();
  const { credential } = useAppSelector(state => state.authSlice);

  React.useEffect(() => {
    function checkUser() {
      const token = localStorage.getItem("access_token");

      if (!!token) {
        dispatch(getMe());
      }
    }

    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, [credential, dispatch]);

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (Boolean(isLoggedIn)) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <React.Suspense fallback={<Loading />}>
      <BackTop />
      <Switch>
        {renderRoutes(routes)}
        <Route exact path={ROUTES.NOTFOUND} component={NotFoundPage} />
        <Route exact path={ROUTES.LOGIN_SUCCESS} component={LoginSuccess} />
        <Redirect from="*" to={ROUTES.NOTFOUND} />
      </Switch>
      {/* <FullScreen>
                <BackTop />
                <Switch>
                    {renderRoutes(routes)}
                    <Route exact path={ROUTES.NOTFOUND} component={NotFoundPage} />
                    <Route exact path={ROUTES.LOGIN_SUCCESS} component={LoginSuccess} />
                    <Redirect from="*" to={ROUTES.NOTFOUND} />
                </Switch>
            </FullScreen>
            <Mobile>
                <Result status="403" title="403" subTitle="Sorry, you are not authorized to access this page." />
            </Mobile> */}
    </React.Suspense>
  );
}

export default App;
