// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = typeof initialStep;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(initialStep);
}

export const initialStep = {
  key: 'account',
  type: 'form',
  title: 'My Form',
  schemas: [
    {
      allOf: [
        {
          title: 'Bank details',
          oneOf: [
            {
              title: 'Inside Europe',
              type: 'object',
              displayOrder: ['name', 'ownedByCustomer', 'details', 'type'],
              properties: {
                name: {
                  type: 'object',
                  displayOrder: ['fullName'],
                  properties: {
                    fullName: {
                      title: 'Full name of the account holder',
                      type: 'string',
                      validationMessages: {
                        minLength:
                          'Name needs to be between 2 and 140 characters long.',
                        maxLength:
                          'Recipient name cannot be longer than 140 characters.',
                        pattern:
                          'This recipient name may contain invalid characters or is not the full name. Please try again.',
                        required: 'Name cannot be empty.'
                      },
                      autofillProvider: 'contact',
                      autofillKey: 'contact.fullName',
                      pattern:
                        "^[0-9A-Za-zÀ-ÖØ-öø-ÿ-_()'*,.]+ +[0-9A-Za-zÀ-ÖØ-öø-ÿ-_()'*,.]+([0-9A-Za-zÀ-ÖØ-öø-ÿ-_()'*,. ]*)$",
                      minLength: 2,
                      maxLength: 140
                    }
                  },
                  required: ['fullName']
                },
                ownedByCustomer: {
                  title: 'My own Account',
                  type: 'boolean',
                  hidden: true,
                  const: false
                },
                details: {
                  type: 'object',
                  displayOrder: ['iban'],
                  properties: {
                    iban: {
                      title: 'IBAN',
                      type: 'string',
                      placeholder: '',
                      displayFormat: '**** **** **** **** **** **** **** ****',
                      help: {
                        markdown:
                          'IBANs are long account numbers used by banks for cross-border transfers. Each country structures this number differently, but it always starts with a 2 digit country code (e.g. DE for Germany).'
                      },
                      validationMessages: {
                        minLength: 'The IBAN you have entered is too short.',
                        maxLength: 'The IBAN you have entered is too long.',
                        pattern: 'Please specify a valid IBAN.',
                        required: 'Please specify an IBAN.'
                      },
                      refreshFormOnChange: true,
                      pattern: '^[a-zA-Z]{2}[a-zA-Z0-9 ]{12,40}$',
                      minLength: 14,
                      maxLength: 42
                    }
                  },
                  required: []
                },
                type: {
                  title: 'Type',
                  type: 'string',
                  hidden: true,
                  const: 'Iban'
                }
              },
              required: ['type', 'name', 'details'],
              icon: { name: 'bank', type: 'icon' }
            },
            {
              title: 'Outside Europe',
              type: 'object',
              displayOrder: ['name', 'details', 'type'],
              properties: {
                name: {
                  type: 'object',
                  displayOrder: ['fullName'],
                  properties: {
                    fullName: {
                      title: 'Full name of the account holder',
                      type: 'string',
                      validationMessages: {
                        minLength:
                          'Name needs to be between 2 and 140 characters long.',
                        maxLength:
                          'Recipient name cannot be longer than 140 characters.',
                        pattern:
                          'This recipient name may contain invalid characters or is not the full name. Please try again.',
                        required: 'Name cannot be empty.'
                      },
                      autofillProvider: 'contact',
                      autofillKey: 'contact.fullName',
                      pattern:
                        "^[0-9A-Za-zÀ-ÖØ-öø-ÿ-_()'*,.]+ +[0-9A-Za-zÀ-ÖØ-öø-ÿ-_()'*,.]+([0-9A-Za-zÀ-ÖØ-öø-ÿ-_()'*,. ]*)$",
                      minLength: 2,
                      maxLength: 140
                    }
                  },
                  required: ['fullName']
                },
                details: {
                  type: 'object',
                  displayOrder: ['bic', 'accountNumber'],
                  properties: {
                    bic: {
                      title: 'SWIFT / BIC code',
                      type: 'string',
                      placeholder: '',
                      validationMessages: {
                        minLength: 'The BIC you have entered is too short.',
                        maxLength: 'The BIC you have entered is too long.',
                        pattern: 'Please specify a valid BIC.',
                        required: 'Please specify a BIC.'
                      },
                      pattern:
                        '^[a-zA-Z]{6}(([a-zA-Z0-9]{2})|([a-zA-Z0-9]{5}))$',
                      minLength: 8,
                      maxLength: 11
                    },
                    accountNumber: {
                      title: 'IBAN / Account Number',
                      type: 'string',
                      placeholder: '',
                      validationMessages: {
                        minLength: 'Account number is too short.',

                        maxLength: 'Account number is too large.',
                        pattern: 'Please enter a valid account number.',
                        required: 'Please enter an IBAN or account number.'
                      },
                      pattern: '^[a-zA-Z0-9]{4,34}$',
                      minLength: 4,
                      maxLength: 34
                    }
                  },
                  required: [] // required: ["bic", "accountNumber"]
                },
                type: {
                  title: 'Type',
                  type: 'string',
                  hidden: true,
                  const: 'SwiftCode'
                }
              },
              required: ['type', 'name', 'details'],
              icon: { name: 'bank', type: 'icon' }
            }
          ],
          control: 'tab',
          placeholder: 'Please select where you are sending to...'
        }
      ]
    }
  ],
  refreshFormUrl: '/refresh',
  model: {
    name: { fullName: 'Bob Loblaw' },
    details: {
      iban: 'NL54ABNA9397935380',
      bic: 'BUKBGB22',
      accountNumber: '123456789012'
    },
    type: 'Iban'
  },
  actions: [
    {
      title: 'Submit',
      url: '/submit',
      method: 'POST',
      type: 'primary'
    }
  ]
};

