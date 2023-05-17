class Ability {
    name;
    progress;
    quality;
    durability;
    cp;
    condition;
    abuff;

    constructor(name, progress, quality, durability, cp, condition, abuff) {
        this.name = name;
        this.progress = progress;
        this.quality = quality;
        this.durability = durability;
        this.cp = cp;
        this.condition = condition;
        this.abuff = abuff;
    }

    /*---------------USEABILITY--------------*/
    /*---------------------------------------*/
    /*---------------USEABILITY--------------*/

    //checks if the Ability is valid
    useAbility(currentCP, currentDurability, currentProgress, maxProgress, craftBuffs) {
        //craft conditions
        //console.log(this.craftBuffs);
        if(currentCP<this.cp){
            return "not enough CP";
        }
        if(currentDurability<5) {
            return "craft is already finished";
        }
        if(currentProgress>=maxProgress){
            return "craft is already finished";
        }
        //ability spesific conditions
        if(Array.isArray(this.condition)){
            //checks for start
            if(this.searchCondition("start") && !this.searchBuffs("start", craftBuffs)){
                return this.name +" can only be used at the start of the Craft";
            }
            //checks for observe
            if(this.searchCondition("observe") && !this.searchBuffs("observe", craftBuffs)){
                return this.name +" can only be used after using observe";
            }
            //checks for good condition
            if(this.searchCondition("good") && !this.searchBuffs("good", craftBuffs)){
                return this.name +" can only be used if the condition is 'good'";
            }
            //checks for exelent condition
            if(this.searchCondition("exelent") && !this.searchBuffs("exelent", craftBuffs)){
                return this.name +" can only be used if the condition is 'exelent'";
            }
            //checks for Waste Not restrictions
            if(this.searchCondition("not Waste Not") && this.searchBuffs("waste not", craftBuffs)){
                return this.name +" can only be used if 'Waste Not (II)' is not active";
            }
            //checks for RNG skills (will be left out innitialy)
            if(this.searchCondition("RNG")){
                return this.name +" is and RNG skill and not Supported yet";
            }
            //checks for Inner Quiet
            if(this.searchCondition("InnerQuiet") && !this.searchBuffs("InnerQuiet", craftBuffs)){
                return this.name +" can only be used if 'Inner Quiet' is active";
            }
            //checks for Inner Quiet
            if(this.searchCondition("InnerQuiet10") && !this.searchBuffs("InnerQuiet", craftBuffs)){
                return this.name +" can only be used if 'Inner Quiet' is active";
            }

        } else{
            
            if(this.condition!=false){
                //checks for start
                //console.log("condition need: " + this.condition);
                if(this.condition.toLowerCase() === "start".toLowerCase() && !this.searchBuffs("start", craftBuffs)){  
                    return this.name +" can only be used at the start of the Craft";
                }
                //checks for observe
                if(this.condition.toLowerCase() === "observe".toLowerCase() && !this.searchBuffs("observe", craftBuffs)){
                    return this.name +" can only be used after using observe";
                }
                //checks for good condition
                if(this.condition.toLowerCase() === "good".toLowerCase() && !this.searchBuffs("good", craftBuffs)){
                    return this.name +" can only be used if the condition is 'good'";
                }
                //checks for exelent condition 
                if(this.condition.toLowerCase() === "exelent".toLowerCase() && !this.searchBuffs("exelent", craftBuffs)){
                    return this.name +" can only be used if the condition is 'exelent'";
                }
                //checks for Waste Not restrictions
                if(this.condition.toLowerCase() === "not waste not".toLowerCase() && this.searchBuffs("waste not", craftBuffs)){
                    return this.name +" can only be used if 'Waste Not (II)' is not active";
                }
                //checks for RNG skills (will be left out innitialy)
                if(this.condition.toLowerCase() === "rng".toLowerCase()){
                    return this.name +" is and RNG skill and not Supported yet";
                }
                //checks for Inner Quiet
                if(this.condition.toLowerCase() === "innerquiet10".toLowerCase() && !this.searchBuffs("InnerQuiet", craftBuffs)){
                    return this.name +" can only be used if 'Inner Quiet' is active";
                }
                //checks for Inner Quiet
                if(this.condition.toLowerCase() === "innerquiet10".toLowerCase() && !this.searchBuffs("InnerQuiet", craftBuffs)){
                    return this.name +" can only be used if 'Inner Quiet' is active";
                }
            }
        }

        return true;
    }

    /*---------------HELP METHODS--------------*/
    /*-----------------------------------------*/
    /*---------------HELP METHODS--------------*/
    
    // goes through all values in condition and checks if parameter is one of them returns true if so
    searchCondition(search){
        for(let i = 0; i<this.condition.length; i++){
            //checks if condition is empty (empty = false)
            if(this.condition==false){
                return false;
            }
            if(String(this.condition[i]).toLowerCase() === search.toLowerCase()){
                return true;
                
            }
        }
        return false;
    }
    // goes through all values in CraftBuff and checks if parameter is one of them returns true if so
    searchBuffs(search, craftBuffs){
        for(let j = 0; j < craftBuffs.length; j++){
            //console.log("buffs: "+craftBuffs[j][0].toLowerCase());
            if(craftBuffs[j][0].toLowerCase() === search.toLowerCase()){
                //console.log("found: " + craftBuffs[j][0]);
                return true;
            }
        }
        return false;
    }
    // returns index of value
    xsearchBuffs(search, craftBuffs){
        for(let j = 0; j < craftBuffs.length; j++){
            //console.log("buffs: "+craftBuffs[j][0].toLowerCase());
            if(craftBuffs[j][0].toLowerCase() === search.toLowerCase()){
                //console.log("found buff: " + craftBuffs[j][0]);
                return [true, j];
            }
        }
        return [false, -1];
    }

    searchABuff(search, givenBuff){
        if(!Array.isArray(givenBuff)){
            return false;
        }
        for( let j = 0; j < givenBuff.length; j++){
            //console.log("buffs: "+craftBuffs[j][0].toLowerCase());
            if(!Number.isInteger(givenBuff[j]) && givenBuff[j].toLowerCase() === search.toLowerCase()){
                //console.log("found buff: " + givenBuff[j]);
                return true;
            }
        }
        return false;
    }

    updateBuff(buffIndex, buffs, change){
        //console.log(buffs[buffIndex][1]-change);
        return buffs[buffIndex][1]-change;
    }

    /*---------------UPDATE CRAFT--------------*/
    /*-----------------------------------------*/
    /*---------------UPDATE CRAFT--------------*/

    //updates all parameters of the craft
    updateCraft(currentCP, currentDurability, currentQuality, currentProgress, cbuffs, maxProgress){
        var modifierDurability = 1;
        var modifierProgress = 1;
        var modifierQuality = 1;
        var modifierInnerQuiet = 1;
        var byregot = 1;
        var manipulation = 0;
        var combo = 0;
        var exption = false;

        //starts craft
        if(this.searchBuffs("start", cbuffs)){
            cbuffs.splice(0, 1);
        }
        
        
        /*subtract stuff / works with craft buff (cbuff)*/
        //checks for any modifier Buffs and adjuts
        let tempIndex;
        if(this.condition === ("touch combo1")){
            combo = (32-18);
        }
        if(this.condition === ("touch combo2")){
            combo = 46-18;
        }
        if(this.searchABuff("Final Appraisal",this.abuff)){
            exption = true;
        }
        	//Final Appraisal
        if(this.xsearchBuffs("Final Appraisal", cbuffs)[0]){
            tempIndex = this.xsearchBuffs("Final Appraisal", cbuffs)[1];
            //modifier
            if(currentProgress+this.progress*modifierProgress>=maxProgress){
                modifierProgress = -(currentProgress-maxProgress+1)/this.progress;
            }
            
            //reduces stack of buff by 1
            
            cbuffs[tempIndex][1] --;
            //if buff is consumed or out of stacks -> DELETES it
            if(cbuffs[tempIndex][1] <= 0 || this.searchABuff("Final Appraisal", this.abuff) || this.progress>0){  //checks if the ability is a buff giver
                cbuffs.splice(tempIndex, 1);
            }  
            

        }

        //muscle Memory
        if(this.xsearchBuffs("Muscle Memory", cbuffs)[0]){
            tempIndex = this.xsearchBuffs("Muscle Memory", cbuffs)[1];
            //modifier
            modifierProgress += 1;
            //reduces stack of buff by 1
            
            if(!exption){cbuffs[tempIndex][1] --;}
            //if buff is consumed or out of stacks -> DELETES it
            if(this.progress > 0 ||  cbuffs[tempIndex][1] <= 0){  //if it is a progress ability gets rid of the buff
                cbuffs.splice(tempIndex, 1);
            } 
        }
        //Inner Quiet
        if(this.xsearchBuffs("InnerQuiet", cbuffs)[0]){
            tempIndex = this.xsearchBuffs("InnerQuiet", cbuffs)[1];
            //modifier
            modifierInnerQuiet = 1 + 0.1*cbuffs[tempIndex][1];

    
            //only certain condition will delete buff
            if(this.searchCondition("InnerQuiet")){  
                byregot = 1+ 0.2*cbuffs[tempIndex][1];
                //modifierQuality = modifierQuality*byregot;
                cbuffs.splice(tempIndex, 1);
            } 
        }
        //Waste Not
        if(this.xsearchBuffs("Waste not", cbuffs)[0]){
            tempIndex = this.xsearchBuffs("Waste not", cbuffs)[1];
            //modifier
            modifierDurability = 0.5;
            //reduces stack of buff by 1
            
            if(!exption){cbuffs[tempIndex][1] --;}
            //if buff is consumed or out of stacks -> DELETES it
            //console.log(this.abuff);
            if(cbuffs[tempIndex][1] <= 0 || this.searchABuff("Waste Not", this.abuff)){  //checks if the ability is a buff giver
                cbuffs.splice(tempIndex, 1);
            } 
        }
        //Venration
        if(this.xsearchBuffs("Veneration", cbuffs)[0]){
            tempIndex = this.xsearchBuffs("Veneration", cbuffs)[1];
            //modifier
            modifierProgress += 0.5;
            
            //reduces stack of buff by 1
            
            if(!exption){cbuffs[tempIndex][1] --;}exption= true;
            //if buff is consumed or out of stacks -> DELETES it
            if(cbuffs[tempIndex][1] <= 0 || this.searchABuff("Veneration", this.abuff)){  //checks if the ability is a buff giver
                cbuffs.splice(tempIndex, 1);
            }  
        }
        //Innovation
        if(this.xsearchBuffs("Innovation", cbuffs)[0]){
            tempIndex = this.xsearchBuffs("Innovation", cbuffs)[1];
            //modifier
            modifierQuality += 0.5;
            
            //reduces stack of buff by 1
            
            if(!exption){cbuffs[tempIndex][1] --;}
            //if buff is consumed or out of stacks -> DELETES it
            if(cbuffs[tempIndex][1] <= 0 || this.searchABuff("Innovation", this.abuff)){  //checks if the ability is a buff giver
                cbuffs.splice(tempIndex, 1);
            }  
        }
        //Great Strides
        if(this.xsearchBuffs("Great Strides", cbuffs)[0]){
            tempIndex = this.xsearchBuffs("Great Strides", cbuffs)[1];
            //modifier
            modifierQuality += 1;
            
            //reduces stack of buff by 1
            
            if(!exption){cbuffs[tempIndex][1] --;}
            //if buff is consumed or out of stacks -> DELETES it
            if(cbuffs[tempIndex][1] <= 0 || this.searchABuff("Great Strides", this.abuff) || this.quality>0){  //checks if the ability is a buff giver
                cbuffs.splice(tempIndex, 1);
            }  
        }
        
        //Manipulation
        if(this.xsearchBuffs("Manipulation", cbuffs)[0]){
            tempIndex = this.xsearchBuffs("Manipulation", cbuffs)[1];
            //modifier
            manipulation = 5;
            //reduces stack of buff by 1
            
            if(!exption){cbuffs[tempIndex][1] --;}
            //if buff is consumed or out of stacks -> DELETES it
            //console.log(this.abuff);
            if(cbuffs[tempIndex][1] <= 0 || this.searchABuff("Manipulation", this.abuff)){  //checks if the ability is a buff giver
                cbuffs.splice(tempIndex, 1);
            } 
        }

        /*adds stuff / works with Ability buff (abuff)*/

        //applies buff
        if(Array.isArray(this.abuff)){
            
            for(let i = 0; i < this.abuff.length; i++){
                //muscle memory
                if(!Number.isInteger(this.abuff[i]) && this.abuff[i].toLowerCase() === "Muscle Memory".toLowerCase()){
                    cbuffs.push([this.abuff[0],this.abuff[1]]);
                }
                //Inner Quiet
                if(!Number.isInteger(this.abuff[i]) && this.abuff[i].toLowerCase() === "InnerQuiet".toLowerCase()){
                    //console.log(this.name);
                    //console.log(this.abuff);
                    if(this.xsearchBuffs("InnerQuiet",cbuffs)[0]){
                        if(this.quality>0){
                            if(cbuffs[this.xsearchBuffs("InnerQuiet",cbuffs)[1]][1] <= 9){
                                cbuffs[this.xsearchBuffs("InnerQuiet",cbuffs)[1]][1]++;
                            } 
                        //cbuffs[this.xsearchBuffs("InnerQuiet",cbuffs)[1]][1] < 9 ? cbuffs[this.xsearchBuffs("InnerQuiet",cbuffs)[1]][1]++ : cbuffs[this.xsearchBuffs("InnerQuiet",cbuffs)[1]][1];
                        }
                    }else {
                        let temp = String(this.abuff[0]);
                        cbuffs.push([temp,1]);
                    }
                } 
                //Waste Not
                if(!Number.isInteger(this.abuff[i]) && this.abuff[i].toLowerCase() === "Waste Not".toLowerCase()){
                    cbuffs.push([this.abuff[0],this.abuff[1]]);
                }
                //Veneration
                if(!Number.isInteger(this.abuff[i]) && this.abuff[i].toLowerCase() === "Veneration".toLowerCase()){
                    cbuffs.push([this.abuff[0],this.abuff[1]]);
                }
                //Innovation
                if(!Number.isInteger(this.abuff[i]) && this.abuff[i].toLowerCase() === "Innovation".toLowerCase()){
                    cbuffs.push([this.abuff[0],this.abuff[1]]);
                }
                //Great Strides
                if(!Number.isInteger(this.abuff[i]) && this.abuff[i].toLowerCase() === "Great Strides".toLowerCase()){
                    cbuffs.push([this.abuff[0],this.abuff[1]]);
                }
                //Final Appraisal
                if(!Number.isInteger(this.abuff[i]) && this.abuff[i].toLowerCase() === "Final Appraisal".toLowerCase()){
                    cbuffs.push([this.abuff[0],this.abuff[1]]);
                }
                //Manipulation
                if(!Number.isInteger(this.abuff[i]) && this.abuff[i].toLowerCase() === "Manipulation".toLowerCase()){
                    cbuffs.push([this.abuff[0],this.abuff[1]]);
                }
            }
        }else{
            
            if(this.abuff!=false){
                if(this.xsearchBuffs("InnerQuiet",cbuffs)[0]){
                    if(this.abuff.toLowerCase() === "Muscle Memory".toLowerCase()){
                        cbuffs.push([this.abuff[0],this.abuff[1]]);
                    }
                }else {
                    cbuffs.push([this.abuff[0],0]);
                }
            }
            
        }

        //ugly code with the quality modifiers fix it alet pls
        console.log("ability Progress: ",this.progress, "Progress Modifier: ", modifierProgress, "total added Progress: ", Math.floor(this.progress*modifierProgress), "\n",
                    "ability Quality: ", this.quality, "Quality Sodifiers", modifierQuality, "Inner Quiet modifier: ", modifierInnerQuiet,"total added Quality", Math.floor(this.quality*modifierQuality*modifierInnerQuiet*byregot), "\n",
                    "ability Durability: ",this.durability, "Durability Modifier", modifierDurability, "manipulation: ", manipulation, "total added Progress", this.durability*modifierDurability+manipulation, "\n",
                    "ability Cp: ", this.cp);
        // console.log(" currentProgress: ",currentProgress, " quality: ",this.quality, " modifierProgress: ", modifierProgress," added prog ", Math.floor(this.progress*modifierProgress));
        
        return [currentCP-(this.cp-combo), currentDurability-this.durability*modifierDurability+manipulation, currentQuality+Math.floor(this.quality*modifierQuality*modifierInnerQuiet*byregot), currentProgress+Math.floor(this.progress*modifierProgress), buffs];
    }

}

