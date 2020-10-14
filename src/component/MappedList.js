import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { update, updateWork, add, verif } from "../action/actions";
import firebase from "../Firebase";

function MappedList(props) {
  const [work, setwork] = useState({
    id: "",
    work: [],
  });
  const [visited, setvisited] = useState("");
  const [keyword, setkeyword] = useState("");
  const [keywordspec, setkeywordspec] = useState("");
  const [keywordgov, setkeywordgov] = useState("");
  const [date, setdate] = useState("");
  const [selected, setSelected] = useState({
    name: "",
    spec: "",
    gov: "",
    medic: [],
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const ref = firebase.database().ref("chosenDoctor");
  useEffect(() => {
    ref.on("value", (data) => {
      let decData = data.val();
      let keys;
      let newData = [];
      decData && (keys = Object.keys(decData));
      keys &&
        keys.map((el) => {
          newData = newData.concat(decData[el]);
          props.add(newData);
        });
      props.verif(newData);
    });
  }, []);
  const fireUpdate = () => {
    ref.on("value", (data) => {
      let decData = data.val();
      let keys;
      let newData = [];
      let keyVal = [];
      decData && (keys = Object.keys(decData));
      keys &&
        keys.map((el) => {
          keyVal.push({ key: el });
          newData.push(decData[el]);
        });

      newData &&
        newData.map((el, i) => {
          el.map((ele, ii) => {
            if (ele.id === selected.id) {
              firebase
                .database()
                .ref(`chosenDoctor/${keyVal[i].key}/${ii}/visited`)
                .set("Visiter");
            }

            if (ele.id === selected.id) {
              let y;
              if ((ele.medic = [])) {
                y = 1;
              } else {
                y = ele.medic.length;
              }
              firebase
                .database()
                .ref(`chosenDoctor/${keyVal[i].key}/${ii}/achivement`)
                .set((work.work.length / y) * 100);
            }
            if (ele.id === selected.id) {
              firebase
                .database()
                .ref(`chosenDoctor/${keyVal[i].key}/${ii}/work`)
                .set(work.work);
            }
          });
        });
    });
  };

  const valider = () => {
    handleClose();
    props.update(selected.id);
    props.updateWork(work);
    fireUpdate();
    setwork({ id: "", work: [] });
    setSelected({
      id: "",
      name: "",
      spec: "",
      gov: "",
      medic: [],
    });
  };
  let dateFilter = props.list.filter((el) => el.date === date);
  let filtredspec = dateFilter.filter((el) =>
    el.spec.toUpperCase().includes(keywordspec.toUpperCase())
  );
  let filtredgov = filtredspec.filter((el) =>
    el.gov.toUpperCase().includes(keywordgov.toUpperCase())
  );
  let filtred = filtredgov.filter((el) =>
    el.name.toUpperCase().includes(keyword.toUpperCase())
  );
  let filtredvisit = filtred.filter((el) =>
    el.visited.toUpperCase().includes(visited.toUpperCase())
  );
  return (
    <div className="container-fluid row">
      <h1 className="col-12">Tableau de bord</h1>
      <div className="col-12">
        <input
          type="date"
          onChange={(e) => {
            setdate(e.target.value);
          }}
        />
      </div>
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
          <th className="tableau" style={{ overflow: "visible" }}>
            <DropdownButton
              id="dropdown-basic-button"
              title={visited ? visited : "Tout"}
            >
              <Dropdown.Item onClick={() => setvisited("Visiter")}>
                Visiter
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setvisited("Pas encore")}>
                Reste à visiter
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setvisited("")}>Tout</Dropdown.Item>
            </DropdownButton>
          </th>
        </tr>

        {filtredvisit.map((el) => {
          return (
            <tr
              className="form"
              onClick={() => {
                handleShow();
                setSelected({
                  id: el.id,
                  name: el.name,
                  spec: el.spec,
                  gov: el.gov,
                  medic: el.medic,
                });
              }}
            >
              <td className="tableau">{el.name}</td>
              <td className="tableau">{el.spec}</td>
              <td className="tableau">{el.gov}</td>
              <td className="tableau">{el.visited}</td>
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
              <div className="col-4">Name: </div>
              <div className="col-8">{selected.name}</div>
              <div className="col-4">spécialité </div>
              <div className="col-8">{selected.spec}</div>
              <div className="col-4">Adresse </div>
              <div className="col-8">{selected.gov}</div>
              <div className="col-4">Medicamment </div>
              <div className="col-8">
                {selected.medic &&
                  selected.medic.map((el, i) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          id={i}
                          onClick={() =>
                            setwork({
                              ...work,
                              id: selected.id,
                              work: work.work.concat(el),
                            })
                          }
                        />
                        <label htmlFor={i}>{el}</label>
                      </div>
                    );
                  })}
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
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    list: state.ChosenReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    add: (doctors) => dispatch(add(doctors)),
    update: (doctors) => dispatch(update(doctors)),
    updateWork: (doctors) => dispatch(updateWork(doctors)),
    verif: (doctors) => dispatch(verif(doctors)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MappedList);
