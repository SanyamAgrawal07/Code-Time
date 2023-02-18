import React from "react";
import Button from './Button.js';

function Navbar({platformData,addPlatform,removePlatform}) {
    return (
        <div className="overflow-hidden">
            <div className="flex justify-between">
                {/* <Link to=''> */}
                    <h2 className="font-mont text-white text-xl font-bold ml-4 mb-3">Welcome Coder!</h2>
                {/* </Link> */}
                {/* <Link to='/settings'> */}
                    <img src="/settings.svg" className="w-7 h-7 duration-300 hover:scale-110" alt="" />
                {/* </Link> */}
            </div>
            {platformData && 
                <div className="flex mb-2">
                    <Button label="Codeforces" present={platformData.includes('codeforces')} addPlatform={addPlatform} removePlatform={removePlatform} ></Button>
                    <Button label="Codechef" present={platformData.includes('code_chef')} addPlatform={addPlatform} removePlatform={removePlatform} ></Button>
                    <Button label="Leetcode" present={platformData.includes('leet_code')} addPlatform={addPlatform} removePlatform={removePlatform} ></Button>
                    <Button label="Atcoder" present={platformData.includes('at_coder')} addPlatform={addPlatform} removePlatform={removePlatform} ></Button>
                </div>
            }
        </div>
    );
  }

export default Navbar;