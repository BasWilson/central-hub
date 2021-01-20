import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import React, { useContext, } from "react";
import styled from "styled-components";
import { Page } from "../components/page";
import usersRequests from "../constants/requests/users.requests";
import accountService from "../services/account.service";
import { stores } from "../stores/stores";
import { gray } from "../styles/colors";
import { GlobalButton, GlobalDivider, GlobalSmallHeading } from "../styles/globals";
import createRequest from "../utils/create.request";
import jwtRequests from "../utils/jwt.requests";

export const Profile = observer(() => {

    const userStore = useContext(stores.userStore);

    return (
        <Page pageName={"Profile"}>

            <GlobalSmallHeading>Email</GlobalSmallHeading>
            <p>{userStore.user?.profile.email}</p>
            <GlobalDivider />

            <GlobalSmallHeading>Points</GlobalSmallHeading>
            <p>{userStore.user?.profile.points}</p>

            <GlobalDivider />
            <GlobalButton onClick={async () => {
                const req = createRequest(usersRequests.setPoints);
                req.path += "/" + userStore.user.profile.username + "/" + (1000).toString() + "/add";
                await jwtRequests.que(req);
                await accountService.authenticate(userStore);
            }}>Gimme 1000 test points</GlobalButton>
            <GlobalButton style={{ background: "none", color: "red" }} onClick={accountService.signout}>Log uit</GlobalButton>

        </Page>
    )
})

const Grid = styled.div`
    display: grid;
    grid-template-columns:  repeat( auto-fit, minmax(50%, 100%) );
    gap: 10px;
`;

const Article = styled.div`
    padding: 15px;
    background-color: ${gray};
    border-radius: 10px;
    display: flex;
    align-items: center;
    transition: 0.2s ease all;

    &:hover {
        transform: scale(1.02);
    }
  
    &:active {
        transform: scale(1);
    }  

    p {
        margin-left: 20px;
    }
`;