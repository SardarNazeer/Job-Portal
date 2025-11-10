import React, { useEffect, useRef, useState } from "react";
import Quill from 'quill'
import { JobCategories, JobLocations } from "../assets/assets";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Karachi");
  const [level, setLevel] = useState("Beginner Level");
  const [category, setCategory] = useState("Programming");
  const [sallery, setSallery] = useState(0);

  const editorRef = useRef(null)
  const quilRef = useRef(null)

  useEffect(() =>{
    // initilize quil only once 
    if (!quilRef.current && editorRef.current) {
        quilRef.current = new Quill(editorRef.current,{
            theme:'snow',
        })
        
    }
  },[])

  return (
    <form className="container p-4 flex flex-col w-full items-start gap-3">
      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input
          type="text"
          placeholder="type here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
        />
      </div>

      <div className="w-full max-w-lg">
        <p className="my-2">Job Description</p>
        <div ref={editorRef}>

        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">

        <div>
            <p className="mb-2">Job Category</p>
            <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" onChange={e=> setCategory(e.target.value)}>
                {JobCategories.map((category,index)=>(
                    <option value={category} key={index} >{category}</option>
                ))}
            </select>
        </div>

        <div>
            <p className="mb-2">Job Location</p>
            <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" onChange={e=> setCategory(e.target.value)}>
                {JobLocations.map((location,index)=>(
                    <option value={location} key={index} >{location}</option>
                ))}
            </select>
        </div>

        <div>
            <p className="mb-2">Job Level</p>
            <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" onChange={e=> setLevel(e.target.value)}>
                <option value="Beginner Level">Beginner Level</option>
                <option value="Intermediate Level">Intermediate Level</option>
                <option value="Senior Level">Senior Level</option>

            </select>
        </div>


      </div>

      <div>
        <p className="mb-2">Job Sallery</p>
        <input min={0} className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]" onChange={e=> setSallery(e.target.value)} type="Number" placeholder="2500"/>
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white rounded">Add</button>


    </form>
  );
};

export default AddJob;
