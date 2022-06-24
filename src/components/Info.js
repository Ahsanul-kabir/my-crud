import React from 'react';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid'
import View from './View';

// getting the values of local storage
const getDatafromLS = () => {
    const data = localStorage.getItem('items');
    if (data) {
        return JSON.parse(data);
    }
    else {
        return []
    }
}

const Info = () => {

    // main array of objects state || items state || items array of objects
    const [items, setItems] = useState(getDatafromLS());

    // input field states
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    // form submit event
    const handleSubmit = (e) => {
        e.preventDefault();
        // creating an object
        const id = uuid()
        let item = {
            id,
            name,
            number
        }
        setItems([...items, item]);
        setName('');
        setNumber('');
    }


    // delete Item from LS
    const deleteItem = (id) => {
        const tempItem = [...items]
        const filteredItems = tempItem.filter((element) => {
            return element.id !== id
        })
        setItems(filteredItems);
    }

    // saving data to local storage
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items])


    return (
        <>
            <form onSubmit={handleSubmit} className='form-container'>
                <input type='name' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} required />
                <br />
                <input type='' placeholder='Number' onChange={(e) => setNumber(e.target.value)} value={number} id='phone-number' required />

                <br />
                <button type="submit">Enter</button>
            </form>

            <div style={{ margin: '15px' }}>
                {
                    items.map((singleItem) => <View singleItem={singleItem} deleteItem={deleteItem}></View>)
                }

            </div>
        </>
    );
};

export default Info;