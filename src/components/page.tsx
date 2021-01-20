import React, { FC } from "react";
import styled from "styled-components"
import { GlobalHeading } from "../styles/globals";

export const Page: FC<{
    pageName?: string
}> = (props) => {
    return (
        <Container>
            <GlobalHeading>{props.pageName}</GlobalHeading>
            {props.children}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow-y: auto;
`;