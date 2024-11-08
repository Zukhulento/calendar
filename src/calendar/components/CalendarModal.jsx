import DatePicker, { registerLocale } from "react-datepicker";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCalendarModal } from "../hooks/useCalendarModal";

registerLocale("es", es);
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
  const {
    formValues,
    isDateModalOpen,
    titleClass,
    onCloseDateModal,
    onSubmit,
    onChangeInput,
    setFormValues,
  } = useCalendarModal();

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseDateModal}
      style={customStyles}
      className={"modal"}
      overlayClassName={"modal-fondo"}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <br />
          <DatePicker
            selected={formValues.start}
            className="form-control"
            onChange={(date) => setFormValues({ ...formValues, start: date })}
            dateFormat={"Pp"}
            locale={"es"}
            timeCaption="Hora"
            showTimeSelect
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
            locale={"es"}
            timeCaption="Hora"
            showTimeSelect
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass} `}
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
