import React, { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Feature } from "../utils/objects";
import { getAllFeatures, getAllUsers, postFeature } from "./featuresApi";
import { User } from "../utils/objects";
import styles from "../features/Features.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsers,
  setCurrentUser,
  setCurrentFeatures,
  updateFeatureVote,
} from "../features/featuresSlice"; // Import your slices
import { findUserName } from "../utils/functions";

function Features() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.currentUser);
  const currentFeatures = useSelector((state) => state.currentFeatures);
  const [requestFormData, setRequestFormData] = useState({});
  const [featureClass, setFeatureClass] = useState(styles.featureHidden);
  const [featureDescriptionView, setFeatureDescriptionView] = useState(false);
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  const [usersLoading, setUsersLoading] = useState(true);
  const [featuresLoading, setFeaturesLoading] = useState(true);

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
    if (users && users.length > 0 && !currentUser.userId) {
      const firstUser = new User(users[0].name);
      firstUser.userId = users[0].userId;
      dispatch(setCurrentUser(firstUser));
    }
  }, [users, dispatch, currentUser.userId]);

  useEffect(() => {
    // Set loading to false when users data is available and current features are available
    if (users.length > 0 ) {
      setUsersLoading(false);
    }

  }, [users]);

  useEffect(() => {
    // Set loading to false when users data is available and current features are available
    if (currentFeatures.length > 0) {
      setFeaturesLoading(false);
    }
  }, [currentFeatures]);

  const fetchAllFeatures = async () => {
    const features = await getAllFeatures();
    if (features.status === 200) {
      console.log("fetchAllFeatures: ", features.data);
      dispatch(setCurrentFeatures(features.data));
    }
  };

  const fetchAllUsers = async () => {
    const users = await getAllUsers();
    if (users.status === 200) {
      //console.log("fetchAllUsers: ", users.data);
      dispatch(setUsers(users.data));
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
    //prevent enter key from submitting the form
    if (e.keyCode === 13) {
      return;
    }

    setRequestFormData({
      ...requestFormData,
      [e.target.name]: e.target.value,
    });
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
    dispatch(setCurrentFeatures([newRequest, ...currentFeatures]));

    //clear the form
    setRequestFormData({
      name: "",
      description: "",
    });
  };

  const handleVote = (id) => {
    console.log("handleVote: ", id);

    // Find the feature that matches the id
  const featureIndex = currentFeatures.findIndex((f) => f.id === id);
  if (featureIndex === -1) {
    console.error("Feature not found");
    return;
  }

  const feature = { ...currentFeatures[featureIndex] };

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
    } else {
      console.log(
        `handleVote: User has not voted, user: ${currentUser.name}, userId: ${currentUser.userId}, vote valid`
      );
      
  // Create a new feature object with a properly initialized votes array
  const updatedFeature = {
    ...feature,
    votes: feature.votes ? [...feature.votes] : [],
  };

  // Add the user's id to the votes array
  updatedFeature.votes.push(currentUser.userId);

  // Update the feature in the currentFeatures array
  const updatedFeatures = [
    ...currentFeatures.slice(0, featureIndex),
    updatedFeature,
    ...currentFeatures.slice(featureIndex + 1),
  ];

  // Update the state
  dispatch(setCurrentFeatures(updatedFeatures));
    }
  };

  const handleAboutClick = (id) => {
    setSelectedFeatureId(id);

    if (featureClass === styles.feature) {
      setFeatureClass(styles.featureHidden);
      setFeatureDescriptionView(styles.featureDescriptionHidden);
    } else {
      setFeatureClass(styles.feature);
      setFeatureDescriptionView(styles.featureDescriptionShow);
    }
  };

  return (
    <div className={styles.requestContainer}>
      {/* Render loading indicator while users data is being fetched */}
      {usersLoading ? (
        <div>Loading...</div>
      ) : (
        <>

          <div className={styles.requestFormContainer}>
            <h2>Feature Request Form</h2>
            <form className={styles.requestForm} onSubmit={handleRequestSubmit}>
              <div className={styles.requestFormFields}>
                <InputGroup>
                  <InputLeftAddon>Name</InputLeftAddon>
                  <Input
                    className={styles.nameEntryField}
                    placeholder="name"
                    type="text"
                    name="name"
                    color="white"
                    required={true}
                    variant="outline"
                    data-testid="name-entry-field"
                    autoComplete="off"
                    value={requestFormData.name}
                    onChange={handleRequestChange}
                  />
                </InputGroup>
                <InputGroup className={styles.descriptionEntryField}>
                  <InputLeftAddon>Description</InputLeftAddon>

                  <Textarea
                    placeholder="description "
                    type="text"
                    name="description"
                    required={true}
                    size="lg"
                    color="white"
                    data-testid="description-entry-field"
                    autoComplete="off"
                    value={requestFormData.description}
                    onChange={handleRequestChange}
                  />
                </InputGroup>
              </div>

              <div className={styles.requestFormButtons}>
                <Button
                  colorScheme="blue"
                  className={styles.basicButton}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>

          {/* Render loading indicator while features data is being fetched */}
          {featuresLoading ? (
            <div>Loading...</div>
          ) : (

          <div className={styles.featuresListContainer}>
            <ul className={styles.featuresList}>
              {currentFeatures
              //toSort causing error as mutates the original array
                .toSorted((a, b) => b.id - a.id) // Sort features by id
                .map((feature) => (
                  <li key={feature.id}>
                    <div
                      className={
                        feature.id === selectedFeatureId
                          ? featureClass
                          : styles.featureHidden
                      }
                    >
                      <div className={styles.featureName}>
                        <h3>{feature.name}</h3>
                      </div>
                      <div className={styles.featureUserId}>
                        <h4>{findUserName(feature.userId, users)}</h4>
                      </div>
                      <div
                        className={
                          feature.id === selectedFeatureId
                            ? featureDescriptionView
                            : styles.featureDescriptionHidden
                        }
                      >
                        <h4>{feature.description}</h4>
                      </div>
                      <div className={styles.featureVotes}>
                        <h4>Votes: {feature.votes.length}</h4>
                      </div>
                      <div className={styles.featureButtons}>
                        <Button
                          colorScheme="teal"
                          className={styles.featureButton}
                          onClick={() => handleAboutClick(feature.id)}
                        >
                          About
                        </Button>
                        <Button
                          colorScheme="yellow"
                          className={styles.featureButton}
                          onClick={() => handleVote(feature.id)}
                        >
                          Vote
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          
          )}
        </>
      )}
    </div>
  );
}

export default Features;
