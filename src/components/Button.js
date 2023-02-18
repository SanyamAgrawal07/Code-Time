import React,{ useState } from "react";

const Button = ({label,present,addPlatform,removePlatform}) => {
    let official
    if(label==='Codeforces') official='codeforces'
    if(label==='Codechef') official='code_chef'
    if(label==='Leetcode') official='leet_code'
    if(label==='Atcoder') official='at_coder'

    let [isSelected, setIsSelected] = useState(present);

    function handleToggle(){
        if(isSelected){
            removePlatform(official)
        }
        else{
            addPlatform(official)
        }
        setIsSelected((prev) => !prev)
    }

    return (
        <div className="text-normal">
            {isSelected &&
                <p className="ml-4 mr-2 cursor-pointer bg-red hover:bg-blue" onClick={handleToggle}>{label}</p>
            }
            {!isSelected &&
                <p className="ml-4 mr-2 cursor-pointer hover:bg-blue" onClick={handleToggle}>{label}</p>
            }
        </div>
    );
};
export default Button;