/*---------------GETTING VALUES--------------*/
/*-------------------------------------------*/
/*---------------GETTING VALUES--------------*/
//get gud
var playerProgress = 318;
var playerQuality = 380;
var playerCPMax = 594;
var playerCP = playerCPMax;


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
    craftProgressMax = parseInt(document.getElementById("cprogress").value);
    craftQualityMax =  parseInt(document.getElementById("cquality").value);
    craftDurabilityMax =  parseInt(document.getElementById("cdurability").value);
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

    document.getElementById("cprogress").value = prog;
    document.getElementById("cquality").value = qual;
    document.getElementById("cdurability").value = dura;
    

    //changes Max Value of progress bar
    document.getElementById("prog").max = prog;
    document.getElementById("qual").max = qual;
    document.getElementById("dura").max = dura;
    updateHUD("dura",  dura);
}



/*---------------ABILITY--------------*/
/*------------------------------------*/
/*---------------ABILITY--------------*/
//uhg 0
let abilities = setAbilities();

 
function setAbilities(){
    const delicate_Synthesis = new Ability("Delicate Synthesis", playerProgress , playerQuality, 10, 32, false, ["InnerQuiet"]); //0
    //Progression 1
    const basic_Synthesis = new Ability("Basic Synthesis", playerProgress * 1.2 , 0, 10, 0, false, false); //1
    const rapid_Synthesis = new Ability("Rapid Synthesis", playerProgress * 5 , 0, 10, 0, ["RNG", 0.5], false); //2
    const muscle_Memory = new Ability("Muscle Memory", playerProgress * 3 , 0, 10, 6, "start", ["Muscle Memory", 5]); //3
    const careful_Synthesis = new Ability("Careful Synthesis", playerProgress * 1.8 , 0, 10, 7, false, false); //4
    const focused_Synthesis = new Ability("Focused Synthesis", playerProgress * 1.5 , 0, 10, 18, "Observe", false); //5
    const groundwork = new Ability("Groundwork", playerProgress * 3.6 , 0, 20, 18, false, false); //6
    const intensive_Synthesis = new Ability("Intensive Synthesis", playerProgress * 4 , 0, 10, 6,["good", "exelent"] , false); //7
    const prudent_Synthesis = new Ability("Prudent Synthesis", playerProgress * 1.8 , 0, 50, 18, ["not Waste Not"] , false); //8

    //Quality 9
    const basic_Touch = new Ability("Basic Touch", 0, playerQuality, 10, 18, false, ["InnerQuiet"]); //9
    const hasty_Touch = new Ability("Hasty Touch", 0, playerQuality, 10, 0, ["RNG", 0.6], ["InnerQuiet"]); //10
    const standard_Touch = new Ability("Standard Touch", 0, playerQuality *1.25, 10, 32, "touch combo1", ["InnerQuiet"]); //11
    const byregots_Blessing = new Ability("Byregot's Blessing", 0, playerQuality, 10, 24, ["InnerQuiet"], false); //12
    const precise_Touch = new Ability("Precise Touch", 0, playerQuality, 10, 18, ["good", "exelent"], ["InnerQuiet", "InnerQuiet"]); //13
    const prudent_Touch = new Ability("Prudent Touch", 0, playerQuality, 5, 25, ["not Waste Not"], ["InnerQuiet"]); //14
    const reflect = new Ability("Reflect", 0, playerQuality, 10, 6, "start", ["InnerQuiet", "InnerQuiet"]);//15
    const preparatory_Touch = new Ability("Preparatory Touch", 0, playerQuality *2, 20, 40, false, ["InnerQuiet", "InnerQuiet"]); //16
    const trained_Eye = new Ability("Trained Eye", 0, playerQuality *2000000, 10, 250, ["RNG","start"], "maxQuality"); //17
    const advanced_Touch = new Ability("Advanced Touch", 0, playerQuality *1.5, 10, 46, "touch combo2", ["InnerQuiet"]);//18
    const trained_Finesse = new Ability("Trained Finesse", 0, playerQuality *1.5, 0, 32, "InnerQuiet10", false);    //19

    //Buffs 20
    const masters_Mend = new Ability("Master's Mend", 0, 0, -30, 88, false, false);     //20 
    const observe = new Ability("Observe", 0, 0, 0, 7, false, ["Observe", 1]); //21
    const tricks_of_the_Trade = new Ability("Tricks of the Trade", 0, 0, 0, -20, ["good", "exelent"], false);   //22
    const waste_Not = new Ability("Waste Not", 0, 0, 0, 56, false, ["Waste Not", 4]);   //23
    const veneration = new Ability("Veneration", 0, 0, 0, 18, false, ["Veneration", 4]); //24
    const great_Strides = new Ability("Great Strides", 0, 0, 0, 32, false, ["Great Strides", 3]); //25
    const innovation = new Ability("Innovation", 0, 0, 0, 18, false, ["Innovation", 4]);    //26
    const final_Appraisal = new Ability("Final Appraisal", 0, 0, 0, 1, false, ["Final Appraisal", 5]);  //27
    const waste_Not_II = new Ability("Waste Not II", 0, 0, 0, 98, false, ["Waste Not", 8]);     //28
    const manipulation = new Ability("Manipulation", 0, 0, 0, 96, false, ["Manipulation", 8]);  //29
    // 29
    const cabilities = [delicate_Synthesis, 
        basic_Synthesis, rapid_Synthesis, muscle_Memory, careful_Synthesis, focused_Synthesis, groundwork, intensive_Synthesis, prudent_Synthesis, 
        basic_Touch, hasty_Touch, standard_Touch, byregots_Blessing, precise_Touch, prudent_Touch, reflect, preparatory_Touch, trained_Eye, advanced_Touch, trained_Finesse, 
        masters_Mend, observe, tricks_of_the_Trade, waste_Not, veneration, great_Strides, innovation, final_Appraisal, waste_Not_II, manipulation
    ]
    return cabilities;
}

