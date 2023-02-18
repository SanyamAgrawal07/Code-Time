import React from "react";
import { format } from 'date-fns';

function Contest(props) {
    const contest = props.Contest

    // function consoleMessage(text){
    //     chrome.runtime.sendMessage({console:true, content:text})
    //     .then((res)=>{})
    // }

    function getTime(duration){
        const min = duration/60
        if(min%60===0){
            return (`${min/60} hr`)
        }
        else{
            return (`${Math.floor(min/60)} hr ${min%60} min`)
        }
    }

    return (
        <div className="w-full h-fit justify-center mb-2 duration-300 hover:border-solid hover:border-l-4 hover:border-b-2 hover:border-green-theme">
            <div className="p-2 ml-4 mr-4 text-normal border-solid border-b-2 border-lines hover:text-white hover:border-0">
                <div className="flex justify-between">
                    {/* <p className="font-nun w-60 overflow-hidden">{contest.name}</p> */}
                    <a className="font-nun duration-300 hover:text-light-green" href={contest.url} target='_blank' rel="noopener noreferrer">{contest.name}</a>
                </div>
                <div className="flex justify-between mt-2">
                    {/* <p class="font-nun">{format(new Date(contest.start_time).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'}),'d MMM')}</p> */}
                    <p className="font-nun text-sm">{format(new Date(contest.start_time),'h:mm a, dd MMM')}</p>
                    <p className="font-nun text-sm">{getTime(contest.duration)}</p>
                </div>
            </div>
        </div>
    );
  }

export default Contest;