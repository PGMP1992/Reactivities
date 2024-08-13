import { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/dashboard/ActivityDashboard';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    
    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/activities')
        .then(response => {
            console.log(response);
            setActivities(response.data)
        })
    }, [])
  
    return (
        <>
            <NavBar />
            {/* <Container style={{marginTop: '7em'}}> */}
                <ActivityDashboard activities ={activities} />
                {/* <List>
                    {activities.map((activity: any) => (
                        <List.Item key ={activity.id} >
                            {activity.title}
                        </List.Item>
                    ))}
                </List> */}
            {/* </Container> */}
        </>
    )
}

export default App
