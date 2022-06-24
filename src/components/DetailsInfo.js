import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsInfo = () => {
    const { id } = useParams();
    return (
        <div className='data-view'>
            <p>Id: {id}</p>
        </div>
    );
};

export default DetailsInfo;