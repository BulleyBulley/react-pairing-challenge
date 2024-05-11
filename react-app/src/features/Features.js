import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Feature } from "../utils/objects";
import { getAllFeatures, getAllUsers, postFeature } from "./featuresApi";
import { User } from "../utils/objects";

function Features() {
  const [requestFormData, setRequestFormData] = useState({});
  const [currentFeatures, setCurrentFeatures] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("current user: " + currentUser.name);
  }, [currentUser]);

  useEffect(() => {
    // fetch the current features on component mount
    fetchAllFeatures();
    // fetch all users on component mount
    fetchAllUsers();

  }, []);

  useEffect(() => {
    // Wait for fetch all users on component mount
    if (users.length > 0 && !currentUser.userId) {
      const firstUser = new User(users[0].name);
      firstUser.userId = users[0].userId;
      setCurrentUser(firstUser);
    }
  }, [users]);
  

  const fetchAllFeatures = async () => {
    const features = await getAllFeatures();
    if (features.status === 200) {
      setCurrentFeatures(features.data);
    }
  };

  const fetchAllUsers = async () => {
    const users = await getAllUsers();
    if (users.status === 200) {
      setUsers(users.data);
    }
  };

  const sendFeatureRequest = async (request) => {
    console.log("sendRequest: ", request);
    // send the request to the api
    const response = postFeature(request);
    if (response.status === 201) {
      console.log("sendRequest: request sent successfully");
      return response.id;
    }
  };

  const handleRequestChange = (e) => {
    setRequestFormData({
      ...requestFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeUser = (e) => {
    //console.log the event target value object
    const selectedUserId = e.target.value;
    // Find the user object based on the selectedUserId
    const selectedUserName = findUserName(selectedUserId);
    const thisUser = new User(selectedUserName);
    thisUser.userId = selectedUserId;
    // Do something with the selected user, such as updating state
    setCurrentUser(thisUser);
  };

  const findUserName = (userId) => {
    const user = users.find((user) => user.userId === userId);
    return user.name;
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    // create a new instance of the Feature class
    const newRequest = new Feature(
      requestFormData.name,
      requestFormData.description,
      currentUser.userId
    );

    // send the request to the api
    const newRequestId = sendFeatureRequest(newRequest); //this would be the id returned from the api
    newRequest.id = newRequestId;
    // update the currentFeatures state
    // add the new request to the currentFeatures array at the start
    setCurrentFeatures([newRequest, ...currentFeatures]);

    //clear the form
    setRequestFormData({
      name: "",
      description: "",
    });
  };

  const handleVote = (id) => {
    console.log("handleVote: ", id);

    // Find the feature that matches the id
    const feature = currentFeatures.find((feature) => feature.id === id);

    // Check if the user has already voted
    const hasVoted = feature.votes.includes(currentUser.userId);
    const userWroteFeature = feature.userId === currentUser.userId;

    if (hasVoted) {
      console.log(
        `handleVote: User has already voted, user: ${currentUser.name}, userId: ${currentUser.userId}, No vote`
      );
      return;
    } else if (userWroteFeature) {
      console.log(
        `handleVote: User has written the feature, user: ${currentUser.name}, userId: ${currentUser.userId}, No vote`
      );
      return;
    }
      else {
      console.log(
        `handleVote: User has not voted, user: ${currentUser.name}, userId: ${currentUser.userId}, vote valid`
      );
      // Add the user's id to the votes array
      feature.votes.push(currentUser.userId);

      // Update the feature in the currentFeatures array
      const updatedFeatures = currentFeatures.map(
        (f) => (f.id === id ? feature : f)

        //we would send to update api here as well
      );

      // Update the state
      setCurrentFeatures(updatedFeatures);
    }
  };

  return (
    <div className="request-container">
      <div className="current-user-container">
        <select onChange={handleChangeUser}>
          {users.map((user) => (
            <option key={user.userId} value={user.userId}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="request-form">
        <h2>Feature Request Form</h2>
        <form onSubmit={handleRequestSubmit}>
          <TextField
            type="text"
            name="name"
            label="name"
            data-testid="name-entry-field"
            autoComplete="off"
            value={requestFormData.name}
            onChange={handleRequestChange}
          />
          <TextField
            type="text"
            name="description"
            label="description"
            data-testid="description-entry-field"
            autoComplete="off"
            value={requestFormData.description}
            onChange={handleRequestChange}
          />
          <button className="styled-button" type="submit">
            Submit
          </button>
        </form>

        <div className="features-list">
          <h2>Current Requests</h2>
          <ul>
            {currentFeatures.sort((a, b) => b.id - a.id) // Sort features by id
            .map((feature) => (
              <li key={feature.id}>
                <div className="feature-container">
                  <div className="feature-name">
                    <h3>{feature.name}</h3>
                  </div>
                  <div className="feature-userId">
                    <h4>{findUserName(feature.userId)}</h4>
                  </div>
                  <div className="feature-description">
                    <h4>{feature.description}</h4>
                  </div>
                  <div className="feature-votes">
                    <h4>{feature.votes.length}</h4>
                  </div>
                  <div className="feature-vote-button">
                    <button onClick={() => handleVote(feature.id)}>Vote</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Features;
