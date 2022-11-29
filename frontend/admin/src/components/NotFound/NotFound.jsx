import React from "react"

const NotFound = () => {
    return (
        <div className='container'>
            <div className='my-4'>
                <p className='error-title'>Сторінка не знайдена.</p>
                <p className='error-description'>Сторінка за вказаною вами адресою більше не існує або ніколи не існувала.</p>
            </div>
        </div>
    )
};

export default NotFound;