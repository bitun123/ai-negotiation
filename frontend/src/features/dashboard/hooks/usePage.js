import { useContext } from "react";
import { createGame, makeOffer, getGameState } from "../services/api";
import { PageContext } from "../state/PageProvider";

export const usePage = () => {
  const { product, setproduct, loading, setloading, error, seterror } =
    useContext(PageContext);

  const createNewGame = async () => {
    try {
      setloading(true);
      seterror("");
      const response = await createGame();
      setproduct(response.data);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };

  return { product, loading, error, createNewGame };
};
