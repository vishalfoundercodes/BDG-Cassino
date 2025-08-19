import { useEffect } from "react";

const FirstDepositModalReset = () => {
  useEffect(() => {
    const setDepositModal = () => {
      localStorage.setItem("firstDepositModalValue", "0");
      localStorage.setItem("lastResetDate", new Date().toDateString());
      console.log("Deposit modal reset at 5:10 PM IST");
    };
    const scheduleReset = () => {

      const now = new Date();
      const resetTime = new Date();
      resetTime.setHours(0, 0, 0, 0);

      if (now > resetTime) {
        resetTime.setDate(resetTime.getDate() + 1);
      }
      const timeUntilReset = resetTime - now;
      const resetTimeout = setTimeout(() => {
        setDepositModal();
        scheduleReset
          ()
      }, timeUntilReset);
      return resetTimeout
    }
    const lastResetDate = localStorage.getItem("lastResetDate");
    const today = new Date().toDateString();
    if (lastResetDate !== today) {
      setDepositModal();
    }
    const timeoutId = scheduleReset();
    return () => clearTimeout(timeoutId);

  }, []);
};

export default FirstDepositModalReset;

