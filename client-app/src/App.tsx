import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Header} from 'semantic-ui-react';
import {List} from 'semantic-ui-react';

function App() {
    const [activities, setActivities] = useState([]);
    
    useEffect( () => {
        axios.get('http://localhost:5000/api/activities')
        .then(response => {
            setActivities(response.data)

        })
    }, [])
  
    return (
        <div>
            <Header as= 'h2' icon='users' content='Reactivities' />
            <h1>Reactivities</h1>
            <List>
                {activities.map((activity: any) => (
                    <List.Item key = {activity.id}>
                        {activity.title} 
                    </List.Item>
                ))}
            </List>
        </div>
    )
}

export default App
