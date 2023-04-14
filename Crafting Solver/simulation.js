class Ability {
    name;
    progress;
    quality;
    durability;
    cp;
    condition;
    buff;

    constructor(name, progress, quality, durability, cp, condition, buff) {
        this.name = name;
        this.progress = progress;
        this.quality = quality;
        this.durability = durability;
        this.cp = cp;
        this.condition = condition;
        this.buff = buff;
    }
    //checks if the Ability is valid
    useAbility(currentCP, currentDurability) {
        if(currentCP<this.cp){
            return "not enough CP";
        }
        if(currentDurability<=5) {
            return "craft is already finished";
        }
        console.log(this.name, "something went wrong :( but at least we got here :)")
        return true;
    }

    //updates all parameters of the craft
    updateCraft(currentCP, currentDurability, currentQuality, currentProgress, buffs){
        var modifierDurability = 1;
        //checks for any modifier Buffs and adjuts
        for(let i = 0; i < buffs.length; i++){

            if(String(buffs[i]) === String("Waste Not")){

                modifierDurability = 0.5;
            }
        }
        
        return [currentCP-this.cp, currentDurability-this.durability*modifierDurability, currentQuality+this.quality, currentProgress+this.progress];
    }

}
/*---------------GETTING VALUES--------------*/
//get gud
var playerProgress = 100;
var playerQuality = 50;
var playerCP = 500;

//gets input for player Stats
function getPlayerStats(){
    playerProgress = document.getElementById("progress").value;
    playerQuality = document.getElementById("quality").value;
    playerCP = document.getElementById("cp").value;
    //checks for veracity of the given inputs
    if(playerProgress<=0){
        updateLog("progress must be greater then 0");
        return;
    }
    if(playerQuality<=0){
        updateLog("quality must be greater then 0");
        return;
    }
    if(playerCP<=0){
        updateLog("CP must be greater then 0");
        return;
    }
    updateLog("progress saved: "+ playerProgress);
    updateLog("quality saved: "+ playerQuality);
    updateLog("CP saved: "+ playerCP);
    breakLineLog();
}
//gets craft Stats
function getCraftStats(){
    craftProgress = parseInt(document.getElementById("cprogress").value);
    craftQuality =  parseInt(document.getElementById("cquality").value);
    craftDurability =  parseInt(document.getElementById("durability").value);
    if(craftProgress<=0){
        updateLog("progress must be greater then 0");
        return;
    }
    if(craftQuality<=0){
        updateLog("quality must be greater then 0");
        return;
    }
    if(craftDurability<=0){
        updateLog("Durability must be greater then 0");
        return;
    }
    setCraftStats(craftProgress,craftQuality,craftDurability);

    updateLog("progress saved: "+ craftProgress);
    updateLog("quality saved: "+ craftQuality);
    updateLog("durability saved: "+ craftDurability);
    breakLineLog();
}

function setCraftStats(prog, qual, dura){
    //changes label
    document.getElementById("progressLabel").innerHTML = "0/" + prog;
    document.getElementById("qualityLabel").innerHTML = "0/" + qual;
    document.getElementById("durabilityLabel").innerHTML = dura+ "/" + dura;

    //changes Max Value of progress
    document.getElementById("prog").max = prog;
    document.getElementById("qual").max = qual;
    document.getElementById("dur").max = dura;
}

/*---------------CRAFTING--------------*/
var craftProgress = 1000;
var craftQuality = 1500;
var craftDurability = 60;
const manipulation = new Ability("Manipulation", 50, 150, 5, 96, false, "Manipulation");

function test(){
    document.getElementById("prog").value += 5;
    if(manipulation.useAbility(playerCP, craftDurability)!=true){
        updateLog(manipulation.useAbility(playerCP, craftDurability));
    }
    //let response = manipulation.updateCraft;
    updateLog(manipulation.updateCraft(playerCP, craftDurability, craftQuality, craftProgress, ['Manipulation', 'humpa lumpa', 'Waste Not']));
    breakLineLog();
}

/*---------------LOG--------------*/
// updates log with the action that happends last
function updateLog(log){
    document.getElementById("logP").innerText += "\n" +log;
}
function breakLineLog(){
    updateLog(" ");
}
//clears string of the log paragraf
function resetLog(){
    document.getElementById("logP").innerHTML = "";
}




