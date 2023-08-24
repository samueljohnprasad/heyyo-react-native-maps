// import React, { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext();
// export const sockety = io("http://localhost:3000");

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState();

//   useEffect(() => {
//     setSocket(sockety);
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => {
//   return useContext(SocketContext);
// };
