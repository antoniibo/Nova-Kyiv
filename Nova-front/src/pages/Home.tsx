import React from "react";
import Hero from "../Hero/Hero";
import Recommendations from "../Recommendations/Recommendations";
import Introduction from "../Introduction/Introduction";
import Bento from "../Bento/Bento";

function Home(){
    return(
        <>
            <Hero/>
            <Recommendations/>
            <Introduction/>
            <Bento/>
        </>
    )
}

export default React.memo(Home);