/*---------------CRAFTING--------------*/
/*-------------------------------------*/
/*---------------CRAFTING--------------*/
var craftProgressMax = 1550;
var craftQualityMax = 6800;
var craftDurabilityMax = 40;
var craftProgress = 0;
var craftQuality = 0;
var craftDurability = craftDurabilityMax;
var buffs =[["start", -1]];
var bestAchievedQuality = 0;
var bestAchievedRotation = [];
var bestAchievedProgress = 0;
//const manipulation = new Ability("Manipulation", 50, 150, 5, 96, false, "Manipulation");

function useAbilityInCraft(abilityID){
    console.log("(--------", abilities[abilityID].name ,"-------)")
    if(abilities[abilityID].useAbility(playerCP, craftDurability, craftProgress, craftProgressMax, buffs)!=true){
        updateLog(abilities[abilityID].useAbility(playerCP, craftDurability, craftProgress, craftProgressMax, buffs));
        
        updateLog("croft finished?")
    } else{
        let response = abilities[abilityID].updateCraft(playerCP, craftDurability, craftQuality, craftProgress, buffs, craftProgressMax);
    
        playerCP = response[0];
        craftDurability = response[1];
        craftQuality = response[2];
        craftProgress = response[3];
        updateLog("current Buffs: " + response[4]);
        updateLog(abilities[abilityID].name + " used");
        updateLog(response);
    }
    
    //console.log(craftProgress);
    updateHUD("prog", craftProgress);
    updateHUD("qual", craftQuality);
    updateHUD("dura", craftDurability);
    updateHUD("cp", playerCP);

    
    console.log("CP: ", playerCP,"Durability: ",  craftDurability,"Quality: ", craftQuality,"Progress: ", craftProgress);
    breakLineLog();
}

