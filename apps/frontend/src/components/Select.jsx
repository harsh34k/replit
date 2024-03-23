// import { Button, Input } from "@material-tailwind/react";
// import { useState } from "react";
// import SelectDefault from "./Dropdown";

// export default function InputDefault() {
//     const [selectedValue, setSelectedValue] = useState("");
//     const [inputLable, setInputLable] = useState("")
//     const [userName, setUserName] = useState("")

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         //create seleceted value a global  variable and pass it to the server 

//         console.log(inputLable);
//         console.log(selectedValue);
//     }
//     return (
//         <div className="bg-red-50 w-screen h-screen flex justify-center items-center">
//             <form onSubmit={handleFormSubmit} method="post" className="flex ">
//                 <SelectDefault selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
//                 <Input label="Repl Name" value={inputLable} onChange={(e) => setInputLable(e.target.value)} />
//                 <Input label="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />

//                 <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="submit">submit</button>
//             </form>
//         </div>
//     );
// }

// // InputDefault.jsx
// import { Button, Input } from "@material-tailwind/react";
// import { useState } from "react";
// import SelectDefault from "./Dropdown";
// import { useSelectedValue } from '../SelectedValueContext';

// export default function InputDefault() {
//     const { setSelectedValue } = useSelectedValue();
//     const [inputLable, setInputLable] = useState("")
//     const [userName, setUserName] = useState("")

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         setSelectedValue(window.selectedValue);
//         console.log(window.selectedValue);

//         console.log(inputLable);
//         console.log(window.selectedValue);
//     }
//     return (
//         <div className="bg-red-50 w-screen h-screen flex justify-center items-center">
//             <form onSubmit={handleFormSubmit} method="post" className="flex ">
//                 <SelectDefault />
//                 <Input label="Repl Name" value={inputLable} onChange={(e) => setInputLable(e.target.value)} />
//                 <Input label="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />

//                 <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="submit">submit</button>
//             </form>
//         </div>
//     );
// }



import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import SelectDefault from "./Dropdown";
import { useSelectedValue } from '../SelectedValueContext'; // Importing useSelectedValue hook
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function InputDefault() {
    const { selectedValue, setSelectedValue } = useSelectedValue(""); // Using the useSelectedValue hook
    const [inputLable, setInputLable] = useState("")
    const [userName, setUserName] = useState("")
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();

            const data = {
                languageValue: selectedValue,
                replitName: inputLable,
            };
            const response = await axios.post('http://localhost:8000/', data)
            console.log("response", response);
            if (response.status !== 200) {
                console.error('Error: Unexpected status code:', response.status);
            }
            console.log("inputLbale", inputLable);
            // setSelectedValue(selectedValue); // Setting the selectedValue in the context
            navigate("/create-repl", {

                state: { selectedValue, inputLable, userName } // Pass variables as state
            });
            console.log(inputLable);
            console.log(selectedValue);
        } catch (error) {
            console.error('Error making POST request:', error);
        }
    }
    return (
        <div className="bg-red-50 w-screen h-screen flex justify-center items-center">
            <form onSubmit={handleFormSubmit} method="post" className="flex ">
                <SelectDefault selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                <Input label="Repl Name" value={inputLable} onChange={(e) => setInputLable(e.target.value)} />
                <Input label="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />

                <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="submit">submit</button>
            </form>
        </div>
    );
}
