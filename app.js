const dobInput = document.querySelector("#dob-input");
const submitBtn = document.querySelector("#submit-btn");
const result = document.querySelector("#output");

submitBtn.addEventListener("click", palindromeBday);

function reverseStr(str) {
    return str.split("").reverse().join("")
}

function bdayPalindrome(str) {
    return str === reverseStr(str);
}

function convertToString(date) {
    var inputDate = { day: "", month: "", year: "" };
    if (date.day < 10) {
        inputDate.day = "0" + date.day;
    } else {
        inputDate.day = date.day.toString();
    }
    if (date.month < 10) {
        inputDate.month = "0" + date.month;
    } else {
        inputDate.month = date.month.toString();
    }
    inputDate.year = date.year.toString();
    return inputDate;
}


function dateFormats(date) {
    var inputDate = convertToString(date);
    var ddmmyyyy = inputDate.day + inputDate.month + inputDate.year;
    var mmddyyyy = inputDate.month + inputDate.day + inputDate.year;
    var yyyymmdd = inputDate.year + inputDate.month + inputDate.day;
    var ddmmyy = inputDate.day + inputDate.month + inputDate.year.slice(-2);
    var mmddyy = inputDate.month + inputDate.day + inputDate.year.slice(-2);
    var yymmdd = inputDate.year.slice(-2) + inputDate.month + inputDate.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
    var palindromes = dateFormats(date);
    var flag = false;
    for (var i = 0; i < palindromes.length; i++) {
        if (bdayPalindrome(palindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 == 0) {
        return true;
    } else
    if (year % 100 == 0) {
        return true;
    } else
    if (year % 4 == 0) {
        return true;
    } else {
        return false;
    }
};

function nextDate(date) {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] ;
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    if (month == 2) {
        if(isLeapYear(year)) {
            if(day > 29) {
                day = 1;
                month++;
            }
        } else 
            if(day > 28) {
                day = 1;
                month++;
            }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    } if (month > 12) {
        month = 1;
        year++;
    }
    return { day: day,
        month: month,
        year: year
    }
};

function getNextPalindrome(date) {
    var ctr = 0;
    var newDate = nextDate(date);
    while(1) {
        ctr++;
        var bdayPalindrome = checkPalindrome(newDate);
        if(bdayPalindrome) {
            break;
        }
        newDate = nextDate(newDate);
    }
    return [ctr, newDate];
}

function palindromeBday() {
    if (dobInput.value !== "") {
        var listOfDate = dobInput.value.split("-");
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        if (checkPalindrome(date)) {
            result.innerText = `Yayy! Your Birthday is Palindrome 🤩`
        } else  {
            var [ctr, newDate] = getNextPalindrome(date);
            result.innerText = `Ohhoo! Your birthday is not a palindrome🙁. The next palindrome is ${newDate.day}-${newDate.month}-${newDate.year}. You missed it by ${ctr} days. `
        

        }
    } else {
        result.innerText = "Please enter your birthdate."
    }
}


