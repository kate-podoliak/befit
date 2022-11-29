import React from 'react';
import './CountItems.scss';

const CountItems = () => {
    const items = [
        {
            number: 'X',
            name: 'обладнаних залів для тренувань',
        },
        {
            number: 'X',
            name: 'класифікованих інструкторів',
        },
        {
            number: 'X',
            name: 'років на ринку фітнесу',
        },
        {
            number: 'X',
            name: 'хвилини від м."назва метро"',
        },
        {
            number: 'X',
            name: 'видів тренувань',
        }
    ];

    return (
        <div className='count-items'>
            <div className='container'>
                <div className='count-items__row'>
                    {items.map((obj) => (
                        <div className='count-items__item' key={obj.name}>
                            <p className='item__number'>{obj.number}</p>
                            <p>{obj.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CountItems;