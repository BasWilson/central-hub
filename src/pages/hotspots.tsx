import { faMap, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Page } from "../components/page";
import articles from "../constants/articles";
import categories from "../constants/categories";
import hotspots from "../constants/hotspots";
import { gray } from "../styles/colors";
import { GlobalButton, GlobalDivider, GlobalInput, GlobalSmallHeading } from "../styles/globals";

export const Hotspots = () => {

    const [term, setTerm] = useState("");
    const history = useHistory();

    const filtered = hotspots.filter(hotspot => {
        if (term) {
            return hotspot.title.toLowerCase().includes(term.toLowerCase().trim()) || hotspot.city.toLowerCase().includes(term.toLowerCase().trim());
        }
        return true;
    })

    return (
        <Page pageName={"Hotspots"}>

            {/* Search */}
            <GlobalSmallHeading>Hotspots in jouw buurt vinden</GlobalSmallHeading>
            <GlobalInput onChange={(e) => setTerm(e.target.value)} placeholder={"Zoek een hotspot..."} />

            <GlobalDivider />

            {/* Cats*/}

            {
                filtered.length === 0 ? <p>Geen hotspots gevonden</p> :
                    <Grid>
                        {filtered.map((hotspot) => {
                            return (
                                <a key={hotspot.title} target={"blank"} href={hotspot.url}>
                                    <Article >
                                        <FontAwesomeIcon width={50} height={50} icon={faMapMarker} />
                                        <div>
                                            <p>{hotspot.city}</p>
                                            <p>{hotspot.title}</p>
                                        </div>
                                    </Article>
                                </a>
                            )
                        })}
                    </Grid>
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