import React, { useRef, useState, useEffect } from "react";
import requestsData from "../../requests.json";
import axios from "axios";
import BillingLimit from "./BillingLimit";

const InvoiceRegistration = () => {
  const fieldsRefs = {
    invoiceNumber: useRef(null),
    invoiceValue: useRef(null),
    company: useRef(null),
    competenceMonth: useRef(null),
    cashMonth: useRef(null),
    service: useRef(null),
  };

  const [invoiceValue, setInvoiceValue] = useState(0);
  const [totalInvoiceValue, setTotalInvoiceValue] = useState(0);
  const [competenceMonth, setCompetenceMonth] = useState([]);
  const [cashMonth, setCashMonth] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [invoiceData, setInvoiceData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/invoices");
        const invoices = response.data;

        const totalValue = invoices.reduce(
          (accumulator, invoice) =>
            accumulator + parseInt(invoice.invoiceValue),
          0
        );
        setTotalInvoiceValue(totalValue);
      } catch (error) {
        console.log("Erro ao obter dados das notas fiscais:", error);
      }
    };

    fetchInvoiceData();
  }, [invoiceData]);

  useEffect(() => {
    const loadedCompetenceMonth = requestsData.requests.competenceMonth.map(
      (competenceMonth) => competenceMonth.nome
    );
    const loadedCashMonth = requestsData.requests.cashMonth.map(
      (cashMonth) => cashMonth.nome
    );
    setCompetenceMonth(loadedCompetenceMonth);
    setCashMonth(loadedCashMonth);
  }, []);

  useEffect(() => {
    const handleInputChange = () => {
      const areFieldsFilled = Object.values(fieldsRefs).every(
        (ref) => ref.current.value !== ""
      );
      setIsButtonDisabled(!areFieldsFilled);
    };

    Object.values(fieldsRefs).forEach((ref) => {
      ref.current.addEventListener("input", handleInputChange);
      ref.current.addEventListener("change", handleInputChange);
    });

    return () => {
      Object.values(fieldsRefs).forEach((ref) => {
        ref.current.removeEventListener("input", handleInputChange);
        ref.current.removeEventListener("change", handleInputChange);
      });
    };
  }, []);

  const handleInvoiceRegistration = async (event) => {
    event.preventDefault();

    const invoiceData = Object.entries(fieldsRefs).reduce(
      (data, [key, ref]) => {
        data[key] = ref.current.value;
        ref.current.value = "";
        return data;
      },
      {}
    );

    try {
      const response = await axios.post(
        "http://localhost:3000/invoices",
        invoiceData
      );
      const newInvoice = response.data;
      setInvoiceValue(invoiceData.invoiceValue);

      setInvoiceData((prevData) => [...prevData, newInvoice]);

      setSuccessMessage("Nota fiscal registrada com sucesso!");
    } catch (error) {
      console.log("Erro ao registrar nota fiscal:", error);
    }

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="invoice-registration">
      {successMessage && (
        <div className={"success-message"}>{successMessage}</div>
      )}
      <h1>Cadastro de Notas Fiscais</h1>
      <form
        className="invoice-registration__form"
        onSubmit={handleInvoiceRegistration}
      >
        <div className="invoice-registration__form-field">
          <label
            className="invoice-registration__form-label"
            htmlFor="invoiceNumber"
          >
            Número da nota:
          </label>
          <input
            className="invoice-registration__form-input"
            id="invoiceNumber"
            ref={fieldsRefs.invoiceNumber}
            type="number"
          />
        </div>

        <div className="invoice-registration__form-field">
          <label
            className="invoice-registration__form-label"
            htmlFor="invoiceValue"
          >
            Valor da nota:
          </label>
          <input
            className="invoice-registration__form-input"
            id="invoiceValue"
            ref={fieldsRefs.invoiceValue}
            type="number"
          />
        </div>

        <div className="invoice-registration__form-field">
          <label
            className="invoice-registration__form-label"
            htmlFor="company"
          >
            Empresa:
          </label>
          <input
            className="invoice-registration__form-select"
            id="company"
            ref={fieldsRefs.company}
            type="text"
          ></input>
        </div>

        <div className="invoice-registration__form-field">
          <label
            className="invoice-registration__form-label"
            htmlFor="competenceMonth"
          >
            Mês de competência:
          </label>
          <select
            className="invoice-registration__form-input"
            id="competenceMonth"
            ref={fieldsRefs.competenceMonth}
          >
            <option value="">Selecione o Mês de Competência</option>
            {competenceMonth.map((competenceMonth, index) => (
              <option key={index} value={competenceMonth}>
                {competenceMonth}
              </option>
            ))}
          </select>
        </div>

        <div className="invoice-registration__form-field">
          <label
            htmlFor="cashMonth"
            className="invoice-registration__form-label"
          >
            Mês de caixa:
          </label>
          <select
            id="cashMonth"
            className="invoice-registration__form-input"
            ref={fieldsRefs.cashMonth}
          >
            <option value="">Selecione o Mês de Caixa</option>
            {cashMonth.map((cashMonth, index) => (
              <option key={index} value={cashMonth}>
                {cashMonth}
              </option>
            ))}
          </select>
        </div>

        <div className="invoice-registration__form-field">
          <label
            htmlFor="service"
            className="invoice-registration__form-label"
          >
            Serviço prestado:
          </label>
          <input
            type="text"
            id="service"
            className="invoice-registration__form-input"
            ref={fieldsRefs.service}
          ></input>
        </div>

        <button
          type="submit"
          className="invoice-registration__form-button"
          disabled={isButtonDisabled}
        >
          Registrar Nota Fiscal
        </button>
      </form>

      <div className="invoice-registration__overview">
        <h2 className="invoice-registration__overview-title">
          Resumo de Despesas:
        </h2>
        <BillingLimit invoiceValue={totalInvoiceValue} />
      </div>
    </div>
  );
};

export default InvoiceRegistration;
