import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useCalendarStore, useUiStore } from "../../hooks";

export const useCalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent } = useCalendarStore();
  const [formSubmited, setFormSubmited] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  // El valor de titleClass se modificará sólo si
  // formSubmited o formValues.title cambian
  const titleClass = useMemo(() => {
    if (!formSubmited) return "";
    return formValues.title.length <= 0 && "is-invalid";
  }, [formValues.title, formSubmited]);

  useEffect(() => {
    if (activeEvent != null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onCloseDateModal = () => {
    closeDateModal();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmited(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference))
      return Swal.fire(
        "Fechas incorrectas",
        "Las fechas no son del formato correcto",
        "error"
      );
    if (difference <= 0)
      return Swal.fire(
        "Fechas incorrectas",
        "La fecha fin debe ser mayor a la fecha de inicio",
        "error"
      );
    if (formValues.title.length <= 0)
      return Swal.fire(
        "Error de validación",
        "El titulo es obligatorio",
        "error"
      );

    // Caso positivo
    console.log(formValues);

    // TODO
    // Limpieza
    // Grabar en base de datos
  };
  return {
    isDateModalOpen,
    formValues,
    titleClass,
    setFormValues,
    onChangeInput,
    onCloseDateModal,
    onSubmit,
  };
};
