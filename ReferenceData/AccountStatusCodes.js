import React from 'react';
import ReferenceDataTable from './ReferenceDataTable';
import { useReferenceData } from './useReferenceData';
import { LABELS } from './referenceLabels';
import { accountStatusAPIDetails } from './referenceDataAPIDetails';

// Adapter: API object → canonical rows
function accountStatusAdapter(rawStatusObj) {
  if (!rawStatusObj || typeof rawStatusObj !== 'object') return [];
  const rows = [];

  (rawStatusObj['ACTIVE'] || []).forEach(function(v) {
    rows.push({
      name: 'ACTIVE',
      type: '',
      value: String(v ?? ''),
      reasonCode: '',
      description: '',
      source: '',
    });
  });

  const mergedCancelled = []
    .concat(rawStatusObj['CANCELLED'] || [])
    .concat(rawStatusObj['CHARGE_OFF'] || [])
    .concat(rawStatusObj['COLLECTIONS'] || []);

  mergedCancelled.forEach(function(v) {
    rows.push({
      name: 'CANCELLED',
      type: '',
      value: String(v ?? ''),
      reasonCode: '',
      description: '',
      source: '',
    });
  });

  return rows;
}

function AccountStatusCodes() {
  const { data, loadState } = useReferenceData(
    function() { return accountStatusAPIDetails({ force: false }); },
    accountStatusAdapter
  );

  return (
    <ReferenceDataTable
      title="Account Status Codes"
      definition="A numeric or alphanumeric representation of the current standing of an account, such as active, cancelled, or purged. These codes may vary across systems."
      data={data}
      loadState={loadState}
      labelsPack={LABELS.accountStatus}
      baseFileName="account_status"
    />
  );
}

export default AccountStatusCodes;
