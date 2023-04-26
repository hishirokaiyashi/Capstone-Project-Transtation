import React from "react";

const categories = [
  {
    title: "FAQ",
    content: [
      "When will I receive my booking confirmation?",
      "How can I cancel my booking?",
      "How do I track my payment history?",
      "How long do I have to wait to get my refund?",
      "How can I remove my card information?",
    ],
  },
  {
    title: "Terms Of Use",
    content: ["Terms and Conditions", "Privacy Policy", "Cookies Policy"],
  },
  {
    title: "Customer Hotline",
    content: ["Domestic Customers", "1900 1089  (Toll-free)"],
  },
  {
    title: "Available in 14 provinces & cities",
    content: [
      "Ho Chi Minh City",
      "Can Tho City",
      "Binh Duong Province",
      "Dong Nai Province",
      "Ba Ria - Vung Tau",
      "Bac Lieu Province",
      "Long An Province",
      "Ben Tre Province",
      "Tien Giang Province",
      "An Giang Province",
      "Ca Mau Province",
      "Vinh Long Province",
      "Dong Thap Province",
      "Tay Ninh Province",
    ],
  },
];

const Footer = () => {
  return (
    <div className=" bg-white">
      {/* Layout */}
      <div className="max-w-screen-xl mx-auto my-6">
        {/* Container */}
        <div className="h-64">
          {/* Grid of Content */}
          <div className="flex gap-6 justify-between">
            {categories.map((section) => (
              <div key={section.title}>
                <p className=" font-Ballo text-xl font-medium mb-2">
                  {section.title}
                </p>
                <div
                  className={
                    section.title === "Available in 14 provinces & cities"
                      ? `grid grid-cols-2 gap-x-8`
                      : ``
                  }
                >
                  {section.content.map((item, index) => (
                    <div
                      key={index}
                      className=" font-Amata text-xs leading-[22px] text-[#6A6A6B] font-thin hover:cursor-pointer hover:opacity-50"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex gap-2 mt-2">
              <svg
                width="29"
                height="30"
                viewBox="0 0 29 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="14.4728"
                  cy="15.0316"
                  r="12.9728"
                  stroke="#F07272"
                  strokeWidth="3"
                />
                <path
                  d="M14.6242 13.8627C14.6242 14.2827 14.5108 14.6627 14.2842 15.0027C14.0575 15.3427 13.7275 15.5927 13.2942 15.7527L14.8242 18.6327H12.3442L11.1242 16.1227H10.3042V18.6327H8.09417V11.7527H12.3042C12.7975 11.7527 13.2175 11.8494 13.5642 12.0427C13.9175 12.2294 14.1808 12.486 14.3542 12.8127C14.5342 13.1327 14.6242 13.4827 14.6242 13.8627ZM12.3742 13.9527C12.3742 13.7727 12.3142 13.6227 12.1942 13.5027C12.0742 13.3827 11.9275 13.3227 11.7542 13.3227H10.3042V14.5927H11.7542C11.9275 14.5927 12.0742 14.5327 12.1942 14.4127C12.3142 14.286 12.3742 14.1327 12.3742 13.9527ZM19.7495 13.5127V18.6327H17.5395V13.5127H15.2795V11.7527H21.9995V13.5127H19.7495Z"
                  fill="#E04141"
                />
              </svg>

              <div>
                <div className="font-Besley text-xs font-normal pb-[3px] border-b-[1px] border-b-red-400">
                  Vietnam Roadtrip
                </div>
                <p className="font-Besley pt-0 text-[7px] font-thin ">
                  ANYWHERE, ANYTIME
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
