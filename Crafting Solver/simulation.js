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
    useAbility(currentCP, currentDurability, currentProgress, maxProgress) {
        if(currentCP<this.cp){
            return "not enough CP";
        }
        if(currentDurability<=5) {
            return "craft is already finished";
        }
        if(currentProgress>=maxProgress){
            return "craft is already finished";
        }
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
var playerCPMax = 500;

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

    setPlayerStat(playerCP);

    updateLog("progress saved: "+ playerProgress);
    updateLog("quality saved: "+ playerQuality);
    updateLog("CP saved: "+ playerCP);
    breakLineLog();
}

function setPlayerStat(cp){
    //changes label
    document.getElementById("CPLabel").innerHTML = cp + "/" + cp;
    //changes value of progress bar
    document.getElementById("currentCP").max = cp;
    updateHUD("cp",  cp)
}

//gets craft Stats
function getCraftStats(){
    craftProgressMax = parseInt(document.getElementById("cprogress").value);
    craftQualityMax =  parseInt(document.getElementById("cquality").value);
    craftDurabilityMax =  parseInt(document.getElementById("durability").value);
    if(craftProgressMax<=0){
        updateLog("progress must be greater then 0");
        return;
    }
    if(craftQualityMax<=0){
        updateLog("quality must be greater then 0");
        return;
    }
    if(craftDurabilityMax<=0){
        updateLog("Durability must be greater then 0");
        return;
    }
    setCraftStats(craftProgressMax,craftQualityMax,craftDurabilityMax);

    updateLog("progress saved: "+ craftProgressMax);
    updateLog("quality saved: "+ craftQualityMax);
    updateLog("durability saved: "+ craftDurabilityMax);
    breakLineLog();
}

function setCraftStats(prog, qual, dura){
    //changes label
    document.getElementById("progressLabel").innerHTML = "0/" + prog;
    document.getElementById("qualityLabel").innerHTML = "0/" + qual;
    document.getElementById("durabilityLabel").innerHTML = dura+ "/" + dura;
    

    //changes Max Value of progress bar
    document.getElementById("prog").max = prog;
    document.getElementById("qual").max = qual;
    document.getElementById("dura").max = dura;
    updateHUD("dura",  dura);
}


/*---------------ABILITY--------------*/
//uhg
const delicate_Synthesis = new Ability("Delicate Synthesis", playerProgress , playerQuality, 10, 32, false, "InnerQuiet"); 

//Progression
const basic_Synthesis = new Ability("Basic Synthesis", playerProgress * 1.2 , 0, 10, 0, false, false); 
const rapid_Synthesis = new Ability("Rapid Synthesis", playerProgress * 5 , 0, 10, 0, ["RNG", 0.5], false); 
const muscle_Memory = new Ability("Muscle Memory", playerProgress * 3 , 0, 10, 6, "start", ["Muscle_Memory", 5]); 
const careful_Synthesis = new Ability("Careful Synthesis", playerProgress * 1.8 , 0, 10, 7, false, false); 
const focused_Synthesis = new Ability("Focused Synthesis", playerProgress * 1.5 , 0, 10, 18, "Observe", false); 
const groundwork = new Ability("Groundwork", playerProgress * 3.6 , 0, 20, 18, false, false); 
const intensive_Synthesis = new Ability("Intensive Synthesis", playerProgress * 4 , 0, 10, 6,["good", "exelent"] , false); 
const prudent_Synthesis = new Ability("Prudent Synthesis", playerProgress * 1.8 , 0, 50, 18, ["not Waste Not"] , false); 

//Quality
const basic_Touch = new Ability("Basic Touch", 0, playerQuality, 10, 18, false, "InnerQuiet"); 
const hasty_Touch = new Ability("Hasty Touch", 0, playerQuality, 10, 0, ["RNG", 0.6], "InnerQuiet"); 
const standard_Touch = new Ability("Standard Touch", 0, playerQuality *1.25, 10, 32, "touch combo1", "InnerQuiet"); 
const byregots_Blessing = new Ability("Byregot's Blessing", 0, playerQuality, 10, 24, "InnerQuiet", "RemoveInnerQuiet"); 
const precise_Touch = new Ability("Precise Touch", 0, playerQuality, 10, 18, ["good", "exelent"], ["InnerQuiet", "InnerQuiet"]); 
const prudent_Touch = new Ability("Prudent Touch", 0, playerQuality, 5, 25, ["not Waste Not"], "InnerQuiet"); 
const reflect = new Ability("Reflect", 0, playerQuality, 10, 6, "start", ["InnerQuiet", "InnerQuiet"]);
const preparatory_Touch = new Ability("Preparatory Touch", 0, playerQuality *2, 20, 40, false, ["InnerQuiet", "InnerQuiet"]);
const trained_Eye = new Ability("Trained Eye", 0, playerQuality *2000000, 10, 250, "Start", "maxQuality");
const advanced_Touch = new Ability("Advanced Touch", 0, playerQuality *1.5, 10, 46, "touch combo2", "InnerQuiet");
const trained_Finesse = new Ability("Trained Finesse", 0, playerQuality *1.5, 0, 32, "InnerQuiet10", false);

