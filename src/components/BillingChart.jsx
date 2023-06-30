import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const BillingChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyOptions, setCompanyOptions] = useState([]);
  const [months, setMonths] = useState([]);

  const monthLabels = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const updateChart = (filteredData) => {
    const chartData = {
      labels: [],
      datasets: [],
    };

    const companies = {};
    filteredData.forEach((item) => {
      if (!companies[item.company]) {
        companies[item.company] = {
          label: item.company,
          data: [],
        };
      }
      companies[item.company].data.push(item.invoiceValue);
    });

    chartData.datasets = Object.values(companies);
    chartData.labels = months.sort(
      (a, b) => monthLabels.indexOf(a) - monthLabels.indexOf(b)
    );

    if (selectedCompany === "") {
      chartData.datasets.forEach((dataset) => {
        const companyData = filteredData
          .filter((item) => item.company === dataset.label)
          .sort((a, b) => {
            const monthA = monthLabels.indexOf(a.competenceMonth);
            const monthB = monthLabels.indexOf(b.competenceMonth);
            return monthA - monthB;
          });

        const companyDataByMonth = {};
        companyData.forEach((item) => {
          if (!companyDataByMonth[item.competenceMonth]) {
            companyDataByMonth[item.competenceMonth] = item.invoiceValue;
          } else {
            companyDataByMonth[item.competenceMonth] += item.invoiceValue;
          }
        });

        dataset.data = months.map((month) => companyDataByMonth[month] || 0);
      });
    }

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      chartRef.current.chart = new Chart(chartRef.current.getContext("2d"), {
        type: "bar",
        data: chartData,
        options: chartOptions,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/invoices");
        const invoiceData = response.data;
        setData(invoiceData);

        const uniqueCompanies = [
          ...new Set(invoiceData.map((item) => item.company)),
        ];
        setCompanyOptions(uniqueCompanies.sort());

        const uniqueMonths = [
          ...new Set(invoiceData.map((item) => item.competenceMonth)),
        ];
        setMonths(
          uniqueMonths.sort(
            (a, b) => monthLabels.indexOf(a) - monthLabels.indexOf(b)
          )
        );
      } catch (error) {
        console.log("Erro ao buscar dados das notas fiscais:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const filteredData = selectedCompany
        ? data.filter((item) => item.company === selectedCompany)
        : data;

      updateChart(filteredData);
    }
  }, [data, selectedCompany]);

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  return (
    <div className="billing-chart-wrapper">
      <h1 className="billing-chart-title">Gráfico de Despesas</h1>
      <div className="billing-chart-container">
        <div className="billing-chart">
          <div className="billing-chart-select">
            <label htmlFor="company" className="billing-chart-label">
              Empresa:
            </label>
            <select
              id="company"
              value={selectedCompany}
              onChange={handleCompanyChange}
              className="billing-chart-select-input"
            >
              <option value="">Todas</option>
              {companyOptions.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          <canvas ref={chartRef} className="billing-chart-canvas" />
        </div>
      </div>
    </div>
  );
};

export default BillingChart;