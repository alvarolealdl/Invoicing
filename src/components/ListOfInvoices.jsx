import React, { useState, useEffect } from "react";
import requestsData from "../../requests.json";

const ListOfInvoices = ({
  invoiceData,
  onDelete,
  onEdit,
  onSave,
  editInvoiceId,
}) => {
  const [editedInvoiceData, setEditedInvoiceData] = useState({});
  const [competenceMonth, setCompetenceMonth] = useState([]);
  const [cashMonth, setCashMonth] = useState([]);

  const handleEditFieldChange = (invoiceId, field, value) => {
    setEditedInvoiceData((prevState) => ({
      ...prevState,
      [invoiceId]: {
        ...prevState[invoiceId],
        [field]: value,
      },
    }));
  };

  const renderEditFields = (invoiceId) => {
    const invoice = invoiceData.find((invoice) => invoice.id === invoiceId);

    if (!invoice) {
      return null;
    }

    const invoiceFields = editedInvoiceData[invoiceId] || {};

   

    return (
      <>
        <input
          type="number"
          value={
            invoiceFields.invoiceNumber === undefined
              ? invoice.invoiceNumber
              : invoiceFields.invoiceNumber
          }
          onChange={(e) =>
            handleEditFieldChange(invoiceId, "invoiceNumber", e.target.value)
          }
        />
        <input
          type="number"
          value={
            invoiceFields.invoiceValue === undefined
              ? invoice.invoiceValue
              : invoiceFields.invoiceValue
          }
          onChange={(e) =>
            handleEditFieldChange(invoiceId, "invoiceValue", e.target.value)
          }
        />
        <input
          type="text"
          value={
            invoiceFields.company === undefined
              ? invoice.company
              : invoiceFields.company
          }
          onChange={(e) =>
            handleEditFieldChange(invoiceId, "company", e.target.value)
          }
        />
        <select
          value={
            invoiceFields.competenceMonth === undefined
              ? invoice.competenceMonth
              : invoiceFields.competenceMonth
          }
          onChange={(e) =>
            handleEditFieldChange(invoiceId, "competenceMonth", e.target.value)
          }
        >
          <option value="" disabled>Selecione o Mês de Competência</option>
          {competenceMonth.map((competenceMonth, index) => (
            <option key={index} value={competenceMonth}>
              {competenceMonth}
            </option>
          ))}
        </select>
        <select
          value={
            invoiceFields.cashMonth === undefined
              ? invoice.cashMonth
              : invoiceFields.cashMonth
          }
          onChange={(e) =>
            handleEditFieldChange(invoiceId, "cashMonth", e.target.value)
          }
        >
          <option value="" disabled>Selecione o Mês de Caixa</option>
          {cashMonth.map((cashMonth, index) => (
            <option key={index} value={cashMonth}>
              {cashMonth}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={
            invoiceFields.service === undefined
              ? invoice.service
              : invoiceFields.service
          }
          onChange={(e) =>
            handleEditFieldChange(invoiceId, "service", e.target.value)
          }
        />
      </>
    );
  };

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

  return (
    <div className="list-of-invoices">
      <h2>Lista de Notas Fiscais</h2>
      <ul className="invoice-list">
        {invoiceData.map((invoice) => (
          <li key={invoice.id} className="invoice-list__item">
            <div>
              <strong>Número da Nota:</strong> {invoice.invoiceNumber}
            </div>
            <div>
              <strong>Valor da Nota:</strong> R${invoice.invoiceValue}
            </div>
            <div>
              <strong>Empresa:</strong> {invoice.company}
            </div>
            <div>
              <strong>Mês de Competência:</strong> {invoice.competenceMonth}
            </div>
            <div>
              <strong>Mês de Caixa:</strong> {invoice.cashMonth}
            </div>
            <div>
              <strong>Serviço Prestado:</strong> {invoice.service}
            </div>
            <div className="invoice-list__actions">
              {editInvoiceId === invoice.id ? (
                <>
                  {renderEditFields(invoice.id)}
                  <button
                    className="invoice-list__bnt-submit"
                    onClick={() =>
                      onSave(invoice.id, editedInvoiceData[invoice.id])
                    }
                  >
                    Salvar
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="invoice-list__bnt-submit"
                    onClick={() => onEdit(invoice.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="invoice-list__bnt-delete"
                    onClick={() => onDelete(invoice.id)}
                  >
                    Excluir
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfInvoices;
