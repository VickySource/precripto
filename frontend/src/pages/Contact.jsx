import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-3xl">
        <p className="text-gray-600">
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 justify-center mt-10">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col gap-6 text-gray-600 justify-center items-start">
          <b>OUR OFFICE</b>
          <p>C-section Admin
12345 Dispensary station 893, AIML, Pesce 
</p>
          <p>Tel: +91 8210097657
abcdpesce@gmail.com</p>
          <b>CAREERS AT PRESCRIPTO</b>
          <p>Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white translate-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
