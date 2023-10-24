
var selectEl = document.getElementById("monsterSelect"); // 옵션

var inputEl_H = document.getElementById("hours"); // 시분초
var inputEl_M = document.getElementById("minutes");
var inputEl_S = document.getElementById("seconds");

var btnEl = document.getElementById("timeAddBtn"); // 추가버튼
var zeroEl = document.getElementById("zerobase") // 삭제버튼

var tableBody = document.getElementById("table"); // table


var timers = []; // 타이머 정보를 저장할 배열



btnEl.addEventListener("click", function(){
    var selectValue = selectEl.value;
    var hours = parseInt(inputEl_H.value) || 0;
    var minutes = parseInt(inputEl_M.value) || 0;
    var seconds = parseInt(inputEl_S.value) || 0;

    var totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if(totalSeconds <= 0){
        alert("시간을 입력하세요");
        return;
    }

    //타이머 시작
    createTimerRow(selectValue, totalSeconds, hours, minutes, seconds);
});

zeroEl.addEventListener("click", function(){
    if(tableBody.firstChild){
        tableBody.removeChild(tableBody.firstChild);
    }
});


function createTimerRow(selectValue, totalSeconds, hours, minutes, seconds){
    var newRow = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");

    td1.textContent = selectValue;
    td2.textContent = "계산중";

    newRow.appendChild(td1);
    newRow.appendChild(td2);
    tableBody.appendChild(newRow);

    //타이머 정보를 저장하는 객체
    var timer = {
        td1: td1,
        td2: td2,
        selectValue: selectValue,
        remainingTime: totalSeconds,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        intervalID: null
    };


    // 딜레이를 최소화
    requestAnimationFrame(() => {
        startTimer(timer);
    });  

    timers.push(timer); // 배열에 타이머 정보 추가
}


function startTimer(timer){

    if(timer.intervalID === null){
        timer.IntervalID = setInterval(function(){
            if(timer.remainingTime <= 0){
                clearInterval(timer.Interval);
                timer.td1.textContent = timer.selectValue;
                timer.td2.textContent = "출현";
    
                // 타이머 종료 후 배열에서 제거
                var index = timers.indexOf(timer);
                if(index !== -1){
                    timers.splice(index, 1);
                }
            }
            else{
                //타이머 정보 업데이트                
                var hours = Math.floor(timer.remainingTime / 3600);
                var minutes = Math.floor((timer.remainingTime % 3600) / 60);
                var seconds = timer.remainingTime % 60;

                //완료 예정시간 계산
                var currentTime = new Date();
                var completionTime = new Date(currentTime.getTime() + timer.remainingTime * 1000);
                var completionHours = completionTime.getHours();
                var completionMinutes = completionTime.getMinutes();
                var completionSeconds = completionTime.getSeconds();

                timer.td1.textContent = timer.selectValue;
                timer.td2.textContent = hours + " 시 " + minutes + " 분 " + seconds + " 초 " + `(${completionHours}:${completionMinutes}:${completionSeconds})`;
                timer.remainingTime--;              
            }
        }, 1000);
    }
}

