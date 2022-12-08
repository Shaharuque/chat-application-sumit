export const getPartnerInfo = (participants, loggedEmail) => {
  return participants?.find((each) => each?.email !== loggedEmail);
};
