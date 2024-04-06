


function submitHandler(){
    //roll no input
    rollNo = document.getElementById('rollNumber').value
    //name input
    name_user = document.getElementById('name').value
    //year of study input
    year = document.getElementById('year').value
    //age input
    age = document.getElementById('age').value
    //gender input
    male = document.getElementById('Male')
    female = document.getElementById('Female')
    other_gender = document.getElementById('Other')
    var gender = "no_input";
    if (male.checked){
        gender = "Male"
    }
    else if (female.checked){
        gender = "Female"
    }
    else if (other_gender.checked){
        gender = "Other"
    }
    
    //interest input
    var interests = []
    if(document.getElementById('Traveling').checked){
        interests.push("Traveling")
    }
    if(document.getElementById('Sports').checked){
        interests.push("Sports")
    }
    if(document.getElementById('Movies').checked){
        interests.push("Movies")
    }
    if(document.getElementById('Music').checked){
        interests.push("Music")
    }
    if(document.getElementById('Literature').checked){
        interests.push("Literature")
    }
    if(document.getElementById('Fashion').checked){
        interests.push("Fashion")
    }
    if(document.getElementById('Art').checked){
        interests.push("Art")
    }
    if(document.getElementById('Technology').checked){
        interests.push("Technology")
    }
    // hobbies input
    var hobbies = []
    if(document.getElementById('Reading').checked){
        hobbies.push("Reading")
    }
    if(document.getElementById('Cooking').checked){
        hobbies.push("Cooking")
    }
    if(document.getElementById('Coding').checked){
        hobbies.push("Coding")
    }
    if(document.getElementById('Gardening').checked){
        hobbies.push("Gardening")
    }
    if(document.getElementById('Painting').checked){
        hobbies.push("Painting")
    }
    if(document.getElementById('scrolling').checked){
        hobbies.push("scrolling")
    }
    if(document.getElementById('playMusic').checked){
        hobbies.push("playMusic")
    }
    if(document.getElementById('Photography').checked){
        hobbies.push("Photography")
    }

    //email input
    email = document.getElementById('email').value

    //image input
    pfp = document.getElementById('pfp').value

    user_data = {
        "IITB Roll Number": rollNo,
        "Name": name_user,
        "Year of Study": year,
        "Age": age,
        "Gender": gender,
        "Interests": interests,
        "Hobbies": hobbies,
        "Email": email,
        "Photo": pfp
    }
    
    findMatch(user_data);
}






function findMatch(user){
    fetch('./json_files/students.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(student) {
        nStudentJson = student.length
        index = 0;
        indexMaxScore = 0;
        maxScore = 0;

        while(index < nStudentJson){
            score = scoreCalculator(user, student[index])
            if(score >= maxScore){
                indexMaxScore = index;
                maxScore = score;
            }
            index += 1;
        }
        window.location.href = "foundMatch.html"
        var jsonString = JSON.stringify(student[indexMaxScore]);
        localStorage.setItem('matchedStudent', jsonString);
    })
    .catch(function(error) {
        console.error('Error fetching JSON:', error);
    });
}


function renderMatchFound(){
    var storedJsonString = localStorage.getItem('matchedStudent');
    var matchedStudent = JSON.parse(storedJsonString);
    document.getElementById('nameMatch').innerHTML = matchedStudent.Name
    document.getElementById('primaryDetails').innerHTML = matchedStudent.Age + ' ' + matchedStudent["Year of Study"] + ' year ' + matchedStudent["IITB Roll Number"]
    document.getElementById('match-image').setAttribute('src', matchedStudent.Photo)

}



