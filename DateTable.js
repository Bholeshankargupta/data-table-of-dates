import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DateTable() {
    const [dates, setDates] = useState([]);
    const [newDate, setNewDate] = useState('');

    useEffect(() => {
        fetchDates();
    }, []);

    const fetchDates = async () => {
        try {
            const response = await axios.get('http://localhost:5000/dates');
            setDates(response.data);
        } catch (error) {
            console.error('Error fetching dates:', error);
        }
    };

    const addDate = async () => {
        try {
            const response = await axios.post('http://localhost:5000/dates', { date: newDate });
            setDates([...dates, response.data]);
            setNewDate('');
        } catch (error) {
            console.error('Error adding date:', error);
        }
    };

    const updateDate = async (id, updatedDate) => {
        try {
            const response = await axios.put(`http://localhost:5000/dates/${id}`, { date: updatedDate });
            setDates(dates.map(date => date._id === id ? response.data : date));
        } catch (error) {
            console.error('Error updating date:', error);
        }
    };

    const deleteDate = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/dates/${id}`);
            setDates(dates.filter(date => date._id !== id));
        } catch (error) {
            console.error('Error deleting date:', error);
        }
    };

    return (
        <div>
            <h1>Date Table</h1>
            <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
            />
            <button onClick={addDate}>Add Date</button>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dates.map((date) => (
                        <tr key={date._id}>
                            <td>
                                <input
                                    type="date"
                                    value={new Date(date.date).toISOString().split('T')[0]}
                                    onChange={(e) => updateDate(date._id, e.target.value)}
                                />
                            </td>
                            <td>
                                <button onClick={() => deleteDate(date._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DateTable;
