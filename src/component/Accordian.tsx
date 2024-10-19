import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"


interface contentType { 
  country: string,
  description: string,
  dob: string,
  first: string,
  gender: string,
  id: number,
  last: string,
  picture: string,
}

interface AccordianType { 
  content: contentType,
  handleDelete:(id:number)=>void,
  handleEdit: (id:number,obj: Partial<contentType>) => void,
  handleDiscard:(id:number)=>void
}

const Accordian:React.FC<AccordianType> = ({ content, handleDelete, handleEdit, handleDiscard }) => {
  const { country, description, dob, first, gender, id, last, picture } =
    content;

  const [editableContent, setEditableContent] = useState<contentType>({
    first: first,
    last: last,
    age: calculateAge(dob),
    gender: gender,
    country: country,
    description: description,
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement| HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setEditableContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    handleEdit(id, editableContent);
    setIsEditMode(false);
  }

  function calculateAge(dob) {
    let birthDate = new Date(dob);
    let currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    let monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  function validation() { 

  }
  
 console.log(editableContent.country)
  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white mb-4"
    >
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger>
            <div className="flex items-center gap-4 cursor-pointer">
              <img
                src={picture}
                alt="Profile"
                className="w-12 h-12 rounded-full border border-gray-200"
              />
              <span className="text-xl font-bold">
                {editableContent.first} {editableContent.last}
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="mt-4 space-y-4">
              <div className="flex flex-row justify-between gap-2">
                <div className="flex items-start gap-2 flex-col">
                  <label className="text-gray-600">Age</label>
                  <input
                    type="text"
                    name="age"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    value={editableContent.age}
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                </div>

                <div className="flex items-start gap-2 flex-col">
                  <label className="text-gray-600">Gender</label>
                  <select
  name="gender"
  className="border border-gray-300 rounded-lg p-2 w-full"
  value={editableContent.gender}  
  onChange={handleChange}         
  disabled={!isEditMode}
>
  <option value="Rather not say">Rather not say</option>
  <option value="Male">male</option>
  <option value="Female">female</option>
</select>

                </div>

                <div className="flex items-start gap-2 flex-col">
                  <label className="text-gray-600">Country</label>
                  <input
                    type="text"
                    name="country"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    value={editableContent.country}
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                </div>
              </div>
              <div className="flex items-start gap-2 flex-col">
                <label className="text-gray-600">Description</label>
                <textarea
                  name="description"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={editableContent.description}
                  onChange={handleChange}
                  rows="5"
                  disabled={!isEditMode}
                />
              </div>
            </div>

            {isEditMode ? (
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => handleDiscard(id)}
                >
                  <svg
                    className="w-6 h-6 inline-block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M6 18L18 6"
                    ></path>
                  </svg>
                </button>
                <button
                  type="submit"
                  className="text-green-500 hover:text-green-700"
                >
                  <svg
                    className="w-6 h-6 inline-block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setIsEditMode(true)}
                >
                  Edit
                </button>
                  <AlertDialog>
  <AlertDialogTrigger>Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
      
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => handleDelete(id)} className="bg-red-500 hover:bg-red-700">Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  );
};

export default Accordian;
