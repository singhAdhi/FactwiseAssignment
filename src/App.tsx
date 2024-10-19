import './App.css';
import * as React from 'react';
import { useState } from 'react';
import SearchBar from './component/SearchBar';
import Accordian from './component/Accordian';
import data from './utils/celebrities.json';
interface updateDataType {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

function App() {
  const [searchName, setSearch] = useState<string>("");
  const [updateData, setUpdatedData] = useState<updateDataType[]>(data);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value; 
    setSearch(searchTerm);  
  
    if (searchTerm) {
      let filteredData = data.filter((item) =>
        `${item.first} ${item.last}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUpdatedData(filteredData);  
    } else {
      setUpdatedData(data);  
    }
  }

  function deleted(id:number) { 
    let deletedUser = updateData.filter((item) => item.id !== id);
    setUpdatedData(deletedUser);
  }

  function edit(id:number, obj:Partial<updateDataType>) { 
    let updatedArray = updateData.map((item) =>
      item.id === id
        ? { ...item, ...obj } 
        : item
    );
    setUpdatedData(updatedArray); 
  }
 
  function discard(id:number) { 
    // Create a copy of the original data to revert back to if needed
  const originalData = data;

  const updatedArray = updateData.map((item) => {
    if (item.id === id) {
      return { ...item, isChanged: true }; // Mark as changed
    }
    return item; // Return unchanged item
  });

  setUpdatedData(updatedArray); // Update state
  }
  
  console.log(updateData);
  
  return (
    <div className="flex justify-center"> 
      <div className="flex flex-col justify-center max-w-xl w-full"> 
        <h1 className='text-2xl font-bold mb-4'>List View</h1>
        <div className='p-4'>
          <SearchBar value={searchName} onChange={handleChange} />
          {updateData && updateData.map((item) => (
            <Accordian 
              key={item.id} 
              content={item} 
              handleDelete={deleted} 
              handleEdit={edit} 
              handleDiscard={discard} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
