import React from 'react';
import { Link } from 'react-router-dom';

const View = ({ singleItem, deleteItem, id, edit }) => {
    return (

        <div className="data-view">
            <Link to={`contact/${singleItem.id}`}>
                <p>Name: {singleItem.name}</p>
                <p>Phone Number: {singleItem.number}</p>
            </Link>
            <button onClick={() => deleteItem(id)} className="deleteItem">Delete</button>

            <button onClick={() => edit(id)} className="editItem">Edit</button>
        </div>

    );
};

export default View;