function renderMatch(){
    var storedJsonString = localStorage.getItem('matchedStudent');
    var matchedStudent = JSON.parse(storedJsonString);
   console.log(matchedStudent)
   document.getElementById('nameMatch').innerHTML = matchedStudent.Name
   document.getElementById('primaryDetails').innerHTML = matchedStudent.Age + ' ' + matchedStudent["Year of Study"] + ' year ' + matchedStudent["IITB Roll Number"]
   var hobbiesRender = ""
   for(i = 0; i<matchedStudent.Hobbies.length-1; i += 1){
    hobbiesRender += matchedStudent.Hobbies[i] + ', '
   }
   hobbiesRender += matchedStudent.Hobbies[matchedStudent.Hobbies.length-1]
   document.getElementById('hobbiesMatch').innerHTML = hobbiesRender

   var interestsRender = ""
   for(i = 0; i<matchedStudent.Interests.length-1; i += 1){
    interestsRender += matchedStudent.Interests[i] + ', '
   }
   interestsRender += matchedStudent.Interests[matchedStudent.Interests.length-1]
   document.getElementById('interestsMatch').innerHTML = interestsRender

   document.getElementById('match-image').setAttribute('src', matchedStudent.Photo)


}






function scoreCalculator(user1, user2){
    score = 0;
    //iterate in interests
    for(i = 0; i<user1.Hobbies.length; i+=1){
        for(j=0; j<user2.Hobbies.length; j+=1 ){
            if(user1.Hobbies[i] == user2.Hobbies[j]) score += 1;
        }
    }
    //iterate in interests
    for(i = 0; i<user1.Interests.length; i+=1){
        for(j=0; j<user2.Interests.length; j+=1 ){
            if(user1.Interests[i] == user2.Interests[j]) score += 1.25;
        }
    }
    return score;
}







function onLogin(){
    fetch('./json_files/login.json')
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        checkLoginData(data);
    });
}







function checkLoginData(data){
    inp_username = document.getElementById('username').value;
    inp_password = document.getElementById('password').value;
    error_message = document.getElementById('error_message')
    n = data.length
    index = 0
    while(index < n){
        if(data[index].username == inp_username) {
            break;
        }
        index += 1;
    }
    if(index == n){
        error_message.innerHTML = "No such username found"
        error_message.style.border = "1px solid #ff0000"
        error_message.style.padding = "5px 7px"
        return;
    }
    
    if(data[index].password != inp_password){
        error_message.innerHTML = "Wrong password"
        error_message.style.padding = "5px 7px"
        error_message.style.border = "1px solid #ff0000"
        return
    }

    window.location.href = "dating.html"
    
}




//function for forgot.html
function findSecret(){
    var usernameForgot = document.getElementById('forgot-username').value;
    var secretQuestion = document.getElementById('secretQuestion');
    var errorMessageForgot = document.getElementById('error_message_forgot');
    fetch('./json_files/login.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(people) {
        console.log(people.length)
        let n = people.length
        let index = -1
        for(i=0; i<n; i+=1){
            if(people[i].username == usernameForgot) {
                index = i;
                break;
            }
        }
        if(index == -1){
            errorMessageForgot.style.display = "block"
            errorMessageForgot.innerHTML = "No such username exists"
            errorMessageForgot.style.padding = "5px 7px"
            errorMessageForgot.style.border = "1px solid #ff0000"

            //next 3 lines of code just 'undisplay' what was displayed to the user when the username was put correct... now after putting correct username if again the user inputs wrong input the question will disappearr

            document.getElementById('secretAnswer').style.display = "none"
            document.getElementById('checkSecretAnswerInput').style.display = "none"
            secretQuestion.style.display = "none"
        }
        else{
            secretQuestion.innerHTML = people[index].secret_question;
            secretQuestion.style.display = "block"
            document.getElementById('secretAnswer').style.display = "block"
            document.getElementById('checkSecretAnswerInput').style.display = "block"
            errorMessageForgot.style.display = "none"
        }
        
    })
}



