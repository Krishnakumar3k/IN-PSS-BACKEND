//import {PaySlip} from '../db/index.js';
import {Employee, PaySlip} from '../db/employee.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import z from 'zod';
import { JWT_SECRET } from '../server.js';

/**
 * @desc add new emp
 * @route POST /api/addemp
 * @access public
 */

    async function addEmployee(req, res) {
      const {
        id,
        name,
        dob,
        phoneNumber, 
        email,
        address,
        panNumber

      } = req.body; 
    
      try {
        // Create and save the new employee in the database
        const newEmployee = await Employee.create({
          id,
          name,
          dob,
          phoneNumber, 
          email,
          address,
          panNumber
        });
    
        res.status(201).json({
          status: 'success',
          data: newEmployee,
        });
      } catch (err) {
        res.status(500).json({
          status: 'error',
          message: err.message || 'Something went wrong',
        });
      }
    }
 //Get Employee ById----------------------------------------
 
 async function getEmpById(req, res) {
  const { id } = req.params;
  console.log("Received ID:", id); 
  try {
    let employee = await Employee.findById(id);
    
    if (!employee) {
      return res.status(404).send({ message: "Employee not found" });
    }
    res.status(200).send({ message: employee });
  } catch (error) {
    console.error("Error fetching employee:", error);  
    res.status(500).send({ error: error.message });
  }
}

// update employee By Id
async function updateEmpById(req, res) {
  const { id } = req.params;
  try {
    const updatedEmployee = await Employee.updateOne(
      { _id: id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (updatedEmployee.nModified === 0) {
      return res.status(404).send({ message: "Employee not found or no changes made" });
    }
    res.status(200).send({ message: "Employee updated successfully", data: updatedEmployee });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
}

//deleteEmpById-------
async function deleteEmpById(req, res) {
  const { id } = req.params;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).send({ message: "Employee not found" });
    }
    res.status(200).send({ message: "Employee deleted successfully", data: deletedEmployee });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
}

/**
 * @desc aadd pay slip 
 * @route POST /api/addpayslip
 * @access public
 */
async function addPayslip(req, res) {
  const { employee, payDate, bankName } = req.body; 
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).send({ message: "Employee not found" });
    }
    //  Create a new payslip
    const newPayslip = new PaySlip({
      employee: employee._id,  // Store the reference to the employee
      payDate,
      bankName
    });
    const savedPayslip = await newPayslip.save();
    return res.status(201).send({
      message: 'Payslip added successfully!',
      data: savedPayslip
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Internal Server Error',
      error: error.message
    });
  }
}


export { addEmployee, getEmpById, updateEmpById, deleteEmpById, addPayslip};
