import React from 'react';
import './InvitationAccount.scss';

const InvitationAccount = () => {
    return (
        <div className='invitation'>
            <div className="triangle-top"></div>
            <div className='container'>
                <div className='invitation-title section-title'>
                    <h3 className='title-black'>Записуйся онлайн на тренування прямо зараз, <br/>дивись історію відвідувань!</h3>
                </div>
                <div className='section-button'>
                    <button className='button btn-black'>Особистий кабінет</button>
                </div>
            </div>
        </div>
    );
};

export default InvitationAccount;