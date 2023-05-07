import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { usePaymentInputs } from "../react-payment-inputs";
import { useState, useEffect } from "react";

const previewCardImgs = {
  visa: "public/img/visa.jpeg",
  amex: "public/img/amex.jpeg",
  mastercard: "public/img/masterCard.png",
  jcb: "public/img/jcb.png",
};

const creditType = (cc) => {
  // remove white space
  const cardNumber = cc.replace(/ /g, "");
  console.log(cardNumber);

  // Define & detect card types from Regular Expressions:
  let amex = new RegExp("^3[47][0-9]{13}$");
  let visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");

  let mastercard = new RegExp("^5[1-5][0-9]{14}$");
  let mastercard2 = new RegExp("^2[2-7][0-9]{14}$");

  let jcb = new RegExp("^35[0-9]{14}[0-9]*$");

  if (visa.test(cardNumber)) {
    return "visa";
  }
  if (amex.test(cardNumber)) {
    return "amex";
  }
  if (mastercard.test(cardNumber) || mastercard2.test(cardNumber)) {
    return "mastercard";
  }

  if (jcb.test(cardNumber)) {
    return "jcb";
  }

  return undefined;
};

const CreditCardInputs = () => {
  const [showPreviewCard, setShowPreviewCard] = useState(
    "public/img/undefinedCard.png"
  );
  //Load Card info from Local Storage :
  let storageCardInfo = JSON.parse(localStorage.getItem("saveCard"));

  const [checkedSaveCard, setCheckedSaveCard] = useState(false);
  const [card, setCard] = useState(
    storageCardInfo || {
      cardNumber: null,
      cardHolder: null,
      expiryDate: null,
      cvv: null,
      type: null,
    }
  );

  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();

  // Only update Card type when Card number is updated
  const handleOnChange = (e) => {
    if (e.target.name == "cardNumber" && e.target.value) {
      setCard({
        ...card,
        type: creditType(e.target.value),
        [e.target.name]: e.target.value,
      });
    } else {
      setCard({
        ...card,
        [e.target.name]: e.target.value,
      });
    }
    console.log(card);
  };

  // Only update Preview Card Img  when Cardtype is changed
  useEffect(() => {
    console.log(previewCardImgs[card.type], card.type);
    setShowPreviewCard(previewCardImgs[card.type]);
  }, [card.cardNumber]);

  // Save Card Info
  const handleSaveCardInfo = (e) => {
    setCheckedSaveCard(!checkedSaveCard);
  };

  useEffect(() => {
    console.log(card);
    checkedSaveCard &&
      window.localStorage.setItem("saveCard", JSON.stringify(card));
    return () => {};
  }, [checkedSaveCard]);

  const [closeBtn, setCloseBtn] = useState(false);
  const { order } = useSelector((state) => state.order);

  return (
    <div className={`mt-4 ${closeBtn ? "hidden" : "block"}`}>
      {/* Close Btn */}
      <div
        className=" w-full flex justify-end -translate-y-[70px] pr-4"
        onClick={() => setCloseBtn(!closeBtn)}
      >
        {" "}
        <Icon
          className=" text-slate-500 font-thin text-xl "
          icon="material-symbols:close"
        />
      </div>
      <form autoComplete="true">
        <div className="flex gap-4 m-0 justify-between">
          {/* Group of inputs */}
          <div className=" w-1/2">
            {/* Card number */}
            <div className="relative mb-2 shadow-md shadow-gray-200">
              <input
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-500 rounded-[4px] border-1 border-solid
                outline-[1px] outline-[#1D1B20] outline-double  focus:outline-blue-600 "
                value={card.cardNumber}
                {...getCardNumberProps({ onChange: handleOnChange })}
                placeholder="000 0000 0000 000"
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-lg font-Roboto text-[#1D1B20] transform -translate-y-6 scale-75 top-2 z-10
                origin-[0] bg-white mx-2 px-2 left-1"
              >
                Card Number <span className=" text-[#E04141]">*</span>
              </label>
            </div>
            <div className="mb-5">
              {meta.isTouched &&
                meta.erroredInputs.cardNumber &&
                meta.error && (
                  <span className="text-xs text-red">Error: {meta.error}</span>
                )}
            </div>
            {/* Cardholder */}
            <div className="relative mb-6 shadow-md shadow-gray-200">
              <input
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-500 rounded-[4px] border-1 border-solid
                outline-[1px] outline-[#1D1B20] outline-double  focus:outline-blue-600"
                placeholder="YOUR FULL NAME "
                value={card.cardHolder}
                onChange={(e) =>
                  setCard({
                    ...card,
                    cardHolder: e.target.value,
                  })
                }
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-lg font-Roboto text-[#1D1B20] transform -translate-y-6 scale-75 top-2 z-10
                origin-[0] bg-white mx-2 px-2 left-1"
              >
                Cardholder Name <span className=" text-[#E04141]">*</span>
              </label>
            </div>
            {/* Expired date & CVV */}
            <div className="flex justify-between gap-4">
              <div className="relative mb-6 shadow-md shadow-gray-200">
                <input
                  id="floating_outlined"
                  name="expDate"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-500 rounded-[4px] border-1 border-solid
                outline-[1px] outline-[#1D1B20] outline-double  focus:outline-blue-600"
                  {...getExpiryDateProps({ onChange: handleOnChange })}
                  value={card.expiryDate}
                  type="tel"
                  maxLength="7"
                  placeholder="MM / YY"
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-lg font-Roboto text-[#1D1B20] transform -translate-y-6 scale-75 top-2 z-10
                origin-[0] bg-white mx-2 px-2 left-1"
                >
                  EXP date <span className=" text-[#E04141]">*</span>
                </label>
              </div>
              <div className="relative mb-6 shadow-md shadow-gray-200">
                <input
                  id="floating_outlined"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-500 rounded-[4px] border-1 border-solid
                outline-[1px] outline-[#1D1B20] outline-double  focus:outline-blue-600"
                  {...getCVCProps({ onChange: handleOnChange })}
                  value={card.cvc}
                  placeholder="123"
                  maxLength="3"
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-lg font-Roboto text-[#1D1B20] transform -translate-y-6 scale-75 top-2 z-10
                origin-[0] bg-white mx-2 px-2 left-1"
                >
                  CVV <span className=" text-[#E04141]">*</span>
                </label>
              </div>
            </div>

            {/* Show error notification */}
            <div className="mt-4 text-sm text-red-600">
              {console.log(meta.touchedInputs.cardNumber)}
              {meta.isTouched && meta.error && <span>Error: {meta.error}</span>}
            </div>

            {/* Save info  */}
            <div>
              <div className="flex gap-3">
                <input
                  className="flex items-start text-base font-Roboto font-medium text-[#344054]"
                  type="checkbox"
                  checked={checkedSaveCard}
                  name="remember"
                  onChange={handleSaveCardInfo}
                ></input>
                Save Card Information
              </div>

              <p className="text-sm font-Roboto font-normal text-[#667085] ml-6">
                Save my card details for future payment
              </p>
            </div>
          </div>

          {/* Card preview */}
          <div>
            <img
              src={showPreviewCard || "public/img/undefinedCard.png"}
              className="max-w-[300px] "
            ></img>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreditCardInputs;
