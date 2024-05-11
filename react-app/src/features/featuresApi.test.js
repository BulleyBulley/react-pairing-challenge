import { getAllFeatures, getAllUsers, postFeature } from './featuresApi.js';

//getAllFeatures function is an asynchronous function that returns a promise. The promise is resolved after a delay of 1 second (1000 milliseconds) with the stubFeatures data. The stubFeatures data is imported from the stubFeatures file, which contains an array of feature objects.
describe('getAllFeatures returns with status 200', () => {
    it('should return with status 200', async () => {
        const response = await getAllFeatures();
        expect(response.status).toBe(200);
    });
    it('should return with an array data', async () => {
        const response = await getAllFeatures();
        expect(response.data).toBeDefined();
        expect(response.data.length).toBeGreaterThan(0);
        expect(Array.isArray(response.data)).toBe(true);
    });
    it('data should match expected', async () => {
        const response = await getAllFeatures();
        expect(response.data).toEqual([
            {
                name: "Make it louder",
                description:
                    "It's too quiet, turn everything up, also why is everything always red?",
                userId: "1",
                id: "1",
                votes: [],
            },
            {
                name: "Install Ableton",
                description: "I want to run Ableton on this thing",
                userId: "1",
                id: "2",
                votes: [],
            },
            {
                name: "Head tracked auto mute",
                description:
                    "I want to look at whoever is talking and have other speakers ducked",
                id: "3",
                userId: "2",
                votes: ["1"],
            },
        ]);
    });
    
});

//getAllUsers function is an asynchronous function that returns a promise. The promise is resolved after a delay of 1 second (1000 milliseconds) with the stubUsers data. The stubUsers data is imported from the stubUsers file, which contains an array of user objects.
describe('getAllUsers returns with status 200', () => {
    it('should return with status 200', async () => {
        const response = await getAllUsers();
        expect(response.status).toBe(200);
    });
    it('should return with an array data', async () => {
        const response = await getAllUsers();
        expect(response.data).toBeDefined();
        expect(response.data.length).toBeGreaterThan(0);
        expect(Array.isArray(response.data)).toBe(true);
    });
    it('data should match expected', async () => {
        const response = await getAllUsers();
        expect(response.data).toEqual([
            {
                name: "Rod",
                userId: "1",
            },
            {
                name: "Jane",
                userId: "2",
            },
            {
                name: "Freddy",
                userId: "3",
            },
        ]);
    });
});

//postFeature function is an asynchronous function that returns a promise. The promise is resolved after a delay of 1 second (1000 milliseconds) with a response object containing a status of 201 and an id. The id is incremented each time the function is called to mimic the behavior of a database incrementing ids.
describe('postFeature returns with status 201 and id', () => {
    it('should return with status 201 and an id', async () => {
        const feature = {
            name: "New Feature",
            description: "This is a new feature",
            userId: "1",
        };
        const response = await postFeature(feature);
        expect(response.status).toBe(201);
        expect(response.id).toBeDefined();
    });
    it('id should be incremented', async () => {
        const feature1 = {
            name: "New Feature 1",
            description: "This is a new feature 1",
            userId: "1",
        };
        const feature2 = {
            name: "New Feature 2",
            description: "This is a new feature 2",
            userId: "1",
        };
        const response1 = await postFeature(feature1);
        const response2 = await postFeature(feature2);
        expect(response2.id).toBe(response1.id + 1);
    });
});