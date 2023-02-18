import React,{useState,useEffect} from "react";
import Checkbox from './Checkbox'

function Settings() {

    // function stopNotification(){
    //     notification.close()
    // }

    function consoleMessage(text){
        chrome.runtime.sendMessage({console:true, content:text})
        .then((res)=>{})
    }

    // let validPhone = false

    function showNotification() {
        chrome.runtime.sendMessage({mess: "sendNotification"})
        .then((response)=>{
        })
    }

    // function takePhoneNumber(){
    //     const $phone = document.querySelector('#phone-number').value
    //     consoleMessage($phone)
    //     validPhone=true
    // }

    let [platformData, setPlatformData] = useState(null);
    let [validated, setValidated] = useState(null);
    let [phone, setPhone] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        let value = e.target.value
        const regexExp = /^[6-9]\d{9}$/gi;
        if(regexExp.test(value)){
            setPhone('91'+value)
            setValidated(true)
        }
        else{
            setValidated(false)
        }
    }

    async function sendDataMessage(){
        const response = await chrome.runtime.sendMessage({mess: "giveData"})
        setPlatformData(response.data)
    }

    useEffect(() => {
        sendDataMessage()
    }, []);

    return (
        <>
            {platformData &&
                <div className="overflow-hidden">
                    <h2>This is the settings page</h2>
                    <Checkbox label="Codeforces" data={platformData}/>
                    <Checkbox label="Codechef" data={platformData}/>
                    <Checkbox label="Leetcode" data={platformData}/>
                    <Checkbox label="Atcoder" data={platformData}/>
                    <button className="bg-green-200 hover:bg-red-200" onClick={showNotification}>Send notif</button>
                    {/* {phone==='' &&
                    <div>
                        <form onSubmit={handleSubmit}>
                        <label>Phone Number:
                            <input 
                            type="text" 
                            value={phone}
                            placeholder="Enter your mobile number"
                            onChange={}
                            />
                        </label>
                        <input type="submit"  />
                        
                        </form>
                    </div>
                    }
                    {phone!=='' &&
                    <p>Notifications have been enabled</p>
                    }
                    {validated===false &&
                    <p>Invalid phone number</p>
                    } */}
                </div>
            }
        </>
    );
}

export default Settings;