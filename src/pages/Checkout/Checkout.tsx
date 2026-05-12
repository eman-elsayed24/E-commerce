import {
  useState,
  useEffect,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../app/features/cart/cartSlice";
import { formatPrice } from "../../utils/formatPrice";
import useCheckoutForm, {
  type CheckoutForm,
} from "../../hooks/useCheckoutForm";
import type { CartItem } from "../../types/product";
import "./checkout.css";

const STEP_LABELS = ["Shipping", "Payment", "Review"];

type PaymentMethod = "card" | "cod";

const Checkout = () => {
  const { cartList } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const {
    form,
    errors,
    setErrors,
    handleChange,
    validateShipping,
    validatePayment,
  } = useCheckoutForm();

  const totalPrice = cartList.reduce(
    (sum, item) => sum + item.qty * item.price,
    0,
  );
  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = +(totalPrice * 0.08).toFixed(2);
  const grandTotal = +(totalPrice + shipping + tax).toFixed(2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleNext = () => {
    const e =
      step === 1
        ? validateShipping()
        : step === 2
          ? validatePayment(paymentMethod)
          : {};
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setStep((s) => s + 1);
  };

  const handlePlaceOrder = () => {
    cartList.forEach((item) => dispatch(deleteProduct(item)));
    setStep(4);
  };

  if (cartList.length === 0 && step !== 4) {
    return (
      <section className="checkout-page">
        <Container>
          <div className="empty-checkout">
            <ion-icon name="cart-outline"></ion-icon>
            <h2>Your cart is empty</h2>
            <p>Add some products before checking out.</p>
            <button className="checkout-btn" onClick={() => navigate("/shop")}>
              Go to Shop
            </button>
          </div>
        </Container>
      </section>
    );
  }

  if (step === 4) {
    return (
      <section className="checkout-page">
        <Container>
          <div className="order-success">
            <div className="success-icon">
              <i className="fa fa-check"></i>
            </div>
            <h2>Order Placed!</h2>
            <p>Thanks {form.firstName || "there"}! Your order is confirmed.</p>
            {paymentMethod === "cod" && (
              <div className="cod-note">
                <i className="fa fa-money"></i> You'll pay cash upon delivery.
              </div>
            )}
            <div className="success-actions">
              <button className="checkout-btn" onClick={() => navigate("/")}>
                Back to Home
              </button>
              <button
                className="checkout-btn-outline"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <Container>
        <div className="checkout-steps">
          {STEP_LABELS.map((label, i) => (
            <div
              key={i}
              className={`step ${step === i + 1 ? "active" : ""} ${step > i + 1 ? "done" : ""}`}
            >
              <div className="step-circle">
                {step > i + 1 ? <i className="fa fa-check"></i> : i + 1}
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <Row className="justify-content-center">
          <Col lg={7} md={12}>
            <div className="checkout-card">
              {step === 1 && (
                <ShippingStep
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                />
              )}
              {step === 2 && (
                <PaymentStep
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              )}
              {step === 3 && (
                <ReviewStep
                  form={form}
                  paymentMethod={paymentMethod}
                  setStep={setStep}
                />
              )}

              <div className="checkout-actions">
                {step > 1 && (
                  <button
                    className="checkout-btn-outline"
                    onClick={() => setStep((s) => s - 1)}
                  >
                    Back
                  </button>
                )}
                <button
                  className="checkout-btn"
                  onClick={step === 3 ? handlePlaceOrder : handleNext}
                >
                  {step === 3 ? (
                    <>
                      <i className="fa fa-check" style={{ marginRight: 8 }}></i>
                      Place Order
                    </>
                  ) : (
                    <>
                      Continue{" "}
                      <i
                        className="fa fa-arrow-right"
                        style={{ marginLeft: 8 }}
                      ></i>
                    </>
                  )}
                </button>
              </div>
            </div>
          </Col>

          <Col lg={5} md={12}>
            <OrderSummary
              cartList={cartList}
              totalPrice={totalPrice}
              shipping={shipping}
              tax={tax}
              grandTotal={grandTotal}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

interface FormFieldProps {
  label: string;
  name: keyof CheckoutForm;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}

const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: FormFieldProps) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
    {error && <span className="field-error">{error}</span>}
  </div>
);

interface ShippingStepProps {
  form: CheckoutForm;
  errors: Partial<Record<keyof CheckoutForm, string>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ShippingStep = ({ form, errors, handleChange }: ShippingStepProps) => (
  <>
    <h4 className="checkout-section-title">Shipping Information</h4>
    <Row>
      <Col sm={6}>
        <FormField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="Eman"
        />
      </Col>
      <Col sm={6}>
        <FormField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          error={errors.lastName}
          placeholder="Elsayed"
        />
      </Col>
      <Col sm={6}>
        <FormField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="email@example.com"
        />
      </Col>
      <Col sm={6}>
        <FormField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="+20 1XX XXX XXXX"
        />
      </Col>
      <Col sm={12}>
        <FormField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          error={errors.address}
          placeholder="Street, Building No."
        />
      </Col>
      <Col sm={6}>
        <FormField
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          error={errors.city}
          placeholder="Cairo"
        />
      </Col>
      <Col sm={6}>
        <FormField
          label="ZIP Code"
          name="zip"
          value={form.zip}
          onChange={handleChange}
          error={errors.zip}
          placeholder="11511"
        />
      </Col>
    </Row>
  </>
);

interface PaymentStepProps {
  form: CheckoutForm;
  errors: Partial<Record<keyof CheckoutForm, string>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (m: PaymentMethod) => void;
}

const PaymentStep = ({
  form,
  errors,
  handleChange,
  paymentMethod,
  setPaymentMethod,
}: PaymentStepProps) => (
  <>
    <h4 className="checkout-section-title">Payment Method</h4>
    <div className="payment-methods">
      {(
        [
          {
            id: "card" as const,
            icon: "fa-credit-card",
            title: "Credit / Debit Card",
            sub: "Visa, Mastercard, AMEX",
          },
          {
            id: "cod" as const,
            icon: "fa-money",
            title: "Cash on Delivery",
            sub: "Pay when you receive your order",
          },
        ] as const
      ).map(({ id, icon, title, sub }) => (
        <div
          key={id}
          className={`payment-option ${paymentMethod === id ? "selected" : ""}`}
          onClick={() => setPaymentMethod(id)}
        >
          <div className="payment-option-radio">
            {paymentMethod === id && <div className="radio-dot"></div>}
          </div>
          <i className={`fa ${icon}`}></i>
          <div>
            <strong>{title}</strong>
            <p>{sub}</p>
          </div>
        </div>
      ))}
    </div>

    {paymentMethod === "card" && (
      <Row style={{ marginTop: 20 }}>
        <Col sm={12}>
          <FormField
            label="Name on Card"
            name="cardName"
            value={form.cardName}
            onChange={handleChange}
            error={errors.cardName}
            placeholder="Eman Elsayed"
          />
        </Col>
        <Col sm={12}>
          <FormField
            label="Card Number"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            error={errors.cardNumber}
            placeholder="1234 5678 9012 3456"
          />
        </Col>
        <Col sm={6}>
          <FormField
            label="Expiry Date"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            error={errors.expiry}
            placeholder="MM/YY"
          />
        </Col>
        <Col sm={6}>
          <FormField
            label="CVV"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            error={errors.cvv}
            placeholder="123"
            type="password"
          />
        </Col>
        <Col sm={12}>
          <div className="secure-note">
            <i className="fa fa-lock"></i> Your payment info is encrypted and
            secure.
          </div>
        </Col>
      </Row>
    )}
    {paymentMethod === "cod" && (
      <div className="cod-info">
        <i className="fa fa-info-circle"></i> Please have the exact amount ready
        upon delivery.
      </div>
    )}
  </>
);

interface ReviewStepProps {
  form: CheckoutForm;
  paymentMethod: PaymentMethod;
  setStep: Dispatch<SetStateAction<number>>;
}

const ReviewStep = ({ form, paymentMethod, setStep }: ReviewStepProps) => {
  const digits = form.cardNumber.replace(/\s/g, "");
  const last4 = digits.length >= 4 ? digits.slice(-4) : digits;

  return (
    <>
      <h4 className="checkout-section-title">Review Your Order</h4>
      <div className="review-section">
        <div className="review-block">
          <div className="review-block-header">
            <span>
              <i className="fa fa-map-marker"></i> Shipping To
            </span>
            <button type="button" className="edit-btn" onClick={() => setStep(1)}>
              Edit
            </button>
          </div>
          <p>
            {form.firstName} {form.lastName}
          </p>
          <p>
            {form.address}, {form.city} {form.zip}
          </p>
          <p>
            {form.email} · {form.phone}
          </p>
        </div>
        <div className="review-block">
          <div className="review-block-header">
            <span>
              <i className="fa fa-credit-card"></i> Payment
            </span>
            <button type="button" className="edit-btn" onClick={() => setStep(2)}>
              Edit
            </button>
          </div>
          {paymentMethod === "cod" ? (
            <p>Cash on Delivery</p>
          ) : (
            <p>Card ending in {last4}</p>
          )}
        </div>
      </div>
    </>
  );
};

interface OrderSummaryProps {
  cartList: CartItem[];
  totalPrice: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}

const OrderSummary = ({
  cartList,
  totalPrice,
  shipping,
  tax,
  grandTotal,
}: OrderSummaryProps) => (
  <div className="order-summary">
    <h4 className="checkout-section-title">Order Summary</h4>
    <div className="summary-items">
      {cartList.map((item) => (
        <div className="summary-item" key={item.id}>
          <img src={item.imgUrl} alt={item.productName} />
          <div className="summary-item-info">
            <p>{item.productName}</p>
            <span>Qty: {item.qty}</span>
          </div>
          <strong>{formatPrice(item.price * item.qty)}</strong>
        </div>
      ))}
    </div>
    <div className="summary-totals">
      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>
          {shipping === 0 ? (
            <span className="free-shipping">Free</span>
          ) : (
            formatPrice(shipping)
          )}
        </span>
      </div>
      <div className="summary-row">
        <span>Tax (8%)</span>
        <span>{formatPrice(tax)}</span>
      </div>
      <div className="summary-row total-row">
        <span>Total</span>
        <span>{formatPrice(grandTotal)}</span>
      </div>
    </div>
    {shipping === 0 && (
      <div className="free-shipping-badge">
        <i className="fa fa-truck"></i> You qualify for free shipping!
      </div>
    )}
  </div>
);

export default Checkout;
