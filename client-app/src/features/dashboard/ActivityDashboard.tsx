//import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../activities/details/ActivityDetails";
import ActivityForm from "../activities/form/ActivityForm";

interface Props {
    activities : Activity[];
    // props for ActivityForm actions 
    selectedActivity : Activity | undefined;
    selectActivity : (id: string) => void;
    cancelSelectActivity : () => void;
    editMode : boolean;
    openForm : (id: string) => void;
    closeForm : () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity : (id: string) => void; 
    submmiting : boolean;
}


export default function ActivityDashboard ({ activities, selectedActivity, 
        selectActivity, cancelSelectActivity, editMode, openForm, closeForm, 
        createOrEdit, deleteActivity, submmiting } : Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                    activities = {activities} 
                    selectActivity = {selectActivity}
                    deleteActivity = {deleteActivity}
                    submmiting={submmiting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode && 
                    <ActivityDetails 
                        activity = {selectedActivity} 
                        cancelSelectActivity ={cancelSelectActivity} 
                        openForm = {openForm}
                    /> }
                { editMode && 
                    <ActivityForm 
                        closeForm = {closeForm} 
                        activity= {selectedActivity} 
                        createOrEdit = {createOrEdit}
                        submmiting = {submmiting}
                    /> }
             </Grid.Column>
        </Grid>

    )
}