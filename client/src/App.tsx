import { BackTop } from "antd";
import LoginSuccess from "components/login-success";
import { useScreenType } from "hooks/useScreenType";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFoundPage from "./pages/notfound";
import { renderRoutes, routes } from "./router";
import "./styles/pages/App.scss";
import { ROUTES } from "./utils/constant";

function App() {
    const { Mobile, FullScreen } = useScreenType();
    return (
        <React.Suspense fallback={<div>Loading</div>}>
            <FullScreen>
                <BackTop />
                <Switch>
                    {renderRoutes(routes)}
                    <Route exact path={ROUTES.NOTFOUND} component={NotFoundPage} />
                    <Route exact path={ROUTES.LOGIN_SUCCESS} component={LoginSuccess} />
                    <Redirect from="*" to={ROUTES.NOTFOUND} />
                </Switch>
            </FullScreen>
            <Mobile>
                <h1 style={{ textAlign: "center" }}>Sorry, this device we do not support</h1>
            </Mobile>
        </React.Suspense>
    );
}

export default App;
