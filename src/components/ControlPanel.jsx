import React, { useState, useEffect } from "react";
import axios from "axios";
import InvoiceRegistration from "./InvoiceRegistration";
import StatementOfExpenses from "./StatementOfExpenses";
import ListOfInvoices from "./ListOfInvoices";
import BillingChart from "./BillingChart";
import BillingLimit from "./BillingLimit";

const ControlPanel = () => {
  const [showInvoiceRegistration, setShowInvoiceRegistration] = useState(false);
  const [showBillingChart, setShowBillingChart] = useState(false);
  const [showListOfInvoices, setShowListOfInvoices] = useState(false);
  const [showStatementOfExpenses, setShowStatementOfExpenses] = useState(false);
  const [showBillingLimit, setShowBillingLimit] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);
  const [editInvoiceId, setEditInvoiceId] = useState(null);
  const [totalInvoiceValue, setTotalInvoiceValue] = useState(0);
  const [expenses, setExpenses] = useState({
    Janeiro: 0,
    Fevereiro: 0,
    Março: 0,
    Abril: 0,
    Maio: 0,
    Junho: 0,
    Julho: 0,
    Agosto: 0,
    Setembro: 0,
    Outubro: 0,
    Novembro: 0,
    Dezembro: 0,
  });

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:3000/invoices");
      setInvoiceData(response.data);
    } catch (error) {
      console.log("Erro ao buscar notas fiscais:", error);
    }
  };

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

  const handleShowInvoiceRegistration = () => {
    setShowInvoiceRegistration(true);
  };

  const handleShowBillingChart = () => {
    setShowBillingChart(true);
  };

  const handleShowListOfInvoices = () => {
    setShowListOfInvoices(true);
  };

  const handleShowStatementOfExpenses = () => {
    setShowStatementOfExpenses(true);
  };

  const handleShowBillingLimit = () => {
    setShowBillingLimit(true);
  };

  const onDelete = async (invoiceId) => {
    try {
      await axios.delete(`http://localhost:3000/invoices/${invoiceId}`);

      setInvoiceData((prevData) =>
        prevData.filter((invoice) => invoice.id !== invoiceId)
      );
    } catch (error) {
      console.log("Erro ao excluir nota fiscal:", error);
    }
  };

  const onEdit = (invoiceId) => {
    setEditInvoiceId(invoiceId);
  };

  const onSave = async (invoiceId, updatedData) => {
    try {
      await axios.put(
        `http://localhost:3000/invoices/${invoiceId}`,
        updatedData
      );

      setInvoiceData((prevData) =>
        prevData.map((invoice) => {
          if (invoice.id === invoiceId) {
            return {
              ...invoice,
              ...updatedData,
            };
          }
          return invoice;
        })
      );

      setEditInvoiceId(null);
    } catch (error) {
      console.log("Erro ao salvar nota fiscal:", error);
    }
  };

  const handleExpenseChange = (month, value) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [month]: value,
    }));
  };

  return (
    <div className="control-panel">
      {!showInvoiceRegistration &&
      !showBillingChart &&
      !showListOfInvoices &&
      !showStatementOfExpenses &&
      !showBillingLimit ? (
        <>
          <div className="control-panel__card">
            <h3 className="control-panel__card-title">
              Cadastro de Notas Fiscais
            </h3>
            <p className="control-panel__card-description">
              Cadastre o número e valor da Nota Fiscal, selecionando a empresa,
              o mês de competência e o mês de caixa.
            </p>
            <button
              className="control-panel__card__btn"
              onClick={handleShowInvoiceRegistration}
            >
              Entrar
            </button>
          </div>

          <div className="control-panel__card">
            <h3 className="control-panel__card-title">
              Gráfico de Faturamento
            </h3>
            <p className="control-panel__card-description">
              Visualize o faturamento mês a mês.
            </p>
            <button
              className="control-panel__card__btn"
              onClick={handleShowBillingChart}
            >
              Entrar
            </button>
          </div>

          <div className="control-panel__card">
            <h3 className="control-panel__card-title">Listagem de NFs</h3>
            <p className="control-panel__card-description">
              Visualize, exclua e edite as notas já enviadas.
            </p>
            <button
              className="control-panel__card__btn"
              onClick={handleShowListOfInvoices}
            >
              Entrar
            </button>
          </div>

          <div className="control-panel__card">
            <h3 className="control-panel__card-title">
              Declaração de Despesas
            </h3>
            <p className="control-panel__card-description">
              Informe o valor total das despesas mês a mês para controlar seus
              rendimentos.
            </p>
            <button
              className="control-panel__card__btn"
              onClick={handleShowStatementOfExpenses}
            >
              Entrar
            </button>
          </div>

          <div className="control-panel__card">
            <h3 className="control-panel__card-title">
              Limite de Faturamento
            </h3>
            <p className="control-panel__card-description">
              Controle o quanto de faturamento você ainda pode fazer para não
              ser desenquadrado como MEI.
            </p>
            <button
              className="control-panel__card__btn"
              onClick={handleShowBillingLimit}
            >
              Entrar
            </button>
          </div>
        </>
      ) : showInvoiceRegistration ? (
        <InvoiceRegistration />
      ) : showBillingChart ? (
        <BillingChart />
      ) : showListOfInvoices ? (
        <ListOfInvoices
          invoiceData={invoiceData}
          editInvoiceId={editInvoiceId}
          onDelete={onDelete}
          onEdit={onEdit}
          onSave={onSave}
        />
      ) : showStatementOfExpenses ? (
        <StatementOfExpenses
          expenses={expenses}
          onExpenseChange={handleExpenseChange}
        />
      ) : showBillingLimit ? (
        <BillingLimit invoiceValue={totalInvoiceValue} />
      ) : null}
    </div>
  );
};

export default ControlPanel;
