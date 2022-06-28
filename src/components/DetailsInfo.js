import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const DetailsInfo = () => {
    const { id } = useParams();

    // get data
    const [item, setItem] = useState([])

    const getData = () => {
        fetch(`http://127.0.0.1:8000/info/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setItem(data)
            })
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className='data-view'>
            <p>Id: {item.id}</p>
            <p>Name: {item.name}</p>
            <p>Phone Number: {item.number}</p>
        </div>
    );
};

export default DetailsInfo;