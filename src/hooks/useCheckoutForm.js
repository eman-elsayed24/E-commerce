import { useState } from "react";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

const useCheckoutForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === "cardNumber")
      val = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    if (name === "expiry")
      val = value
        .replace(/\D/g, "")
        .slice(0, 4)
        .replace(/(\d{2})(\d)/, "$1/$2");
    if (name === "cvv") val = value.replace(/\D/g, "").slice(0, 3);
    setForm((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateShipping = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    return e;
  };

  const validatePayment = (paymentMethod) => {
    if (paymentMethod === "cod") return {};
    const e = {};
    if (!form.cardName.trim()) e.cardName = "Required";
    if (form.cardNumber.replace(/\s/g, "").length < 16)
      e.cardNumber = "Invalid card number";
    if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = "Invalid (MM/YY)";
    if (form.cvv.length < 3) e.cvv = "Invalid CVV";
    return e;
  };

  return {
    form,
    errors,
    setErrors,
    handleChange,
    validateShipping,
    validatePayment,
  };
};

export default useCheckoutForm;
