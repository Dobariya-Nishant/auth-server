import axios from "axios";

async function getJoke() {
  const response = await axios.get("https://api.chucknorris.io/jokes/random");
  return response.data.value as string;
}

export { getJoke };
