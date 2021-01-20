import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Page } from "../components/page";
import articles from "../constants/articles";
import categories from "../constants/categories";
import { gray } from "../styles/colors";
import { GlobalButton, GlobalDivider, GlobalInput, GlobalSmallHeading } from "../styles/globals";

export const Articles = () => {

    const [term, setTerm] = useState("");
    const history = useHistory();

    const filtered = articles.filter(article => {
        if (term) {
            return article.title.toLowerCase().includes(term.toLowerCase().trim()) || article.category.name.toLowerCase().includes(term.toLowerCase().trim());
        }
        return true;
    })

    return (
        <Page pageName={"Artikelen"}>

            {/* Search */}
            <GlobalSmallHeading>Zoeken</GlobalSmallHeading>
            <GlobalInput onChange={(e) => setTerm(e.target.value)} placeholder={"Zoek naar een artikel"} />

            <GlobalDivider />

            {/* Cats*/}
            {
                Object.keys(categories).map(key => {
                    // @ts-ignore
                    const category = categories[key];
                    const arts = filtered.filter(article => article.category.slug === category.slug)
                    return (
                        <div key={category.name} >
                            <GlobalSmallHeading>{category.name}</GlobalSmallHeading>
                            {
                                arts.length === 0 ? <p>Geen artikelen in deze categorie</p> :
                                    <Grid>
                                        {arts.map((article) => {
                                            return (
                                                <Article key={article.slug} onClick={() => history.push("/articles/" + article.slug)}>
                                                    <FontAwesomeIcon width={50} height={50} icon={article.category.icon} />
                                                    <p>{article.title}</p>
                                                </Article>
                                            )
                                        })}
                                    </Grid>
                            }
                            <GlobalDivider />
                        </div>
                    )
                })
            }
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