function checkIfBest(quality, prog, rotation){
     if(prog<craftProgressMax){
         return 0;
     }
    if (quality > bestAchievedQuality) {
        bestAchievedQuality = quality;
        bestAchievedProgress = prog;
        bestAchievedRotation = [];
        console.log(rotation);
        for (let i = 0; i < rotation.length; i++) {
            bestAchievedRotation.push(rotation[i]);
            
        }
        
    }
    return quality;
}





function testRotation(rotation){
    for (let i = 0; i < rotation.length; i++) {
        useAbilityInCraft(rotation[i]);        
    }
    let score = checkIfBest(craftQuality, craftProgress,rotation);
    
     resetcraft();
    
    return score;
}
function resetcraft(){
    playerCP = playerCPMax;
    craftProgressMax = 1550;
    craftQualityMax = 6800;
    craftDurabilityMax = 40;
    craftProgress = 0;
    craftQuality = 0;
    craftDurability = craftDurabilityMax;
    buffs =[["start", -1]];
    getCraftStats();
    updateLog("(----------"+ "end of CRAFT" +"---------)")
    console.log("(----------", "end of CRAFT" ,"---------)");
}

function createPopulation(populationSize, macroSize) {
    let population = [];
    for (let i = 0; i < populationSize; i++) {
        population.push([]);
    }
    for (let i = 0; i < populationSize; i++) {

        for (let j = 0; j < macroSize; j++) {
            population[i].push(parseInt(Math.random()*abilities.length));
            
        }
        
    }
    return population;
}


