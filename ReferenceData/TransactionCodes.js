import React from 'react';
import ReferenceDataTable from './ReferenceDataTable';
import { useReferenceData } from './useReferenceData';
import { LABELS } from './referenceLabels';
import { transacationStatusCode } from './referenceDataAPIDetails';

function transactionCodesAdapter(data) {
  const list = Array.isArray(data)
    ? data
    : (Array.isArray(data && data.transactionCodes) ? data.transactionCodes : []);

  return (list || []).map(function(item) {
    const x = item || {};
    return {
      name: x.sourceSystem || '',
      blockCode1: x.countryCode || '',
      blockCode2: x.batchCode || '',
      marketLocation: x.accountType || '',
      batchCode: '',
      subCode: '',
      value: x.transactionReason || '',
      description: x.description || '',
      source: x.systemSource || '',
    };
  });
}

function TransactionCodes() {
  const { data, loadState } = useReferenceData(transacationStatusCode, transactionCodesAdapter);

  return (
    <ReferenceDataTable
      title="Transaction Codes"
      definition="An identifier for each transaction by the Submission team, applicable to Base, Incremental, and Accrual."
      data={data}
      loadState={loadState}
      labelsPack={LABELS.transactionCodes}
      baseFileName="transaction_codes"
    />
  );
}

export default TransactionCodes;
