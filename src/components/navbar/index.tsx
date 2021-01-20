import styled from "styled-components"
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faHome, faMap, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons'

export const Navbar = observer(() => {
    const loc = window.location.pathname;
    const [activePage, setActivePage] = useState(loc);

    return (
        <Container>

            <Page href={"/articles"} to={"/articles"} onClick={() => setActivePage("/articles")}>
                <FontAwesomeIcon icon={faBook} />
                <p>Artikelen</p>
            </Page>

            <Page href={"/shop"} to={"/shop"} onClick={() => setActivePage("/shop")}>
                <FontAwesomeIcon icon={faShoppingBag} />
                <p>Shop</p>
            </Page>

            <Page href={"/"} to={"/"} onClick={() => setActivePage("/")}>
                <FontAwesomeIcon icon={faHome} />
                <p>Hub</p>
            </Page>

            <Page href={"/hotspots"} to={"/hotspots"} onClick={() => setActivePage("/hotspots")}>
                <FontAwesomeIcon icon={faMap} />
                <p>Hotpots</p>
            </Page>

            <Page href={"/profile"} to={"/profile"} onClick={() => setActivePage("/profile")}>
                <FontAwesomeIcon icon={faUser} />
                <p>Profile</p>
            </Page>


        </Container>
    )
})

const Container = styled.nav`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 10px;
`;


const Page = styled(Link)`
    display:flex;
    flex-direction: column;
    padding: 10px 20px;
    text-align: center;
    align-items:center;
    transition: 0.2s ease-in-out all;
    width: 20%;

    p {
        font-size: 12px;
        margin-top: 5px;
    }

    :hover {
        background: rgba(0,0,0,0.1);
    }
`;