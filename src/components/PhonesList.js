import { useState, useEffect } from "react";
import axios from "axios";

function PhonesList() {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5005/api";

  const [phonesList, setPhones] = useState([]);
  const [onePhone, setOnePhone] = useState({});
  const [display, setDisplay] = useState(false);

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
        setDisplay(true);
        console.log(onePhone);
      })
      .catch((err) => console.log("error to get one detail", err));
  };

  useEffect(() => {
    getPhones();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="MainDiv">
      <div className="ButtonEl">
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
          </ul>
        ))}
      </div>
      {display ? (
        <div className="divInfo">
          <img src={onePhone.imageFileName} alt="phonePicture" />
          <h3>{onePhone.name}</h3>
          <h4>
            <b>Manufacturer:</b> {onePhone.manufacturer}
          </h4>
          <p>
            <b>Description:</b> {onePhone.description}
          </p>
          <p>
            <b>Price:</b> {onePhone.price}
          </p>
          <p>
            <b>Screen:</b> {onePhone.screen}
          </p>
          <p>
            <b>Ram:</b> {onePhone.ram}
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PhonesList;