function breed(parents, populationSize, macroSize){

    let population = [[...bestAchievedRotation]]; // keeps best of preveous generation
    
    for (let i = 1; i < populationSize; i++) {
        population.push([parents[parseInt(Math.random()*parents.length)]]);
    }
    for (let i = 1; i < populationSize; i++) {
        let rndAbility = parseInt(Math.random()*abilities.length);
        let rndPosInMacro = parseInt(Math.random()*macroSize);
        population[i][rndPosInMacro] = rndAbility;
        // for (let j = 0; j < macroSize; j++) {
        //     population[i].push(parseInt(Math.random()*abilities.length));
            
        // }
        
    }
    return population;
}

function getBestIndexe(survivors,scores){
    let sortedScores = [...scores];
    //sorts array
    sortedScores.sort( function( a , b){
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
    });
    sortedScores.reverse();
    let temp = [...scores]
    let sortedIndexe = [];
    //let usedIndexe = []; //runtime optimisatiion later

    for (let i = 0; i < sortedScores.length; i++) {
        
        if(sortedScores[i]==0){continue;}
        
        for (let j = 0; j < temp.length; j++) {
            if(scores[j]==0){continue;}
            if(sortedScores[i]==temp[j]){
                sortedIndexe.push(j);
                // temp.splice(j,1);
            }

        }
        
    }
    console.log("sorted scores: ", sortedScores);

    //return rotations.splice(sortedIndexe.length > survivors? survivors:sortedIndexe.length);

    return sortedIndexe.length > survivors?sortedIndexe.splice(survivors):sortedIndexe;
}

