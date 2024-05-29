import React, { useState } from 'react';
import GenderCheckbox from './GenderCheckbox';
import { Link } from "react-router-dom";
import useSignup from '../../Hooks/useSignup';

const SignUp = () => {
  const [inputs, SetInputs] = useState({
    fullname:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:'',
  });
  const { loading ,signup } = useSignup();
  
  const handleCheckboxChange = (gender) => {
    SetInputs({...inputs, gender});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  
  return (
    <div className='flex flex-col   bg-slate-950 items-center justify-center min-w-86 mx-auto'>
      <div className='w-full p-6 rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-20'>
        <h1 className='text-3xl font-semibold text-center text-gray-200 mb-6'>
          Sign Up for <span className='text-blue-500'>Chat App</span>
        </h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className='text-base text-gray-300'>Full Name</label>
            <input
              type='text'
              placeholder='Full name'
              className='w-full input input-bordered h-12 rounded-lg px-4'
              value={inputs.fullname}
              onChange={(e)=> SetInputs({...inputs,fullname:e.target.value})}
            />
          </div>
          <div>
            <label className='text-base text-gray-300'>Username</label>
            <input
              type='text'
              placeholder='Username'
              className='w-full input input-bordered h-12 rounded-lg px-4'
              value={inputs.username}
              onChange={(e)=> SetInputs({...inputs,username:e.target.value})}
            />
          </div>
          <div>
            <label className='text-base text-gray-300'>Password</label>
            <input
              type='password'
              placeholder='Password'
              className='w-full input input-bordered h-12 rounded-lg px-4'
              value={inputs.password}
              onChange={(e)=> SetInputs({...inputs,password:e.target.value})}
            />
          </div>
          <div>
            <label className='text-base text-gray-300'>Confirm Password</label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-12 rounded-lg px-4'
              value={inputs.confirmPassword}
              onChange={(e)=> SetInputs({...inputs,confirmPassword:e.target.value})}
            />
          </div>
          
          {/* Gender Checkbox */}
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>
          
          <Link
            to={"/login"}
            className='text-sm hover:underline text-gray-300 hover:text-blue-600 inline-block'
          >
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-4 bg-blue-500 text-white hover:bg-blue-600' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
