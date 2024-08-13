import { useState, useEffect } from 'react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';

function App() {
    
    const [activities, setActivities] = useState<Activity[]>([]);
    const[selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submmiting, setSubmmiting] = useState(false);
    
    useEffect(() => {
        
        agent.Activities.list().then(response => {
            console.log(response);
            let activities : Activity[] = [];
            response.forEach(activity => {
                // Get the date and ignore the time stamp
                activity.date = activity.date.split('T')[0];
                activities.push(activity);
            })
            setActivities(activities);
            setLoading(false);
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
        setSubmmiting(true);
        if(activity.id ) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter( x => x.id !== activity.id), activity])
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmmiting(false);
            })    
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmmiting(false);
            })
        }
    }

    function handleDeleteActivity(id : string) {
        setSubmmiting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSubmmiting(false);
        })
             
    }

    if(loading) return <LoadingComponent content='Loading App' />
    
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
                    deleteActivity = {handleDeleteActivity}
                    submmiting = {submmiting}
                />
            </Container>
        </>
    )
}

export default App
