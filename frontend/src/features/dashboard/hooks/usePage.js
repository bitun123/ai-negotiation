import { useContext } from "react";
import { createGame, makeOffer, getGameState } from "../services/api";
import { PageContext } from "../state/PageProvider";

export const usePage = () => {
  const {
    product,
    setproduct,
    loading,
    setloading,
    error,
    seterror,
    message,
    setmessage,
  } = useContext(PageContext);

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

  const handleMakeOffer = async (gameId, offer) => {
    try {
      setloading(true);
      const response = await makeOffer(gameId, offer);
     setmessage((prev) => [...prev, response.data]);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };



  return { product, loading, error, createNewGame, handleMakeOffer };
};
