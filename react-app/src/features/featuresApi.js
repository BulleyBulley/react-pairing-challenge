import axios from 'axios';
import { stubFeatures, stubUsers } from '../features/featuresStubData.js';

var idIncrementer = 3;


export const getAllFeatures = async () => {
     // Simulate a delay to mimic the network request
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay of 1 second (1000 milliseconds)
  
  // Return the stub data
  return stubFeatures;
  };

export const getAllUsers = async () => {
    // Simulate a delay to mimic the network request
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay of 1 second (1000 milliseconds)
  
    // Return the stub data
    return stubUsers;
}

export const postFeature = async (feature) => {
    // Simulate a delay to mimic the network request
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay of 1 second (1000 milliseconds)
    //return a response with a status of 201 and an id
    //mimic the incrementing of the id from the database
    idIncrementer++;
    return { status: 201, id: idIncrementer };
    
}

export const updateFeature = async (feature) => {
    // Simulate a delay to mimic the network request
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay of 1 second (1000 milliseconds)
    console.log("Feature updated", feature);
    return { status: 200 };
    
} 