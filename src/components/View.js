import React from 'react';

const View = ({ singleItem, deleteItem }) => {
    return (

        <div className="data-view">
            <p>Name: {singleItem.name}</p>
            <p>Phone Number: {singleItem.number}</p>
            <button onClick={() => deleteItem(singleItem.id)} className="deleteItem">Delete</button>
        </div>
    );
};

export default View;