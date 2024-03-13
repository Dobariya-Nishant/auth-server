import { asyncHandler } from "../../../helpers/asyncHandler";
import { getJoke } from "../services/joke.service";

const getJokeController = asyncHandler(async (req, res) => {
  const joke = await getJoke();

  if (!joke) {
    throw new Error("Something wentwrong with joke API");
  }

  return res.status(200).send({ joke });
});

export { getJokeController };
