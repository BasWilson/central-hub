import React, { useContext, useState } from "react"
import { observer } from "mobx-react";
import styled from "styled-components";
import { GlobalButton, GlobalDivider, GlobalInput, GlobalSmallHeading } from "../styles/globals";
import accountService from "../services/account.service";
import { stores } from "../stores/stores";
import { setEndpointEnv } from "../utils/env.emulator";
import jwtRequests from "../utils/jwt.requests";
import { Page } from "./page";
import createAlert from "../utils/create.alert";

export const AuthScreen = observer(() => {

    const userStore = useContext(stores.userStore);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");

    const signIn = async () => {
        if (!username || !password) return;

        const res = await accountService.login(username, password, userStore);
        if (!res) return createAlert("Je hebt niet de juiste gegevens ingevuld", "error")
        window.location.reload();
    }

    if (mode === "login") {
        return (
            <Page pageName={"Login"}>
                <GlobalSmallHeading>Welkom bij dé Centrale Hub voor studenten.</GlobalSmallHeading>
                <GlobalDivider />
                <p>Om gebruik te kunnen maken van deze app moet je inloggen met je school account.</p>
                <GlobalDivider />
                <GlobalInput onChange={(e) => setUsername(e.target.value)} placeholder="School e-mail" type="email" />
                <GlobalInput style={{ marginTop: 10 }} onChange={(e) => setPassword(e.target.value)} placeholder="Wachtwoord" type="password" />
                <GlobalButton style={{ marginTop: 10 }} onClick={signIn}>Login</GlobalButton>
                <GlobalButton style={{ marginTop: 10, background: "none", color: "black" }} onClick={() => { setMode("register") }}>Ik heb nog geen account</GlobalButton>
            </Page>
        )
    } else {
        return (
            <Page pageName={"Registreer"}>
                <GlobalSmallHeading>Welkom bij dé Centrale Hub voor studenten.</GlobalSmallHeading>
                <GlobalDivider />
                <p>Om gebruik te kunnen maken van deze app moet je inloggen met je school account.</p>
                <GlobalDivider />
                <GlobalInput onChange={(e) => setUsername(e.target.value)} placeholder="School e-mail" type="email" />
                <GlobalInput style={{ marginTop: 10 }} onChange={(e) => setUsername(e.target.value)} placeholder="Je naam" type="name" />
                <GlobalInput style={{ marginTop: 10 }} onChange={(e) => setPassword(e.target.value)} placeholder="Wachtwoord" type="password" />
                <GlobalButton style={{ marginTop: 10 }} onClick={signIn}>Registreer</GlobalButton>
                <GlobalButton style={{ marginTop: 10, background: "none", color: "black" }} onClick={() => { setMode("login") }}>Ik heb al een account</GlobalButton>
            </Page>
        )
    }


})