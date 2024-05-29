// import React from 'react'
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from '../../Hooks/useGetConversations'
// import { FaSearch } from "react-icons/fa";
const SearchInputs = () => {
  const [search , setSearch] =  useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations}=  useGetConversations();

  const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
      // return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} 
    else
    toast.error("No such user found!");
	};
  return (
    <form  onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input type='text'
         placeholder='Search…' 
         className='input input-bordered rounded-full'
         value={search}
         onChange={(e) => setSearch(e.target.value)}
        />
    <button className='btn btn-circle bg-sky-500 text-white'>
    <FaSearch />
    {/* <FaSearch /> */}

    </button>
    </form>
  )
}

export default SearchInputs
