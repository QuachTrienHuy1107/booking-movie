import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, Menu } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logoutAction } from "store/features/auth.slice";
import { persistor, useAppDispatch, useAppSelector } from "store/store";
import { ROUTES } from "utils/constant";
import avatar from "../../assets/images/avatar.png";
import "../../styles/components/_header.scss";
import Logo from "./logo";
import { useHistory } from "react-router";
const { Search } = Input;

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="https://www.antgroup.com">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="https://www.aliyun.com">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);

const Header: React.FC = () => {
    const { credential } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const handleLogout = () => {
        persistor.purge();
        dispatch(logoutAction());
        localStorage.clear();
    };

    const onSearch = (value: any) => console.log(value);

    return (
        <div className="header">
            <Container style={{ height: "100%" }}>
                <div className="header__wrapper">
                    <div className="header__left">
                        <Logo />
                        <Input prefix={<SearchOutlined />} placeholder="Search..." className="search-input" />
                    </div>

                    <div className="header__right">
                        <div className="header__right__userInfo">
                            {Object.keys(credential).length === 0 ? (
                                <Link to={ROUTES.LOGIN}>
                                    <img src={avatar} alt="avatar" className="header__right__userInfo--avatar" />
                                    <p className="header__right__userInfo--name">Login</p>
                                </Link>
                            ) : (
                                <>
                                    <img
                                        src={credential.user?.avatar}
                                        alt="avatar"
                                        className="header__right__userInfo--avatar"
                                    />
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item
                                                    key="0"
                                                    onClick={() =>
                                                        history.push(`${ROUTES.PROFILE}/${credential.user?._id}`)
                                                    }
                                                >
                                                    Profile
                                                </Menu.Item>
                                                <Menu.Item key="1" onClick={() => handleLogout()}>
                                                    Logout
                                                </Menu.Item>
                                            </Menu>
                                        }
                                        trigger={["click"]}
                                    >
                                        <p className="header__right__userInfo--name" style={{ cursor: "pointer" }}>
                                            {credential.user?.username}
                                        </p>
                                    </Dropdown>
                                </>
                            )}
                        </div>
                        <div className="header__right__location">
                            <i className="fa fa-map-marker-alt"></i>
                            <Dropdown overlay={menu} trigger={["click"]}>
                                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                    Hồ Chí Minh <DownOutlined />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;
