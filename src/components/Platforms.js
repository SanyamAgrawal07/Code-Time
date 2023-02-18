import React from "react";
import Platform from "./Platform";

function Platforms({arr}) {
    return (
        <>
            {arr.map((item, index) => (
                <div key={index} className="mb-4 overflow-hidden">
                    {item==='codeforces' && 
                        <p className="font-[525] ml-4 text-lg text-heading font-mont">Codeforces</p>
                    }
                    {item==='code_chef' &&
                        <p className="font-[525] ml-4 text-lg text-heading font-mont">Codechef</p>
                    }
                    {item==='leet_code' && 
                        <p className="font-[525] ml-4 text-lg text-heading font-mont">Leetcode</p>
                    }
                    {item==='at_coder' &&
                        <p className="font-[525] ml-4 text-lg text-heading font-mont">Atcoder</p>
                    }
                    <Platform Platform={item} />
                </div>
            ))}
        </>
    );
  }

export default Platforms;