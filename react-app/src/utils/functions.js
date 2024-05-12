export const findUserName = (userId, users) => {
    const user = users.find((user) => user.userId === userId);
    return user.name;
  };