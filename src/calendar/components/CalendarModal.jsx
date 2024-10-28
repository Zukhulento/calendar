import { addHours } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
export const CalendarModal = () => {
  const [modalIsOpen, setIsOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    title: "Event",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });
  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
  };
  const onCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className={"modal"}
      overlayClassName={"modal-fondo"}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <br />
          <DatePicker
            selected={formValues.start}
            className="form-control"
            onChange={(date) => setFormValues({ ...formValues, start: date })}
            dateFormat={"Pp"}
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <br />
          <DatePicker
            minDate={formValues.start}
            selected={formValues.start}
            className="form-control"
            onChange={(date) => setFormValues({ ...formValues, end: date })}
            dateFormat={"Pp"}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            value={formValues.title}
            onChange={onChangeInput}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onChangeInput}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