function getBestOfGenration(indexOfBest, rotation){
    let bestRotation = [];
    for (let i = 0; i < indexOfBest.length; i++) {
        bestRotation.push(rotation[indexOfBest[i]]);
    }
    return bestRotation;
}


function ga(){
    var rotationScore = [];
    var population = createPopulation(10,15);
    for (let i = 0; i < population.length; i++) {
        rotationScore.push(testRotation(population[i]));
    }
    let bestIndex = getBestIndexe(5,rotationScore);
    let parrent = getBestOfGenration(bestIndex,population);
    console.log("best array", parrent);
    console.log("new Gen: ", breed(parrent, 10, 15)); 
    
    console.log("rotation Score: ", rotationScore);
    console.log("population: ", population);
}

function solve(){
    abilities = setAbilities();

    ga();
    outputMacroText(bestAchievedRotation);
    console.log("we are done");
    console.log("best quality: ", bestAchievedQuality);
    console.log("best rotation: ", bestAchievedRotation);
}

function outputMacroText(rotation){
    var outputMacro = "";
    for (let i = 0; i < rotation.length; i++) {
        useAbilityInCraft(rotation[i]);
        outputMacro += "/ac \"" + abilities[rotation[i]].name;
        if(abilities[rotation[i]].progress>0 || abilities[rotation[i]].quality>0){
            outputMacro += "\" <wait.3>" + "\n";
        }else{
            outputMacro += "\" <wait.2>" + "\n";
        }
    }
    console.log(outputMacro);
    document.getElementById("craftMacroOut").value = outputMacro;
}


