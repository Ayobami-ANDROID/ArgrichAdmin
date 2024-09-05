import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { signinValidate } from "../services";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import icon from "../assets/Argrich Logo Full 00.png";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import { toast, Bounce } from "react-toastify";

import { PulseLoader } from "react-spinners";

const Login = () => {
  const [toggle, settoggle] = useState(false);
  



 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidate,  
    onSubmit: (values) => {
    
    
      
    },
  });
  return (
    <div className="bg-[#F5FFF9] flex flex-col items-center py-10 px-10 min-h-screen ">
       
      <img alt="Your Company" src={icon} className="mx-auto h-10 w-auto mb-6" />
      <div className="bg-[#fff] rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px]  px-16 py-5 lg:w-[35%] w-[80%] shadow-lg">
        <h1 className="font-[500] text-[25px] text-[#005C2D] mb-8 text-center">Login to your account</h1>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <InputField
              label={`Email address`}
              name={`email`}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
              errorText={formik.errors.email}
              placeHolder={`Enter Your E-mail Address`}
            />
          </div>

          <div>
            <div className="relative">
              <InputField
                label={`Password`}
                name={`password`}
                type={toggle ? "text" : "Password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                errorText={formik.errors.password}
                placeHolder={"••••••••"}
                onBlur={formik.handleBlur}
              />
              <div className="absolute text-[#005C2D] inset-y-[2.8rem] right-3 text-lg ">
                {" "}
                {toggle ? (
                  <RiEyeFill
                    onClick={() => {
                      settoggle(!toggle);
                    }}
                  />
                ) : (
                  <RiEyeOffFill
                    onClick={() => {
                      settoggle(!toggle);
                    }}
                  />
                )}
              </div>
              <div className="flex justify-between">
                <div></div>
                {/* <div>
                  <Link to="/auth/recover-password" className="text-[rgb(79,70,229)]">Forgot Password?</Link>
                </div> */}
              </div>

            </div>
          </div>
          <div>
            
              {" "}
              <button
                type="submit"
                className="hover:bg-[#2A4F1A] bg-[#005C2D] py-2 shadow-[0_1px_2px_0_rgba(16,_24,_40,_0.05)] w-full p-1 mt-4 text-white rounded-[5px]"
              >
                Login
              </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
