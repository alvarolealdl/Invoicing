import React, { useState, useEffect } from "react";

const BillingLimit = ({ invoiceValue }) => {
  const [limit, setLimit] = useState(0);
  const [currentYear] = useState(new Date().getFullYear());
  const [saldo, setSaldo] = useState(60000);

  useEffect(() => {
    const limitePermitido = 81000;
    const novoSaldo = limitePermitido - invoiceValue;
    setLimit(limitePermitido);
    setSaldo(novoSaldo);
  }, [invoiceValue]);

  return (
    <div className="billing-limit">
      <h3 className="billing-limit__title">
        Limite de Faturamento MEI:
      </h3>
      <p className="billing-limit__description">
        Verifique o limite de faturamento permitido para o ano corrente como
        MEI.
      </p>
      <div className="billing-limit__content">
        {limit > 0 && (
          <p className="billing-limit__limit">
            Limite de Faturamento para <strong>{currentYear}</strong>: R${" "}
            {saldo}
          </p>
        )}
      </div>
    </div>
  );
};

export default BillingLimit;
``;
