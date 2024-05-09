import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Feature } from "../../../utils/objects";

function Requests() {
  const [requestFormData, setRequestFormData] = useState({});
  const [nameFormData, setNameFormData] = useState({});
  const [currentRequests, setCurrentRequests] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    console.log("current user: " + currentUser);
  }, [currentUser]);

  const handleRequestChange = (e) => {
    setRequestFormData({
      ...requestFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNameChange = (e) => {
    setNameFormData({
    ...nameFormData,
    [e.target.name]: e.target.value,
    });
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setCurrentUser(nameFormData.username);
    // clear the text field
  

    setNameFormData({ username: "" });

  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    // create a new instance of the Feature class
    const newRequest = new Feature(requestFormData.name, requestFormData.description, 1);
    // add the new request to the currentRequests array
    setCurrentRequests([...currentRequests, newRequest]);

    console.log("new request: " + "name: " + newRequest.name + " description " + newRequest.description);

    //clear the form
    setRequestFormData({
      name: "",
      description: "",
    });
  };

  return (
    <div className="requests-container">
      <div className="current-user-container">
        <form className="username-form" onSubmit={handleNameSubmit}>
          <TextField
            type="text"
            name="username"
            label="username"
            data-testid="current-user-field"
            autoComplete="off"
            value={nameFormData.username}
            onChange={(e) => handleNameChange(e)}
            
          />

          <button className="styled-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="requests-form">
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
      </div>
    </div>
  );
}

export default Requests;