function test(){
    abilities = setAbilities();
    var outputMacro = "";
    for (let i = 0; i < playerMacroNum.length; i++) {
        useAbilityInCraft(playerMacroNum[i]);
        outputMacro += "/ac \"" + abilities[playerMacroNum[i]].name;
        if(abilities[playerMacroNum[i]].progress>0 || abilities[playerMacroNum[i]].quality>0){
            outputMacro += "\" <wait.3>" + "\n";
        }else{
            outputMacro += "\" <wait.2>" + "\n";
        }
    }
    console.log("huh");
    console.log(outputMacro);
    document.getElementById("craftMacroOut").value = outputMacro;
    // const para = document.createElement("textarea");
    // const node = document.createTextNode("tt");
    // para.appendChild(node);
    // const element = document.getElementById("macroID");
    // element.appendChild(para);

    // useAbilityInCraft(3);
    // useAbilityInCraft(29);
    // useAbilityInCraft(24);
    // useAbilityInCraft(28);
    // useAbilityInCraft(6);
    // useAbilityInCraft(27);
    // useAbilityInCraft(6);
    // useAbilityInCraft(26);
    // useAbilityInCraft(16);
    // useAbilityInCraft(16);
    // useAbilityInCraft(16);
    // useAbilityInCraft(16);
    // useAbilityInCraft(25);
    // useAbilityInCraft(26);
    // useAbilityInCraft(12);
    // useAbilityInCraft(6);

    // useAbilityInCraft(9);
    // useAbilityInCraft(11);
    // useAbilityInCraft(18);


}


/*---------------MACRO--------------*/
/*----------------------------------*/
/*---------------MACRO--------------*/
var playerMacroRaw;
var playerMacroArr;
var playerMacroNum = [];

function setMacroAsRotation(){
    playerMacroRaw = document.getElementById("craftMacro").value;
    playerMacroArr = playerMacroRaw.split('/')
    //console.log(playerMacroArr);
    for (let i = 0; i < playerMacroArr.length; i++) {
        for (let j = 0; j < abilities.length; j++) {
            if(playerMacroArr[i].includes(abilities[j].name)){
                playerMacroNum.push(j);
            }
            
        }
    }

    for (let i = 0; i < playerMacroNum.length; i++) {
        if (playerMacroNum[i]== 28) {
            playerMacroNum.splice(i-1, 1);

        }
        
    }
    //console.log(playerMacroNum);
    updateLog(playerMacroNum);
}

function playerMacroToArray(macro){
    const macroArr = macro.sp
}




/*---------------LOG/HUD--------------*/
/*------------------------------------*/
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


