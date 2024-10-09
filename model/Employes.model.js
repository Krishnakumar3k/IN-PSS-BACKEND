import mongoose from 'mongoose';
//const mongoose =  require("mongoose")

/**
   * empSchema for employee onboarding
   * @module models/empSchema
   * @requires mongoose
   */
  
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
    companyMail:{ type : String},
    currentAddress:{type: String},
    permanentAddress: { type: String },
    panNumber: {
        type: String,
        maxlength: [10, 'PAN number can not exceed 10 characters'],
        required: true,
        trim: true,
    },
    joiningDate:{type: String, required: true},


})

/**
   * salaryschema for employee onboarding
   * @module models/salarySchema
   * @requires mongoose
   */
// PaySlip Schema
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
  },
  basicPay: {
    type: Number,
    required: true
  },
  tds: {
    type: Number,
    required: true
  },
  houseRentAllowance: {
    type: Number,
    required: true
  },
  projectAllowance: {
    type: Number,
    required: true
  },
  medicalAllowance: {
    type: Number,
    required: true
  },
  conveyanceAllowance: {
    type: Number,
    required: true
  },
  totalEarnings: {
    type: Number,
    required: true
  },
  totalDeductions: {
    type: Number,
    required: true
  },
  netPay: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Employee = mongoose.model('Employee', empSchema)
const PaySlip =  mongoose.model("PaySlip", paySlipSchema)
export { Employee, PaySlip,};
