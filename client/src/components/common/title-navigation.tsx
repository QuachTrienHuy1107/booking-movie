import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/_title-navigation.scss";

interface ITitleNavigation {
    subTitle: string;
    title: string;
    linkTo: string;
}

const TitleNavigation: React.FC<ITitleNavigation> = ({ title, subTitle, linkTo }) => {
    return (
        <div className="heading-title">
            <h1>{title}</h1>
            <Link to={linkTo} >{subTitle}</Link>
        </div>
    );
};
export default TitleNavigation;
