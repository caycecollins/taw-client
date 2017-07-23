export default {
  title: {
    value: '',
    isRequired: true,
    isPristine: true,
    validationRules: [
      'isValue',
    ],
  },
  description: {
    value: '',
    isRequired: true,
    isPristine: true,
    validationRules: [
      'isValue',
    ],
  },
  mandatory: {
    value: '',
    isRequired: false,
    isPristine: true,
    validationRules: [],
  },
  start: {
    value: '',
    isRequired: true,
    isPristine: true,
    validationRules: [
      'isValue',
    ],
  },
  end: {
    value: '',
    isRequired: true,
    isPristine: true,
    validationRules: [
      'isValue',
    ],
  },
  repeat: {
    value: '',
    isRequired: false,
    isPristine: true,
    validationRules: [],
  },
  repeatWeekly: {
    value: '',
    isRequired: false,
    isPristine: true,
    validationRules: [],
  },
  searchDivision: {
    value: '',
    isRequired: false,
    isPristine: true,
    validationRules: [],
  },
  showErrors: true,
  pending: false,
  participants: [],
}
