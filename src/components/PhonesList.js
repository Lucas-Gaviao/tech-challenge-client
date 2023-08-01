import { useState, useEffect } from "react";
import axios from "axios";

function PhonesList() {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5005/api";

  const [phonesList, setPhones] = useState([]);
  const [onePhone, setOnePhone] = useState({});

  const getPhones = () => {
    axios
      .get(`${apiUrl}/phones`)
      .then((listOfPhones) => {
        setPhones(listOfPhones.data);
        console.log(listOfPhones);
      })
      .catch((e) => console.log(e, "error to get list"));
  };

  const handleClick = (phoneId, e) => {
    e.preventDefault();

    axios
      .get(`${apiUrl}/phones/${phoneId}`)
      .then((response) => {
        setOnePhone(response.data);
        console.log(onePhone);
      })
      .catch((err) => console.log("error to get one detail", err));
  };

  useEffect(() => {
    getPhones();
  }, []);

  return (
    <div>
      {phonesList.map((element, i) => (
        <ul key={i}>
          <li>
            <button
              onClick={(e) => {
                handleClick(element._id, e);
              }}
            >
              {element.name}
            </button>
          </li>
          <li>{element._id}</li>
        </ul>
      ))}
      <>
        <ul>
          <li>{onePhone.manufacturer}</li>
        </ul>
      </>
    </div>
  );
}

export default PhonesList;
