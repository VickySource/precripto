import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const currency = '$'
  
  const calculateAge=(dob)=>{
    const today = new Date()
    const birthDate = new Date(dob)

    let age = today.getFullYear()-birthDate.getFullYear()
    return age
  }

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const value = {
    calculateAge,
    slotDateFormat,
    currency
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
// This file creates a context for the application, allowing components to share state and functions.
// The `AppContextProvider` component wraps its children with the `AppContext.Provider`, providing a context value that can be accessed by any child component.
// This is useful for managing global state or functions that need to be accessed by multiple components in the application.
