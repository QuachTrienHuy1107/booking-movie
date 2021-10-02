import { Form } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { useHistory } from "react-router-dom";
import { ROUTES } from "utils/constant";
import "../styles/pages/_form.scss";
import { layout } from "../utils/helper";

interface IForm {
    children: React.ReactNode;
}

const FormTemplate: React.FC<IForm> = ({ children }) => {
    const history = useHistory();

    const [title, setTitle] = React.useState<string>("Login");

    React.useEffect(() => {
        const _title = window.location.pathname;
        if (_title === ROUTES.LOGIN) {
            setTitle("Login");
        } else {
            setTitle("Register");
        }
    }, []);

    const goBack = () => {
        history.push(ROUTES.HOME);
    };

    return (
        <div className="form">
            <div className="form__wrapper">
                <Title className="form__wrapper--title" onClick={() => goBack()}>
                    {title}
                </Title>
                <div className="form__wrapper--content">{children}</div>
            </div>
        </div>
    );
};
export default FormTemplate;
