export const getUser = async (user) => {
  try {
    const response = await fetch(`https://api.github.com/users/${user}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getRepos = async (user) => {
  try {
    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
