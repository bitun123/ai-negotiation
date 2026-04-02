import { useContext } from "react";
import { createGame, makeOffer, getGameState, getActiveGame } from "../services/api";
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
      const { aiResponse, discount, finalPrice, status, currentRound } = response.data.data;

      setgameinformation((prev) => ({
        ...prev,
        discount,
        finalPrice,
        status,
        currentRound,
      }));

      const aiMsg = {
        text: aiResponse,
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

  const getCurrentGameState = async (gameId) => {
    try {
      setloading(true);
      const response = await getGameState(gameId);
      const game = response.data;

      setproduct({
        id: game.gameId,
        product: game.product,
        initialPrice: game.initialPrice,
      });
      setid(game.gameId);
      setmessage(
        (game.rounds || []).flatMap((round) => [
          {
            id: `user-${game.gameId}-${round.round}`,
            side: "right",
            text: `Offer: ${round.userOffer}`,
          },
          {
            id: `ai-${game.gameId}-${round.round}`,
            side: "left",
            text: round.aiResponse,
          },
        ]),
      );
      setgameinformation({
        status: game.status,
        finalPrice: game.finalPrice,
        currentRound: game.rounds?.length || 0,
      });
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };

  const hydrateActiveGame = async () => {
    try {
      setloading(true);
      const response = await getActiveGame();

      console.log(response)
      const game = response.data;

      setproduct({
        id: game.gameId,
        product: game.product,
        initialPrice: game.initialPrice,
      });
      setid(game.gameId);
      setmessage(
        (game.rounds || []).flatMap((round) => [
          {
            id: `user-${game.gameId}-${round.round}`,
            side: "right",
            test : `Offer: ${round.you}`,
          },
          {
            id: `ai-${game.gameId}-${round.round}`,
            side: "left",
            text: round.aiResponse,
          },
        ]),
      );
      setgameinformation({
        status: game.status,
        finalPrice: game.finalPrice,
        currentRound: game.rounds?.length || 0,
      });
    } catch (error) {
      if (error?.response?.status !== 404) {
        seterror(error.message);
      }
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
    getCurrentGameState,
    hydrateActiveGame,
    id,
    setid,
    message,
    setmessage,
    gameinformation,
  };
};
