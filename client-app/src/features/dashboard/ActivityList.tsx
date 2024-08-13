//import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../app/models/activity";
import { SyntheticEvent, useState } from "react";

interface Props {
    activities : Activity[];
    selectActivity : ( id:string) => void;
    deleteActivity: (id: string) => void;
    submmiting: boolean;
}

export default function ActivityList ({activities, selectActivity, deleteActivity, submmiting} :Props) {
    
    const [target, setTarget] = useState('');

    function handleActivityDelete (e : SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                { activities.map( activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as ='a'> {activity.title}</Item.Header>
                            <Item.Meta> {activity.date}</Item.Meta>
                            <Item.Description>
                                <div> {activity.description}</div>
                                <div> {activity.city}, {activity.venue}</div>
                            </Item.Description>    
                            <Item.Extra>
                                <Button 
                                    onCLick={() => selectActivity(activity.id)} 
                                    floated="right" 
                                    content="View" 
                                    color="blue" 
                                />
                                <Button 
                                    name = {activity.id}
                                    loading = {submmiting && target === activity.id} 
                                    onCLick={(e) => handleActivityDelete(e, activity.id)} 
                                    floated="right" 
                                    content="Delete" 
                                    color="red" 
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}