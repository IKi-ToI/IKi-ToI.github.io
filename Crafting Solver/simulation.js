//get gud
var pProgress;
var pQuality;
//gets input for player Stats
function getPlayerStats(){
    pProgress = document.getElementById("progress").value;
    pQuality = document.getElementById("quality").value;
    //checks for veracity of the given inputs
    if(pProgress<=0){
        updateLog("progress must be greater then 0");
        return;
    }
    if(pQuality<=0){
        updateLog("quality must be greater then 0");
        return;
    }
    updateLog("progress saved: "+ pProgress);
    updateLog("quality saved: "+ pQuality);
}

function test(){
    document.getElementById("prog").value += 5;
}
// updates log with the action that happends last
function updateLog(log){
    document.getElementById("logP").innerText += "\n" +log;
}
//clears string of the log paragraf
function resetLog(){
    document.getElementById("logP").innerHTML = "";
}

