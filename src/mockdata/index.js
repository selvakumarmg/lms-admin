export const loanType = [
  { value: 'Personal Loan', label: 'Personal Loan' },
  { value: 'Business Loan', label: 'Business Loan' },
  { value: 'House Loan', label: 'House Loan' },
  { value: 'Loan Against Property', label: 'Loan Against Property' },
  { value: 'Others', label: 'Others' },
]

export const loanStatusOptions = [
  { value: 'Fresh', label: 'Fresh' },
  { value: 'Top Up', label: 'Top Up' },
  { value: 'Balance Transfer', label: 'Balance Transfer' },
  // Add more options as needed
]

export const bankNameList = [
  { value: '1', label: 'IOB' },
  { value: '2', label: 'CUB' },
  { value: '3', label: 'HDC' },
  // Add more options as needed
]

export const data = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    mobileNo: '7397316421',
    email: 'john.doe@example.com',
    companyName: 'ABC Corporation',
    salary: '50000',
    doorNumber: '123',
    street: 'Main Street',
    city: 'Cityville',
    state: 'Stateville',
    pincode: '123456',
    loanAmount: '100000',
    bankName: 'XYZ Bank',
    loanType: 'Personal Loan',
    loanProcessStatus: 'Pending',
    payslips: ['payslip1.pdf', 'payslip2.pdf'],
    aadharCard: ['aadhar_front.jpg', 'aadhar_back.jpg'],
    panCard: ['pan_card.pdf'],
    bankStatement: ['bank_statement_jan.pdf', 'bank_statement_feb.pdf'],
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    mobileNo: '9876543210',
    email: 'jane.smith@example.com',
    companyName: 'XYZ Ltd',
    salary: '75000',
    doorNumber: '456',
    street: 'Broadway',
    city: 'Townsville',
    state: 'Stateland',
    pincode: '654321',
    loanAmount: '150000',
    bankName: 'ABC Bank',
    loanType: 'Business Loan',
    loanProcessStatus: 'Approved',
    payslips: ['payslip3.pdf'],
    aadharCard: ['aadhar_front_jane.jpg', 'aadhar_back_jane.jpg'],
    panCard: ['pan_card_jane.pdf'],
    bankStatement: ['bank_statement_mar.pdf', 'bank_statement_apr.pdf'],
  },
  // Add more entries as needed
]
