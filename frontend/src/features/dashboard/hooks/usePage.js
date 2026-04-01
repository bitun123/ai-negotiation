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
    id,
    setid,
  } = useContext(PageContext);

  const createNewGame = async (selectedProduct, selectedDifficulty) => {
    try {
      setloading(true);
      seterror("");
      const response = await createGame(selectedProduct, selectedDifficulty);
      console.log(response);
      setproduct(response.data);
      setid(response.data.id);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };

  const handleMakeOffer = async (gameId, offer, userMessage) => {
    try {
      setloading(true);
      const response = await makeOffer(gameId, offer, userMessage);
      setmessage((prev) => [...prev, response.data]);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };

  return { product, loading, error, createNewGame, handleMakeOffer  , id, setid ,message};
};