// Tried to pass something like this (the actual response) did not work.
const requirementsResponse = [
  {
    type: 'aba',
    title: 'Local bank account',
    fields: [
      {
        name: 'Recipient type',
        group: [
          {
            key: 'legalType',
            name: 'Recipient type',
            type: 'select',
            refreshRequirementsOnChange: false,
            required: true,
            displayFormat: null,
            example: '',
            minLength: null,
            maxLength: null,
            validationRegexp: null,
            validationAsync: null,
            valuesAllowed: [
              {
                key: 'PRIVATE',
                name: 'Person'
              },
              {
                key: 'BUSINESS',
                name: 'Business'
              }
            ]
          }
        ]
      },
      {
        name: 'ACH routing number',
        group: [
          {
            key: 'abartn',
            name: 'ACH routing number',
            type: 'text',
            refreshRequirementsOnChange: false,
            required: true,
            displayFormat: null,
            example: '026009593',
            minLength: 9,
            maxLength: 9,
            validationRegexp: '^\\d{9}$',
            validationAsync: null,
            valuesAllowed: null
          }
        ]
      },
      {
        name: 'Account number',
        group: [
          {
            key: 'accountNumber',
            name: 'Account number',
            type: 'text',
            refreshRequirementsOnChange: false,
            required: true,
            displayFormat: null,
            example: '12345678',
            minLength: 4,
            maxLength: 17,
            validationRegexp: '^\\d{4,17}$',
            validationAsync: null,
            valuesAllowed: null
          }
        ]
      },
      {
        name: 'Account type',
        group: [
          {
            key: 'accountType',
            name: 'Account type',
            type: 'radio',
            refreshRequirementsOnChange: false,
            required: true,
            displayFormat: null,
            example: 'CHECKING',
            minLength: null,
            maxLength: null,
            validationRegexp: null,
            validationAsync: null,
            valuesAllowed: [
              {
                key: 'CHECKING',
                name: 'Checking'
              },
              {
                key: 'SAVINGS',
                name: 'Savings'
              }
            ]
          }
        ]
      },
      {
        name: 'Country',
        group: [
          {
            key: 'address.country',
            name: 'Country',
            type: 'select',
            refreshRequirementsOnChange: true,
            required: true,
            displayFormat: null,
            example: '',
            minLength: null,
            maxLength: null,
            validationRegexp: null,
            validationAsync: null,
            valuesAllowed: [
              {
                key: 'AF',
                name: 'Afghanistan'
              },
              {
                key: 'AL',
                name: 'Albania'
              }
            ]
          }
        ]
      },
      {
        name: 'City',
        group: [
          {
            key: 'address.city',
            name: 'City',
            type: 'text',
            refreshRequirementsOnChange: false,
            required: true,
            displayFormat: null,
            example: '',
            minLength: null,
            maxLength: null,
            validationRegexp: null,
            validationAsync: null,
            valuesAllowed: null
          }
        ]
      },
      {
        name: 'Address',
        group: [
          {
            key: 'address.firstLine',
            name: 'Address',
            type: 'text',
            refreshRequirementsOnChange: false,
            required: true,
            displayFormat: null,
            example: '',
            minLength: null,
            maxLength: null,
            validationRegexp: null,
            validationAsync: null,
            valuesAllowed: null
          }
        ]
      },
      {
        name: 'Post Code',
        group: [
          {
            key: 'address.postCode',
            name: 'Post Code',
            type: 'text',
            refreshRequirementsOnChange: false,
            required: true,
            displayFormat: null,
            example: '',
            minLength: null,
            maxLength: null,
            validationRegexp: null,
            validationAsync: null,
            valuesAllowed: null
          }
        ]
      }
    ]
  }
];
