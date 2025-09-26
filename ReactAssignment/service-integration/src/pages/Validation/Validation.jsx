export default function Validation(formData) {
  let errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First Name is required";
  }
  if (!formData.lastName.trim()) {
    errors.lastName = "Last Name is required";
  }
  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date Of Birth is required";
  }
  if (!formData.personalEmail) {
    errors.personalEmail = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.personalEmail)) {
    errors.personalEmail = "Email is invalid";
  }
  if (!formData.mobileNumber) {
    errors.mobileNumber = "Mobile Number is required";
  } else if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
    errors.mobileNumber = "Mobile Number must be 10 digits";
  }
  if (!formData.postalAddress) {
    errors.postalAddress = "Address is required";
  }
  if (!formData.gender) {
    errors.gender = "Gender is required";
  }
  if (!formData.country) {
    errors.country = "Country is required";
  }
  if (!formData.city) {
    errors.city = "City is required";
  }
  if (!formData.designation) {
    errors.designation = "Designation is required";
  }
  if (!formData.basicPay) {
    errors.basicPay = "Basic Pay is required";
  }
  if (
    formData.needTransportation === null ||
    formData.needTransportation === undefined
  ) {
    errors.needTransportation = "Transportation is required";
  }
  if (!formData.username) {
    errors.username = "Username is required";
  }
  if (!formData.password) {
    errors.password = "Password is required";
  }
  return errors;
}
