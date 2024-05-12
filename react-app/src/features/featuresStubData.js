// make a json called stubUsers
// export it

export const stubUsers = {
  status: 200,
  data: [
    {
      name: "John",
      userId: "1",
    },
    {
      name: "Paul",
      userId: "2",
    },
    {
      name: "George",
      userId: "3",
    },
    {
        name: "Ringo",
        userId: "4",
    }
  ],
};

export const stubFeatures = {
  status: 200,
  data: [
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
  ],
};
