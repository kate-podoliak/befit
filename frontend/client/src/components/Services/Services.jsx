import React from 'react';
import './Services.scss';

const Services = () => {
    return (
        <div className='services'>
            <div className='container'>
                <div className='section-title'>
                    <h3 className='title-yellow mb-0'>Послуги</h3>
                </div>
                <div className='services__row'>
                    <div className='services__item'>
                        <img src={require('../../img/service-fitness.jpg')} alt='Service' />
                        <button className='button'>Фітнес</button>
                    </div>
                    <div className='services__item'>
                        <img src={require('../../img/service-coach.jpg')} alt='Service' />
                        <button className='button'>Індивідуальне заняття</button>
                    </div>
                    <div className='services__item'>
                        <img src={require('../../img/service-trx.jpg')} alt='Service' />
                        <button className='button'>TRX</button>
                    </div>
                </div>
                <div className='section-button'>
                    <button className='button btn-yellow'>Всі послуги</button>
                </div>
            </div>
        </div>
    );
};

export default Services;