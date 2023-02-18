import React,{useEffect,useState} from "react";
import Platforms from "./components/Platforms";
import Navbar from './components/Navbar';

function App() {
  // Notification.requestPermission();

  // componentDidMount() {
  //   if (!("Notification" in window)) {
  //     console.log("Browser does not support desktop notification");
  //   } else {
  //     Notification.requestPermission();
  //   }
  //

  function consoleMessage(text){
    chrome.runtime.sendMessage({console:true, content:text})
    .then((res)=>{})
  }

  let [platformData, setPlatformData] = useState(null);
  let [change,setChange] = useState(0)

  async function sendDataMessage(){
    const response = await chrome.runtime.sendMessage({mess: "giveData"})
    // consoleMessage(response)
    // arr = arr2.filter((el)=>response.data[el])
    setPlatformData(response.data)
    setChange(change+1)
  }

  useEffect(() => {
      sendDataMessage()
  }, []);

  function removePlatform(platform){
    // platformData[platform]=false
    const index = platformData.indexOf(platform);
    if (index > -1) {
      platformData.splice(index, 1);
    }
    setPlatformData(platformData)
    setChange(change+1)
    consoleMessage(platformData)
    chrome.runtime.sendMessage({mess:'removeData',platform:platform})
    .then((res)=>{})
  }

  function addPlatform(platform){
    // platformData[platform]=true
    if(!platformData.includes(platform))
      platformData.push(platform)
    setPlatformData(platformData)
    setChange(change+1)
    consoleMessage(platformData)
    chrome.runtime.sendMessage({mess:'addData',platform:platform})
    .then((res)=>{})
  }

  return (
    <>
    {platformData &&
      <div className="max-h-[32] overflow-y-scroll w-80 bg-dark-main">
        <Navbar key={change} platformData={platformData} addPlatform={addPlatform} removePlatform={removePlatform} />
        <Platforms key={change+1} arr={platformData} />
      </div>
    }
    </>
  );
}

export default App;
