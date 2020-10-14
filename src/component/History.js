import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function History(props) {
  const [visited, setvisited] = useState("");
  const [keyword, setkeyword] = useState("");
  const [keywordach, setkeywordach] = useState("");
  const [keywordspec, setkeywordspec] = useState("");
  const [keywordgov, setkeywordgov] = useState("");
  const [date, setdate] = useState("");
  const [selected, setSelected] = useState({
    name: "",
    spec: "",
    gov: "",
    medic: [],
    work: [],
    achivement: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  let filtredAch = props.list.filter((el) => el.achivement >= keywordach);
  let dateFilter = filtredAch.filter((el) => el.date === date);
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
      <h1 className="col-12">Historique</h1>
      <div className="col-12">
        <input
          type="date"
          onChange={(e) => {
            setdate(e.target.value);
          }}
        />
      </div>

      <table className="col-12">
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
          <th className="tableau">
            Objectf
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="search..."
              onChange={(e) => {
                setkeywordach(e.target.value);
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
                  name: el.name,
                  spec: el.spec,
                  gov: el.gov,
                  medic: el.medic,
                  work: el.work,
                  achivement: el.achivement,
                });
              }}
            >
              <td className="tableau">{el.name}</td>
              <td className="tableau">{el.spec}</td>
              <td className="tableau">{el.gov}</td>
              <td className="tableau">
                {el.achivement ? `${el.achivement.toFixed(2)} %` : "0 %"}
              </td>
              <td className="tableau">{el.visited}</td>
            </tr>
          );
        })}
      </table>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Valider le contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid row">
              <h5 style={{ textAlign: "center" }}>{selected.name}</h5>
              <table className="container-fluid row">
                <tr className="form col-12">
                  <th className="tableau">Prévu</th>
                  <th className="tableau">Fait</th>
                </tr>
                <tr className="form col-12">
                  <td className="col-6 tableau">
                    {selected.medic.map((el) => (
                      <h5>{el}</h5>
                    ))}
                  </td>
                  <td className="col-6 tableau">
                    {selected.work.map((el) => (
                      <h5>{el}</h5>
                    ))}
                  </td>
                </tr>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
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

export default connect(mapStateToProps)(History);
