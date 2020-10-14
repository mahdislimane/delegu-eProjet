import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { add } from "../action/actions";
import firebase from "../Firebase";
import { v4 as uuidv4 } from "uuid";

function OrgList(props) {
  const [chosenDate, setChosenDate] = useState("");
  const [chosenDoc, setChosenDoc] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [keywordspec, setkeywordspec] = useState("");
  const [keywordgov, setkeywordgov] = useState("");
  const [selected, setSelected] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [showsec, setShowsec] = useState(false);
  const handleClosesec = () => setShowsec(false);
  const handleShowsec = () => {
    setShowsec(true);
  };
  const ref = firebase.database().ref("chosenDoctor");
  useEffect(() => {
    setSelected({
      ...selected,
      date: chosenDate,
      visited: "Pas encore",
      work: [],
      achivement: 0,
    });
  }, [chosenDate]);
  let filtred = props.list.filter((el) =>
    el.name.toUpperCase().includes(keyword.toUpperCase())
  );
  let filtredspec = filtred.filter((el) =>
    el.spec.toUpperCase().includes(keywordspec.toUpperCase())
  );
  let filtredgov = filtredspec.filter((el) =>
    el.gov.toUpperCase().includes(keywordgov.toUpperCase())
  );
  const valider = () => {
    let dovVerif = chosenDoc.filter((el) => el.date === chosenDate);
    let docToAdd = dovVerif.find((el) => el.name === selected.name);
    !docToAdd && setChosenDoc(chosenDoc.concat(selected));
    handleClose();
  };
  const validersec = () => {
    props.add(chosenDoc);
    ref.push(chosenDoc);
    handleClosesec();
    setChosenDoc([]);
  };
  return (
    <div className="container-fluid row">
      <h1 className="col-12">Planification</h1>
      <div className="col-12">
        <input
          type="date"
          onChangeCapture={(e) => {
            setChosenDate(e.target.value);
          }}
        />
        <button
          onClick={() => {
            handleShowsec();
          }}
        >
          Valider la planification
        </button>
      </div>
      <div className="col-12"></div>
      <div className="col-1"></div>
      <table className="col-10">
        <tr className="form">
          <th className="tableau">
            Nom
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="search..."
              onChange={(e) => {
                setkeyword(e.target.value);
              }}
            />
          </th>
          <th className="tableau">
            Specialité
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="search..."
              onChange={(e) => {
                setkeywordspec(e.target.value);
              }}
            />
          </th>
          <th className="tableau">
            Adresse
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="search..."
              onChange={(e) => {
                setkeywordgov(e.target.value);
              }}
            />
          </th>
        </tr>
        {filtredgov.map((el) => {
          return (
            <tr
              className="form"
              onClick={() => {
                if (chosenDate === "") {
                  alert("Veuillez choisir une date");
                } else {
                  handleShow();
                  setSelected({
                    ...selected,
                    id: uuidv4(),
                    name: el.name,
                    spec: el.spec,
                    gov: el.gov,
                    medic: [],
                  });
                }
              }}
            >
              <td className="tableau">{el.name}</td>
              <td className="tableau">{el.spec}</td>
              <td className="tableau">{el.gov}</td>
            </tr>
          );
        })}
      </table>
      <div className="col-1"></div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Valider le contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid row">
              <div className="col-12">{selected.name}</div>
              <div className="col-12">{selected.spec}</div>
              <div className="col-12">
                <div>
                  {props.drug
                    .filter((el) => el.name === selected.spec)
                    .map((el) =>
                      el.medic.map((ele, i) => {
                        return (
                          <div>
                            <input
                              type="checkbox"
                              id={i}
                              onClick={(e) => {
                                if (e.target.checked) {
                                  setSelected({
                                    ...selected,
                                    medic: selected.medic.concat(ele),
                                  });
                                } else {
                                  setSelected({
                                    ...selected,
                                    medic: selected.medic.filter(
                                      (x) => ele != x
                                    ),
                                  });
                                }
                              }}
                            />
                            <label htmlFor={i}>{ele}</label>
                          </div>
                        );
                      })
                    )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={valider}>
              Valider
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showsec} onHide={handleClosesec}>
          <Modal.Header closeButton>
            <Modal.Title>Valider le contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="container-fluid row">
              <tr className="form col-12">
                <th className="tableau">Name</th>
                <th className="tableau">Date</th>
                <th className="tableau">Medicamment</th>
              </tr>
              {chosenDoc.map((el) => {
                return (
                  <tr className="form col-12">
                    <td className="col-4 tableau">{el.name} </td>
                    <td className="col-4 tableau"> {el.date} </td>
                    <td className="col-4 tableau">
                      {el.medic && el.medic.map((ele) => <h5>{ele}</h5>)}{" "}
                    </td>
                  </tr>
                );
              })}
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosesec}>
              Close
            </Button>
            <Button variant="primary" onClick={validersec}>
              Valider
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    list: state.DoctorsReducer,
    drug: state.DrugsReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    add: (doctors) => dispatch(add(doctors)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrgList);
