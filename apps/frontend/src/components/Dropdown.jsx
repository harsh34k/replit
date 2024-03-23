

import React, { useState } from "react";


export default function SelectDefault({ selectedValue, setSelectedValue }) {
    // const [selectedValue, setSelectedValue] = useState("");
    const [labelText, setlabelText] = useState("");

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
        setlabelText("Select language");
    };
    // const handleSelectClick = (event) => {

    // };

    return (
        <div className="relative h-15 w-72 min-w-[200px]">
            <label

                className={` ${selectedValue ? "before:content[' '] after:content[' '] pointer-events-none absolute left-2 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all" : ""}`}
            >
                {labelText}
            </label>
            <select
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                // onClick={handleSelectClick}
                onChange={handleSelectChange}
                value={selectedValue}
            >
                <option value="" disabled hidden>
                    Select language
                </option>
                <option value="node">node js</option>
                <option value="python">python</option>

            </select>

        </div>
    );
}

