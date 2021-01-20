import React, { FC, useRef, useState } from "react";
import styled from "styled-components"

interface Props {
    style?: any;
    label?: string;
    defaultStage?: number;
    stages: {
        color: string,
        text?: string,
        callback: () => void
    }[]
}

export const Switch: FC<Props> = (props) => {

    const [stage, setStage] = useState(props.defaultStage || 0);

    return (
        <OuterContainer style={props.style} >
            {props.label ? <Label>{props.label}</Label> : null}
            <Container onClick={() => {
                const newStage = stage === props.stages.length - 1 ? 0 : stage + 1;
                setStage(newStage);
                props.stages[newStage].callback();
            }}>
                <Slider color={props.stages[stage].color} width={(100 / props.stages.length) + "%"} left={((100 / props.stages.length) * stage) + "%"}>
                    {props.stages[stage].text}
                </Slider>
            </Container>
        </OuterContainer>
    )
}

const OuterContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.p`
    color: white;
    margin-bottom: 5px;
    font-weight: bold;
`

const Container = styled.div`
    display: flex;
    height: 40px;
    background: rgba(255,255,255,0.1);
    border-radius: 5px;
    position: relative;
`;

const Slider = styled.div<{ width: any, left: any, color: string }>`
    position: absolute;
    user-select: none;
    top: 5px;
    bottom: 5px;
    color: white;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    display: flex;
    font-weight: bold;
    left: calc(${props => props.left} + 5px);
    width: calc(${props => props.width} - 10px);
    background: ${props => props.color};
`;