//function to check the answer
function checkSecretAnswer() {
    var enteredAnswer = document.getElementById('secretAnswer').value;
    var username = document.getElementById('forgot-username').value;
    var errorMessageForgot = document.getElementById('error_message_forgot');

    
    fetch('./json_files/login.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(people) {

        //The find() method returns the value of the first element that has the same user name as the input.

        let user = people.find(person => person.username === username);
        //if user returns undefined that means that no username matches that value. this only means that site user might have changed value after putting the correct username
        if(user == undefined){
            errorMessageForgot.style.display = "block"
            errorMessageForgot.innerHTML = "Username does not exist, please dont do bakchodi"
            errorMessageForgot.style.padding = "5px 7px"
            errorMessageForgot.style.border = "1px solid #ff0000"
            return
        }
        
        if (user) {
            if (enteredAnswer.toLowerCase() === user.secret_answer.toLowerCase() ) {
                window.location.href = "dating.html"
            } else {
                errorMessageForgot.style.display = "block"
                errorMessageForgot.innerHTML = "Incorrect answer. Please try again.";
                errorMessageForgot.style.padding = "5px 7px"
                errorMessageForgot.style.border = "1px solid #ff0000"
            }
        } else {
            alert("No such username exists.");
        }
    });
}




//function for scoll functionality
function scroll(){

    var storedJsonString = localStorage.getItem('matchedStudent');
    var matchedStudent = JSON.parse(storedJsonString);
    fetch('./json_files/students.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(student) {
        let nStudent = student.length;
        console.log(nStudent)
        container = document.getElementById('scroll-container');
        for(let i = 0; i < nStudent  ; i++) {
            //putting condition so that the user dont see the matched(not good enough) person again
            if( student[i]["IITB Roll Number"] != matchedStudent["IITB Roll Number"] ){
            let div = document.createElement('div');
            div.className = "box"; // Apply the class name to the div

            //create a container for the student name
            let smallerContainer = document.createElement('div');
            smallerContainer.className = "smaller-container"; // Apply a class name for styling

            // student name element
            let studentName = document.createElement('p');
            studentName.innerHTML = student[i].Name;

            //student image element
            let studentImage = document.createElement('img');
            studentImage.setAttribute('src', student[i].Photo);

            //student basic details
            let basicDetails = document.createElement('p')
            basicDetails.innerHTML = "Currently in " + student[i]["Year of Study"] + " year.<br>Age: " + student[i].Age + "<br>IITB Roll Number: "+ student[i]["IITB Roll Number"]  

            //interests and hobbies
            let intAndHob = document.createElement('p');
            intAndHob.innerHTML = "Interests: ";
            for(x=0; x<student[i].Interests.length-1; x+=1) intAndHob.innerHTML += student[i].Interests[x] + ", "
            intAndHob.innerHTML += student[i].Interests[student[i].Interests.length-1] + "<br>Hobbies: "
            for(x=0; x<student[i].Hobbies.length-1; x+=1) intAndHob.innerHTML += student[i].Hobbies[x] + ", "
            intAndHob.innerHTML += student[i].Hobbies[student[i].Hobbies.length-1]




            //add to the div
            smallerContainer.appendChild(studentName);
            smallerContainer.appendChild(studentImage);
            smallerContainer.appendChild(basicDetails)
            smallerContainer.appendChild(intAndHob);
            div.appendChild(smallerContainer);
           

            // Append the div to the container
            container.appendChild(div);

            console.log(student[i]);
            }
        }
    })
}

function loginPageSlideShow() {
    // Define a function to change the images
    function changeImages() {
        var image1 = document.getElementById("login-photos1");
        var image2 = document.getElementById("login-photos2");
        var x = Math.floor(Math.random() * 6); // Assuming you have 6 images named 0.png to 5.png
        image1.src = "./assets/loginSlideShow/" + x + ".png";
        x = Math.floor(Math.random() * 6);
        image2.src = "./assets/loginSlideShow/" + x + ".png";
    }

    // Call the function immediately to change images on page load
    changeImages();

    // Set interval to change images every 5 seconds
    setInterval(changeImages, 5000);
}
