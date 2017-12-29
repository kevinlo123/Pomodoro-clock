document.addEventListener("DOMContentLoaded" , () => {
    let startingBreakTime = 5;
    let startingSessionTime = 25;
    let breakNum = document.getElementById("breakNum");
    let seshNum = document.getElementById("seshNum");
    let time = document.getElementById("time");
    const incrementBreak = document.getElementById("inc-break");
    const decrementBreak = document.getElementById("dec-break");
    const incrementSession = document.getElementById("inc-sesh");
    const decrementSession = document.getElementById("dec-sesh");

    incrementBreak.addEventListener("click", () => {
        startingBreakTime += 1;
        breakNum.innerHTML = startingBreakTime;
    });
    
    decrementBreak.addEventListener("click", () => {
        startingBreakTime -= 1;
        breakNum.innerHTML = startingBreakTime;
        if(startingBreakTime < 0) {
            alert("cant go negative");
            startingBreakTime = 0;
            breakNum.innerHTML = 0;
        }
     });
    
    incrementSession.addEventListener("click", () => {
        startingSessionTime += 1;
        seshNum.innerHTML = startingSessionTime;
        time.innerHTML = startingSessionTime+ ":00";
    });
    
    decrementSession.addEventListener("click", () => {
        startingSessionTime -= 1;
        seshNum.innerHTML = startingSessionTime;
        time.innerHTML = startingSessionTime + ":00";
        if(startingSessionTime < 0) {
            alert("cant go negative");
            startingSessionTime = 0;
            seshNum.innerHTML = 0;
        }
    });
    
    document.getElementById("pressStart").addEventListener("click" , () => {
        document.getElementById("pressStart").setAttribute("disabled", true)
        incrementBreak.setAttribute("disabled", true); //disabling once timer is set
        decrementBreak.setAttribute("disabled", true); //disabling once timer is set
        incrementSession.setAttribute("disabled", true); //disabling once timer is set
        decrementSession.setAttribute("disabled", true); //disabling once timer is set
        let timeUserSetting = seshNum.innerHTML;
        let result = parseFloat(timeUserSetting);
        result += -1;  
        let secs = 60;
        const watch = setInterval(function(){
            secs--;
            if(secs === -1){
                secs = 60;
                result--;
            }
            if(result <= 0 && secs === 0){
                document.getElementById("session-text").innerHTML = "Break";
                window.clearInterval(watch);
                let usersBreak = breakNum.innerHTML;
                let parsedBreak = parseFloat(usersBreak);
                let breakSeconds = 60;
                parsedBreak += -1;
                const breakSession =  setInterval(function(){
                breakSeconds--;
                if(breakSeconds === -1){
                    breakSeconds = 60;
                    parsedBreak--;
                }
                if(parsedBreak <= 0 && breakSeconds === 0){
                    window.clearInterval(breakSession);
                    document.getElementById("beep").play();
                }
                    document.getElementById("showtime").innerHTML =  parsedBreak + ":" + breakSeconds;
                },1000);
            }
            document.getElementById("showtime").innerHTML =  result + ":" + secs;    
        },1000); 
    });
});
