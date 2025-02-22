
import './App.css'

import male from "./assets/male.jpg"
import female from "./assets/female.jpg"
import { useState } from 'react'

function App() {

  const [image, setImage] = useState(male);
  const handleImageChange = (e:any) => {
    const selected = e.target.value;
    if (selected === "male") {
      setImage(male);
    } else if (selected === "female") {
      setImage(female);
    }
  };

  return (
    <><div className='flex justify-center'>
      <div className='max-w-7xl '>
        <div className='m-6'>
          <div className="bg-secondary px-10 py-4 shadow-[8px_8px_0px_#FFF9BF] font-bold"><h1 className='text-[#fffff0] text-xl'>Just Book It  <span>- 10 Spots Left</span></h1></div>
          
        </div>
        <div className=' bg-secondary shadow-[8px_8px_0px_#FFF9BF] p-4 space-y-2'>
          <div className='flex justify-center '>
        
            <img src={image} alt="image" className='w-40 h-45 rounded-2xl' />
        
          </div>
          <div className='px-10 py-2 text-[#fffff0] space-y-2'>
            <div className='flex space-x-2'>
            <h1 className='font-bold'>Name:</h1>
            <input type="text" name="name" id="name" placeholder='Your Name' className='border-1 rounded-2xl px-2'/>
          
            </div>
            <div className='flex space-x-2'>
              <h1 className='font-bold'>Gender:</h1>
              <select name="" id="" className="border-1 rounded-2xl px-2" onChange={(e) => {
               handleImageChange(e)
              }}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                {image}
              </select>
            </div>
            <div className='flex justify-center mt-4'>
              <button className='bg-primary hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition ease-in-out font-bold  px-4 py-2 shadow-[4px_4px_0px_#FFF9BF]' >Book</button>
            </div>
          </div>
        </div>
      </div>
    
    </div></>
  )
}

export default App
