export const getSender = (field, loggedInUser, members) => {
    return members[0]?._id === loggedInUser?._id
      ? members[1][field]
      : members[0][field];
  };