import { useState, type ChangeEvent } from "react";

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const initialForm: CheckoutForm = {
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
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>(
    {},
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    const e: Partial<Record<keyof CheckoutForm, string>> = {};
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

  const validatePayment = (paymentMethod: string) => {
    if (paymentMethod === "cod") return {};
    const err: Partial<Record<keyof CheckoutForm, string>> = {};
    if (!form.cardName.trim()) err.cardName = "Required";
    if (form.cardNumber.replace(/\s/g, "").length < 16)
      err.cardNumber = "Invalid card number";
    if (!form.expiry.match(/^\d{2}\/\d{2}$/)) err.expiry = "Invalid (MM/YY)";
    if (form.cvv.length < 3) err.cvv = "Invalid CVV";
    return err;
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
