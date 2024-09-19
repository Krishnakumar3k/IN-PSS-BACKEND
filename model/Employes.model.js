import mongoose from 'mongoose';


// Emp-Schema for employee detailed-------------------------
const empSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-9]+$/.test(v); // Regular expression to ensure only numbers
            },
            message: props => `${props.value} is not a valid phone number! Only numeric values are allowed.`
        }
    },
    email: { type: String, required: true },
    address: { type: String },
    panNumber: {
        type: String,
        maxlength: [10, 'PAN number can not exceed 10 characters'],
        required: true,
        trim: true,
    },
})

  //Payslip schema-----------------------
   // Payslip schema with reference to Employee schema
   /* const paySlipSchema = new mongoose.Schema({
    employee: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Employee model
      ref: 'Employee',
      required: true
    },
    payDate: {
      type: String,
      required: true
    },
    bankName: {
      type: String,
      required: true
    }
  }); */
  
  const paySlipSchema = new mongoose.Schema({
    employee: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Employee model
      ref: 'Employee',
      required: true
    },
    payDate: {
      type: String,
      required: true
    },
    bankName: {
      type: String,
      required: true
    }
  });
  

const Employee = mongoose.model('Employee', empSchema)
const PaySlip =  mongoose.model("PaySlip", paySlipSchema)
export { Employee, PaySlip};