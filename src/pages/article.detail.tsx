import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Page } from "../components/page";
import articles from "../constants/articles";
import categories from "../constants/categories";
import { gray } from "../styles/colors";
import { GlobalButton, GlobalDivider, GlobalInput, GlobalSmallHeading } from "../styles/globals";
import { getSlug } from "../utils/url.helpers";

export const ArticlesDetail = () => {

    const article = articles.find(article => article.slug === getSlug());
    const history = useHistory();

    if (!article) return (
        <Page pageName="Oopppps...">
            <GlobalButton onClick={() => history.replace("/")}>Ga terug naar de hub</GlobalButton>
        </Page>
    )

    return (
        <Page pageName={article.category.name}>

            <GlobalSmallHeading>{article.title}</GlobalSmallHeading>

            <GlobalDivider />

            <p>{article.body}</p>

            <GlobalDivider />

        </Page>
    )
}

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