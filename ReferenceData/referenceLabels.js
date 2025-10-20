// Shared label packs & source modes for BOTH tables

export const LABELS = {
  accountStatus: {
    all: {
      name: 'Field Name',
      type: 'Type Code',
      value: 'Field Value',
      reasonCode: 'Account Status Reason Code',
      description: 'Field Description',
      source: 'System Source Name',
    },
    bySource: {
      triumph: {
        name: 'Field Name',
        type: 'Type Code',
        value: 'Field Value',
        reasonCode: 'Account Status Reason Code',
        description: 'Field Description',
        source: 'System Source Name',
      },
    },
    defaultVisible: { name: true, type: true, value: true, reasonCode: true, description: true, source: true },
    locked: [],
    sourceModes: [
      { value: 'all', label: 'All Sources' },
      { value: 'triumph', label: 'Triumph Only' },
    ],
  },

  transactionCodes: {
    all: {
      name: 'Field Name',
      blockCode1: 'Block Code 1',
      blockCode2: 'Block Code 2',
      marketLocation: 'Market Location',
      batchCode: 'Batch Code',
      subCode: 'Sub Code',
      value: 'Field Value',
      description: 'Field Description',
      source: 'System Source Name',
    },
    bySource: {
      triumph: {
        name: 'Field Name',
        marketLocation: 'Market Location',
        value: 'Field Value',
        description: 'Field Description',
        source: 'System Source Name',
      },
      cars: {
        name: 'Field Name',
        marketLocation: 'Market Location',
        batchCode: 'Batch Code',
        subCode: 'Sub Code',
        value: 'Field Value',
        description: 'Field Description',
        source: 'System Source Name',
      }
      // globestar: falls back to "all"
    },
    defaultVisible: {
      name: true, blockCode1: true, blockCode2: true, marketLocation: true,
      batchCode: true, subCode: true, value: true, description: true, source: true
    },
    locked: ['marketLocation'], // cannot be hidden
    sourceModes: [
      { value: 'all', label: 'All Sources' },
      { value: 'globestar', label: 'Globestar Only' },
      { value: 'triumph', label: 'Triumph Only' },
      { value: 'cars', label: 'CARS Only' },
    ],
  },
};
