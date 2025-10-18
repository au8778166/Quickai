import React from "react";
import { assets } from "../assets/assets";
 // 🖼️ Replace with your actual logo path

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        {/* Logo and About Section */}
        <div className="md:max-w-96">
          <img src={assets.logo} alt="Logo" className="w-40 h-auto" />
          <p className="mt-6 text-sm">
          Experience the power of AI with QuickAi. <br />Transform your 
          content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
          </p>
        </div>

        {/* Company Links + Newsletter */}
        <div className="flex-1 flex items-start md:justify-end gap-20">
          {/* Company Links */}
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-5">
              Subscribe to our Quickai
            </h2>
            <div className="text-sm space-y-2">
              <p>
                Make your life easy.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-blue-600 w-24 h-9 text-white rounded hover:bg-blue-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2025 ©{" "}
        <a
          href="#"
          className="text-blue-600 hover:underline"
        >
          Quickai
        </a>
        . All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;



