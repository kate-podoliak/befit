import React from 'react';
import SliderPhoto from "../components/SliderPhoto/SliderPhoto";
import Services from "../components/Services/Services";
import SliderReviews from "../components/SliderReviews/SliderReviews";
import CountItems from "../components/CountItems/CountItems";
import InvitationAccount from "../components/InvitationAccount/InvitationAccount";

const Main = () => {
    return (
        <div>
            <SliderPhoto/>
            <Services/>
            <SliderReviews/>
            <CountItems/>
            <InvitationAccount/>
        </div>
    );
};

export {Main};