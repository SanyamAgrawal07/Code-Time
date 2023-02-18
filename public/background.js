async function fetchDataFromServer(){
    try{
        console.log('inside fetch')
        let totalData={}
        let ct=0;
        let response
        while(ct<3){
            response = await fetch('https://codetime-data-server.onrender.com/')
            if(!response.ok) ct++;
            else ct=4
        }
        if(ct===3) throw new Error('could not fetch')
        const data = await response.json()
        totalData=data
        console.log(totalData)
        const arr = ['codeforces','code_chef','leet_code','at_coder']
        arr.forEach((platform)=>{
            let contestData = totalData[platform]
            contestData = contestData.filter((ele)=>ele.status==="BEFORE")
            contestData.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1)
            contestData=contestData.slice(0,2)
            totalData[platform] = contestData
        })
        chrome.storage.local.set({'totalData': totalData}, () => {
            console.log('Total data stored in memory')
        });
        return {totalData}
    }
    catch(e){
        console.log('Could not fetch data',e)
        return {err:true}
    }
}

// chrome.runtime.onStartup.addListener(() => {
//     console.log('onStartup....')
//     chrome.alarms.clearAll()
//     .then((res)=>{
//         console.log(res)
//     })
//     chrome.alarms.create('apiData',{
//         periodInMinutes: 30
//     })
//     fetchDataFromServer()
//     .then((response)=>{
//         if(response.err) throw new Error('Manual Error')
//         console.log('data has been set on startup')
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
//   });

chrome.tabs.onActivated.addListener(()=>{
    fetchDataFromServer()
    .then((response)=>{
        if(response.err) throw new Error('Manual Error')
        console.log('data has been set')
    })
    .catch((e)=>{
        console.log('some error in fetch function',e)
    })
})

chrome.runtime.onInstalled.addListener(()=>{
    console.log('I am working')
    const settings = ['codeforces','code_chef','leetcode']

    chrome.storage.local.set({'codeTimePlatforms': settings}, () => {
        console.log('Stored arr')
    });

    // chrome.storage.local.set({'lastRequest': new Date.getTime()})

    fetchDataFromServer()
    .then((response)=>{
        if(response.err) throw new Error('Manual Error')
        console.log('data has been set')
    })
    .catch((e)=>{
        console.log('some error in fetch function',e)
    })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{

    if(request.console){
        console.log(request.content)
    }

    if(request.mess==='giveApiData'){
        let totalData={}
        chrome.storage.local.get(['totalData'], (result) => {
            if (chrome.runtime.lastError)
                console.log('Error getting');
            totalData=result.totalData
            const data = totalData[request.platform]
            sendResponse({data:data,mess:'hereApiData'})
        })
        return true
    }
    
    if(request.mess==='giveData'){
        chrome.storage.local.get(['codeTimePlatforms'], (result) => {
            if (chrome.runtime.lastError)
                console.log('Error getting');
            
            sendResponse({mess:'hereData',data: result.codeTimePlatforms})
        });
        return true
    }
    if(request.mess==='addData'){
        chrome.storage.local.get(['codeTimePlatforms'], (result) => {
            if (chrome.runtime.lastError)
                console.log('Error getting');
            
            let settings=result.codeTimePlatforms
            settings.push(request.platform)
            chrome.storage.local.set({'codeTimePlatforms': settings}, () => {});
        });
    }
    if(request.mess==='removeData'){
        chrome.storage.local.get(['codeTimePlatforms'], (result) => {
            if (chrome.runtime.lastError)
                console.log('Error getting');
            
            let settings=result.codeTimePlatforms
            const index = settings.indexOf(request.platform);
            if (index > -1) {
              settings.splice(index, 1);
            }
            chrome.storage.local.set({'codeTimePlatforms': settings}, () => {});
        });
    }
    if (request.mess === "sendNotification"){
        chrome.notifications.create('NOTFICATION_ID', {
            type: 'basic',
            iconUrl: 'favicon.ico',
            title: 'notification title',
            message: 'notification message',
            priority: 2
        })
        sendResponse('sent');
    }
});