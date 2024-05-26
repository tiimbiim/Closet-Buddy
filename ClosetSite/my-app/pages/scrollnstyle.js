import React, { useEffect, useState } from 'react';
import axios from 'axios';

const scrollnstyle = () => {

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/data')
            .then(respose => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fecthing the data!', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/data', { name, value })
            .then(response => {
                setData([...data, { id: response.data.id, name, value }]);
                setName('');
                setValue('');
            })
            .catch(error => {
                console.error('There was an error adding the data!', error);
            });
    };

    return ( 
        <div>
            <h1>Data from MySQL</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}: {item.value}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Value"
                />
                <button type="submit">Add Data</button>
            </form>
        </div>
    );
}
 
export default scrollnstyle;