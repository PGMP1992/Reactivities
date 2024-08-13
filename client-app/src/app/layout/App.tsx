import { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import ActivityForm from '../../features/activities/form/ActivityForm';

function App() {
    
    const [activities, setActivities] = useState<Activity[]>([]);
    const[selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
    const [editMode, setEditMode] = useState(false);
    
    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/activities')
        .then(response => {
            console.log(response);
            setActivities(response.data)
        })
    }, [])
  
    // Edit/Selected activity functions 
    function handleSelectActivity(id : string){
        setSelectedActivity(activities.find( x => x.id === id))
    }

    function handleCancelSelectActivity() {
        setSelectedActivity(undefined);
    }

    // Form Functions 
    function handleFormOpen(id?: string) {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: Activity) {
        activity.id 
            ? setActivities([...activities.filter( x => x.id !== activity.id), activity])   
            : setActivities([...activities, {...activity, id : uuid()}]);
        setEditMode(false);
        setSelectedActivity(activity);
    }

    function handleDeleteActivity(id : string) {
        setActivities([...activities.filter(x => x.id !== id)]);     
    }
    
    return (
        <>
            <NavBar openForm ={handleFormOpen } />
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard 
                    activities ={activities} 
                    selectedActivity = {selectedActivity}
                    selectActivity = {handleSelectActivity}
                    cancelSelectActivity = {handleCancelSelectActivity}
                    editMode = {editMode}
                    openForm = { handleFormOpen}
                    closeForm = {handleFormClose}
                    createOrEdit = {handleCreateOrEditActivity}
                    deletActivity = {handleDeleteActivity}
                />
            </Container>
        </>
    )
}

export default App
