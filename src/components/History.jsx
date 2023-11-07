import React, { useState, useEffect } from "react";
import "../App.css";
import {
  getDocs,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../Firebase.jsx";
import Cookies from "universal-cookie";

// import "./src/App.css"
const cookies = new Cookies();

export const History = () => {
  const historyRef = collection(db, "history");
  const [finalHistory, setFinalHistory] = useState([]);

  useEffect(() => {
    function fetchHistory() {
      const queryHistory = query(
        historyRef,
        orderBy("createdAt"),
        where("email", "==", cookies.get("auth-email").toString())
      );

      onSnapshot(queryHistory, (snapshot) => {
        let finalHistory = [];
        snapshot.docs.forEach((doc) => {
          finalHistory.push(doc.data());
        });
        setFinalHistory(finalHistory);
      });
    }
    fetchHistory();
  }, []);

  return (
    <div>
      {finalHistory ? (
        <div className="history-container">
          {finalHistory.map((finalHistory) => (
            <div className="history-area">
              🟢{finalHistory.user} {finalHistory.email} {finalHistory.room}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
