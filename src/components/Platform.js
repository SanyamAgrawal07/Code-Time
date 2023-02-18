import React,{useEffect,useState} from "react";
import Contest from "./Contest";

function Platform(props) {
    const site = props.Platform

    let [contestData, setContestData] = useState(null);

    function consoleMessage(text){
        chrome.runtime.sendMessage({console:true, content:text})
        .then((res)=>{})
    }

    async function getData(){
        const response = await chrome.runtime.sendMessage({mess:'giveApiData',platform:site})
        consoleMessage(response)
        // consoleMessage(response.data)
        setContestData(response.data)
    }
    consoleMessage(site)
    useEffect(() => {
        getData()
    }, []);

    return (
        <div>
            {contestData &&
            contestData.map((item,index)=>{
                return <Contest key={index} Contest={item} />
            })}
        </div>
    );
  }

export default Platform;