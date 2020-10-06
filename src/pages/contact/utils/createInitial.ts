export default (firstName: string, lastName: string) => {
  try {
    const initial = [];
    if (firstName.length) {
      initial.push(firstName[0]);
    }

    if (lastName.length) {
      initial.push(lastName[0]);
    }

    return initial.join("").toUpperCase();
  } catch (error) {
    return "";
  }
};
