import React from "react"
import { Route } from "react-router-dom"
import { ArticlesDetail } from "./article.detail"
import { Articles } from "./articles"
import { Home } from "./home"
import { Hotspots } from "./hotspots"
import { Profile } from "./profile"
import { Shop } from "./shop"
export const Routes = () => {
    return (
        <>
            <Route exact path="/" >
                <Home />
            </Route>

            <Route exact path="/shop" >
                <Shop />
            </Route>

            <Route exact path="/hotspots" >
                <Hotspots />
            </Route>

            <Route exact path="/profile" >
                <Profile />
            </Route>

            <Route exact path="/articles" >
                <Articles />
            </Route>

            <Route exact path="/articles/:slug" >
                <ArticlesDetail />
            </Route>
        </>
    )
}