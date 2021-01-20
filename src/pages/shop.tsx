import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { v4 } from "uuid";
import { Page } from "../components/page";
import articles from "../constants/articles";
import categories from "../constants/categories";
import usersRequests from "../constants/requests/users.requests";
import shopItems from "../constants/shop.items";
import accountService from "../services/account.service";
import { stores } from "../stores/stores";
import { gray } from "../styles/colors";
import { GlobalButton, GlobalDivider, GlobalInput, GlobalSmallHeading } from "../styles/globals";
import createRequest from "../utils/create.request";
import jwtRequests from "../utils/jwt.requests";

export const Shop = observer(() => {

    const [term, setTerm] = useState("");
    const history = useHistory();
    const userStore = useContext(stores.userStore);

    const filtered = shopItems.filter(item => {
        if (term) {
            return item.title.toLowerCase().includes(term.toLowerCase().trim()) || item.amount === parseInt(term);
        }
        return true;
    })

    return (
        <Page pageName={"Puntenshop"}>

            <GlobalSmallHeading>Jouw punten</GlobalSmallHeading>
            <h3>{userStore.user?.profile.points} 🎓</h3>

            <GlobalDivider />

            {/* Search */}
            <GlobalSmallHeading>Hoe ga jij je studentenpunten spenderen?</GlobalSmallHeading>
            <GlobalInput onChange={(e) => setTerm(e.target.value)} placeholder={"What’s your deepest, darkest desire?"} />

            <GlobalDivider />

            {/* Cats*/}
            {

                filtered.length === 0 ? <> <p>Geen items in de shop gevonden</p><GlobalDivider /> <GlobalButton onClick={() => setTerm("")}>Reset zoekterm</GlobalButton> </> :
                    <Grid>
                        {filtered.map((item) => {
                            return (
                                <Article key={item.title} onClick={async () => {
                                    if ((userStore.user.profile.points - item.amount < 0)) return alert("Je hebt niet genoeg punten!");

                                    const req = createRequest(usersRequests.setPoints);
                                    req.path += "/" + userStore.user.userId + "/" + (userStore.user.profile.points - item.amount).toString();

                                    await jwtRequests.que(req);
                                    await accountService.authenticate(userStore);

                                    alert("Jouw coupon: " + v4())
                                }}>
                                    <p>{item.title}</p>
                                    <p>{item.amount} 🎓</p>
                                </Article>
                            )
                        })}
                    </Grid>

            }
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
    justify-content: space-between;

    &:hover {
        transform: scale(1.02);
    }
  
    &:active {
        transform: scale(1);
    }  

    p {
        width: 50%;
        &:last-of-type {
            margin-left: 20px;
            text-align: right;
        }
    }
`;