//Buffs
const masters_Mend = new Ability("Master's Mend", 0, 0, -30, 88, false, false); 
const observe = new Ability("Observe", 0, 0, 0, 7, false, ["Observe", 1]);
const tricks_of_the_Trade = new Ability("Tricks of the Trade", 0, 0, 0, -20, ["good", "exelent"], false);
const waste_Not = new Ability("Waste Not", 0, 0, 0, 56, false, ["Waste Not", 4]);
const veneration = new Ability("Veneration", 0, 0, 0, 18, false, ["Veneration", 4]);
const great_Strides = new Ability("Great Strides", 0, 0, 0, 32, false, ["Great Strides", 3]);
const innovation = new Ability("Innovation", 0, 0, 0, 18, false, ["Innovation", 4]);
const final_Appraisal = new Ability("Final Appraisal", 0, 0, 0, 1, false, ["Final Appraisal", 5]);
const waste_Not_II = new Ability("Waste Not II", 0, 0, 0, 98, false, ["Waste Not", 8]);
const manipulation = new Ability("Manipulation", 0, 0, 0, 96, false, ["Manipulation", 8]);


/*---------------CRAFTING--------------*/
var craftProgressMax = 1000;
var craftQualityMax = 1500;
var craftDurabilityMax = 60;
var craftProgress = 0;
var craftQuality = 0;
var craftDurability = 60;
//const manipulation = new Ability("Manipulation", 50, 150, 5, 96, false, "Manipulation");

function test(){
    
    if(manipulation.useAbility(playerCP, craftDurability, craftProgress, craftProgressMax)!=true){
        updateLog(manipulation.useAbility(playerCP, craftDurability, craftProgress, craftProgressMax));
        
        updateLog("croft finished?")
    } else{
        let response = manipulation.updateCraft(playerCP, craftDurability, craftQuality, craftProgress, ['Manipulation']);
    
        playerCP = response[0];
        craftDurability = response[1];
        craftQuality = response[2];
        craftProgress = response[3];

        updateLog(response);
    }
    //let response = manipulation.updateCraft;
    //let response = manipulation.updateCraft(playerCP, craftDurability, craftQuality, craftProgress, ['Manipulation']);
    
    

    updateHUD("prog", craftProgress);
    updateHUD("qual", craftQuality);
    updateHUD("dura", craftDurability);
    updateHUD("cp", playerCP);

    console.log(playerCP, craftDurability, craftQuality, craftProgress);
    breakLineLog();
}


/*---------------LOG/HUD--------------*/
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

function updateHUD(bar, updatedValue){

    if(bar === "prog"){
        document.getElementById("prog").value = updatedValue;
        document.getElementById("progressLabel").innerHTML = updatedValue + "/" + craftProgressMax;
    }

    if(bar === "qual"){
        document.getElementById("qual").value = updatedValue;
        document.getElementById("qualityLabel").innerHTML = updatedValue +"/" + craftQualityMax;
    }
    
    if(bar === "dura"){
        document.getElementById("dura").value = updatedValue;
        document.getElementById("durabilityLabel").innerHTML = updatedValue + "/" + craftDurabilityMax;
    }
    
    if(bar === "cp"){
        document.getElementById("currentCP").value = updatedValue;
        document.getElementById("CPLabel").innerHTML = updatedValue + "/" + playerCPMax;
    }

    
    
   
}

/*---------------DEBUG--------------*/
function defaultStats(){
    setCraftStats(craftProgressMax,craftQualityMax,craftDurabilityMax);
    setPlayerStat(playerCPMax);
}


