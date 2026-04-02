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
    gameinformation,
    setgameinformation,
  } = useContext(PageContext);

  const createNewGame = async (selectedProduct, selectedDifficulty) => {
    try {
      setloading(true);

      seterror("");
      setmessage([]);
      setgameinformation(null);
      const response = await createGame(selectedProduct, selectedDifficulty);

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
      const { discount, finalPrice, status, currentRound } = response.data;

      setgameinformation((prev) => ({
        ...prev,
        discount,
        finalPrice,
        status,
        currentRound,
      }));

      const aiMsg = {
        text: response.data.aiResponse,
        side: "left",
        id: Date.now() + 1,
      };

      setmessage((prev) => [...prev, aiMsg]);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };


  

  return {
    product,
    loading,
    error,
    createNewGame,
    handleMakeOffer,
    id,
    setid,
    message,
    setmessage,
    gameinformation,
    setgameinformation,
  };
};
