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

    const register = async () => {
        if (!username || !password) return;

        const res = await accountService.register(username, password, userStore);

        if (res.error) return createAlert("Dit email adres is al in gebruik", "error");

        window.location.reload();
    }

    return (
        <Page pageName={mode === "login" ? "Login" : "Registreer"}>
            <GlobalSmallHeading>Welkom bij dé Centrale Hub voor studenten.</GlobalSmallHeading>
            <GlobalDivider />
            <p>Om gebruik te kunnen maken van deze app moet je inloggen met je school account.</p>
            <GlobalDivider />
            <GlobalInput onChange={(e) => setUsername(e.target.value)} placeholder="School e-mail" type="email" />
            <GlobalInput style={{ marginTop: 10 }} onChange={(e) => setPassword(e.target.value)} placeholder="Wachtwoord" type="password" />
            {
                mode === "login" ?
                    <>
                        <GlobalButton style={{ marginTop: 10 }} onClick={signIn}>Login</GlobalButton>
                        <GlobalButton style={{ marginTop: 10, background: "none", color: "black" }} onClick={() => { setMode("register") }}>Ik heb nog geen account</GlobalButton>
                    </>
                    :
                    <>
                        <GlobalButton style={{ marginTop: 10 }} onClick={register}>Registreer</GlobalButton>
                        <GlobalButton style={{ marginTop: 10, background: "none", color: "black" }} onClick={() => { setMode("login") }}>Ik heb al een account</GlobalButton>
                    </>
            }

        </Page>
    )



})