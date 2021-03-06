import React from "react";
import Helmet from "react-helmet";
import styled from "../../type-components";
import Sidebar from "react-sidebar";

const Container = styled.div``;

interface IProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    loading: boolean;
}

const HomePresenter: React.SFC<IProps> = ({
    isMenuOpen,
    toggleMenu,
    loading
}) => (
    <Container>
        <Helmet>
            <title>Home | Number</title>
        </Helmet>
        <Sidebar
            sidebar={<b>Sidebar content</b>}
            open={isMenuOpen}
            onSetOpen={toggleMenu}
            styles={{
                sidebar: {
                    width: "80%",
                    backgroundColor: "white",
                    zIndex: "10"
                }
            }}
        >
            {!loading && <button onClick={() => toggleMenu()}></button>}
        </Sidebar>
    </Container>
);

export default HomePresenter;
