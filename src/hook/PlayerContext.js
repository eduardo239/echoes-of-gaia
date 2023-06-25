import React, { createContext, useState } from "react";

const PlayerContext = createContext();

function PlayerContextProvider({ children }) {
  const [character, setCharacter] = useState(null);

  return (
    <PlayerContext.Provider value={{ character, setCharacter }}>
      {children}
    </PlayerContext.Provider>
  );
}

export { PlayerContextProvider, PlayerContext };
