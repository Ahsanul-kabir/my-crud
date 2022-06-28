import React from 'react'
import { useEffect, useState } from 'react'
import View from './View'


const Info = () => {
    const [formErrors, setFormErrors] = useState('')

    // input field states
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const [editId, setEditId] = useState(null)
    const [isEdit, setIsEdit] = useState(false)


    // get data
    const [items, setItems] = useState([])

    const getData = () => {
        fetch('http://127.0.0.1:8000/info/')
            .then((res) => res.json())
            .then((data) => {
                setItems(data)
            })
    }

    useEffect(() => {
        getData()
    }, [items])


    // delete Item
    const deleteItem = (id) => {
        const proceed = window.confirm('Are you sure you want to delete?');
        if (proceed) {

            const url = `http://127.0.0.1:8000/infoDelete/${id}/`
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.deletedCount > 0) {
                        alert.log('Successfully deleted');
                    }
                })
        }
    }


    const addItem = (e) => {
        const info = { name, number }
        // console.log(info);

        fetch('http://127.0.0.1:8000/infoAdd/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Success', data);
                alert('Info Added Successfully')
                e.target.reset()
            })
    }

    const edit = (id) => {
        setEditId(id)
        setIsEdit(true)

    }

    const editItem = (id) => {

        const updatedInfo = { editId, name, number }

        const url = `http://127.0.0.1:8000/infoUpdate/${editId}/`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Success', data)
                alert('Update Successfully')
                setIsEdit(false)
                // e.target.reset()
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormErrors(validate(number))

        if (validate(number)) {
            return null
        } else {
            if (!isEdit) {
                addItem(e)
            }
            else {
                editItem()
            }
        }
    }


    const validate = (number) => {
        let errors = ''
        const regex = /^(?:\+88|88)?(01[3-9]\d{8})$/
        if (!number) {
            errors = 'Phone Number is required!'
        } else if (!regex.test(number)) {
            errors = 'Give Bangladeshi phone numbers (likes, +88017XXXXXXXX or 017XXXXXXXX)'
        }
        return errors
    }


    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Explore Crud</h1>
            <form onSubmit={handleSubmit} className='form-container'>
                <input
                    type='text'
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name='name'
                />
                <br />
                <input
                    type='number'
                    placeholder='Number'
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                    name='number'
                    id='phone-number'
                />

                <p style={{ color: 'red' }}>{formErrors}</p>
                <br />

                <input type="submit" value={isEdit ? "Update" : "Add"} style={{ background: 'green', }} />

                <p>Want to add data? <button onClick={!isEdit}>Click Here</button> </p>
            </form>


            <div style={{ margin: '15px' }}>
                {items?.map((singleItem) => (<>
                    <View
                        key={singleItem.id}
                        id={singleItem.id}
                        singleItem={singleItem}
                        deleteItem={deleteItem}
                        editItem={editItem}
                        edit={edit}
                    ></View>
                </>))}
            </div>

        </>
    )
}

export default Info
