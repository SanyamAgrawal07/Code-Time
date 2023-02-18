import React,{ useState } from "react";

const Checkbox = ({label,data}) => {
    let official
    if(label==='Codeforces') official='codeforces'
    if(label==='Codechef') official='code_chef'
    if(label==='Leetcode') official='leet_code'
    if(label==='Atcoder') official='at_coder'

    const present = data[official]

    const [isChecked, setIsChecked] = useState(present);

    function handleToggle(){
        if(isChecked){
            chrome.runtime.sendMessage({mess:'removeData',platform:official})
            .then((res)=>{})
        }
        else{
            chrome.runtime.sendMessage({mess:'addData',platform:official})
            .then((res)=>{})
        }
        setIsChecked((prev) => !prev)
    }

    return (
        <div className="checkbox-wrapper">
        <label>
            <input type="checkbox" className="appearance-none ml-4 h-4 w-4 rounded mr-2 cursor-pointer border-2 border-black border-solid checked:relative checked:bg-red-200" onChange={handleToggle} checked={isChecked}/>
            <span>{label}</span>
        </label>
        </div>
    );
};
export default Checkbox;