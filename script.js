


function submitHandler(){
    //function for dating.html... takes the user input and store in variables, forms a json, calls findMatch() functio
    
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
    //setting default to no_input, but as said... inputs provided will be non-empty
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

    //taking the input of genders in which the user is interested in 
    var choiceGender = []
    if(document.getElementById('CMale').checked){
        choiceGender.push("Male")
    }
    if(document.getElementById('CFemale').checked){
        choiceGender.push("Female")
    }
    if(document.getElementById('COther').checked){
        choiceGender.push("Other")
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
        hobbies.push("Playing Music Instruments")
    }
    if(document.getElementById('Photography').checked){
        hobbies.push("Photography")
    }

    //email input
    email = document.getElementById('email').value

    //image input
    // taking the file as input normally by ".value" doesnt work because the browser converts the path of that image into C://fakepath//{image name}...

    const selectedFile = document.getElementById('pfp').files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    var base64EncodedData;
    reader.onload = function(event) {
        const base64EncodedData = event.target.result;
        console.log(base64EncodedData);
      
        // Store data in local storage after it's available
        localStorage.setItem('pfp', base64EncodedData);
      };

    console.log(pfp)

    // converting the data input3 by the user into object
    user_data = {
        "IITB Roll Number": rollNo,
        "Name": name_user,
        "Year of Study": year,
        "Age": age,
        "Gender": gender,
        "Choice of Gender": choiceGender, 
        "Interests": interests,
        "Hobbies": hobbies,
        "Email": email,
    }

    //setting items in the local storage
    localStorage.setItem('detailsFilled', true)
    localStorage.setItem('CGender', JSON.stringify(choiceGender))
    localStorage.setItem('user_details', JSON.stringify(user_data) )
    
    findMatch(user_data);
}





function findMatch(user){

    //fetching the student.json file
    fetch('./json_files/students.json')
    .then(function(response) {
        //coverting the response into js object
        return response.json();
    })
    .then(function(student) {
        //student is the name of that js object
        nStudentJson = student.length
        index = 0;
        indexMaxScore = 0;
        maxScore = 0;
        
        //iterating through the object
        while(index < nStudentJson){
            score = scoreCalculator(user, student[index])
            //1st condition: If the student in the json file is of gender that the user prefers  
            if(user["Choice of Gender"].includes(student[index].Gender)){
                if(score > maxScore){
                    indexMaxScore = index;
                    maxScore = score;
                }
            }
            index += 1;
        }
        //with this... on simply clicking on submit button on dating.html... foundMAtch.html will open and renderMatchFound() will be triggered
        window.location.href = "foundMatch.html"

        //js objects cant be stored in the localstorage directly, converting them to strings
        var jsonString = JSON.stringify(student[indexMaxScore]);
        localStorage.setItem('matchedStudent', jsonString);
        localStorage.setItem('maxScore',maxScore)
    })
    .catch(function(error) {
        //in case of any error fethcing the json file
        console.error('Error fetching student.json:', error);
    });
}


function renderMatchFound(){
    //this function is to render the match on the matchFound.html

    //accessing items from the localstorage
    var storedJsonString = localStorage.getItem('matchedStudent');
    //coverting the stored string into javascript object
    var matchedStudent = JSON.parse(storedJsonString);
    let maxScore = localStorage.getItem('maxScore')
    
    //if the highest score of compatablity of the user among any student < 0.4, it willl display no match found
    if(maxScore < 0.4) window.location.href = 'sorry.html'
    //filling in the details
    document.getElementById('nameMatch').innerHTML = matchedStudent.Name
    document.getElementById('primaryDetails').innerHTML =  matchedStudent.Name + " is " + matchedStudent.Age + " years old, Currently in " + matchedStudent["Year of Study"] + ' year.'
    document.getElementById('match-image').setAttribute('src', matchedStudent.Photo)
    document.getElementById('linkOnCard').innerHTML = "More about " + matchedStudent.Name
    document.getElementById('render-score').innerHTML = maxScore + "%"
}



function renderMatch(){
    //this function is to render the details of the matched student on the match.html page... basically function renderMatchFound() but in detail

    //getting data from the local storage
    var storedJsonString = localStorage.getItem('matchedStudent');
    //converting string into a readable js object
    var matchedStudent = JSON.parse(storedJsonString);
    //setting the name and details like iitb roll number, gender and age etc.
    document.getElementById('nameMatch').innerHTML = matchedStudent.Name
    document.getElementById('primaryDetails').innerHTML = matchedStudent.Age + ' ' + matchedStudent["Year of Study"] + ' year ' + matchedStudent["IITB Roll Number"]

    //setting hobbies
    var hobbiesRender = ""
    for(i = 0; i<matchedStudent.Hobbies.length-1; i += 1){
        hobbiesRender += matchedStudent.Hobbies[i] + ', '
    }
    hobbiesRender += matchedStudent.Hobbies[matchedStudent.Hobbies.length-1]
    document.getElementById('hobbiesMatch').innerHTML = hobbiesRender

    //setting interests
    var interestsRender = ""
    for(i = 0; i<matchedStudent.Interests.length-1; i += 1){
        interestsRender += matchedStudent.Interests[i] + ', '
    }
    interestsRender += matchedStudent.Interests[matchedStudent.Interests.length-1]
    document.getElementById('interestsMatch').innerHTML = interestsRender

    //setting image by changing src
    document.getElementById('match-image').setAttribute('src', matchedStudent.Photo)
}


function scoreCalculator(user1, user2){
    //this function is to calculate the compatablity score between 2 users

    score = 0;
    //Implementing Jaccard's Algorithm
    //Merging the arrays
    const mergedArray = [...user1.Interests, ...user2.Interests];
 
    // Converting the merged array into a Set to remove duplicates
    const unionSet = new Set(mergedArray);

    //  the size of the union set
    nUnion = unionSet.size;

    // Getting the intersection between the interests of the 2 users
    const intersection = [];
    
    // Iterate over elements in user1.Interests
    for (const element of user1.Interests) {
        // Check if the element exists in array user2.Interests
        if (user2.Interests.includes(element)) {
            // If it exists, add it to the intersection array
            intersection.push(element);
        }
    }
    //length of the intersection
    nInt =  intersection.length;

    //doing the same ith hobbies
    //getting the merged array
    const mergedArrayHobbies = [...user1.Hobbies, ...user2.Hobbies];
  
    
    // Convert the merged array into a Set to remove duplicates
    const unionSetHobbies = new Set(mergedArrayHobbies);
    
    // Get the size of the union set
    nUnion += unionSetHobbies.size;

    const intersectionHobbies = [];
    
    // Iterate over elements in user1.hobbies
    for (const element of user1.Hobbies) {
        // Check if the element exists in array user2.hobbies
        if (user2.Hobbies.includes(element)) {
            // If it exists, add it to the intersection array
            intersectionHobbies.push(element);
        }
    }

    nInt +=  intersectionHobbies.length;

    score = nInt/nUnion
    console.log(100*(Math.sqrt(score)).toFixed(2))
    //to scale the score,reduce the number if decimal points to 2 and to covert he decimal score into percentage
    return 100*(Math.sqrt(score)).toFixed(2);
    
}



function onLogin(){
    //this function gets triggered when login button is clicked

    //fetching the login file
    fetch('./json_files/login.json')
    .then(function(response) {
        //coverting into json object
        return response.json();
    })
    .then(function(data) {
        //verifying the password
        checkLoginData(data);
    });
}


function checkLoginData(data){
    //this function verifies the user and if the user is not verrified it displays the appropriate error message

    //collecting the value input by user
    inp_username = document.getElementById('username').value;
    inp_password = document.getElementById('password').value;
    error_message = document.getElementById('error_message')
    n = data.length
    index = 0

    //getting the index of the the username put by user
    while(index < n){
        if(data[index].username == inp_username) {
            break;
        }
        index += 1;
    }
    //displaying error message for invalid username
    if(index == n){
        error_message.innerHTML = "No such username found"
        error_message.style.border = "1px solid #ff0000"
        error_message.style.padding = "5px 7px"
        return;
    }
    
    // displaying error messge for wrong password
    if(data[index].password != inp_password){
        error_message.innerHTML = "Wrong password"
        error_message.style.padding = "5px 7px"
        error_message.style.border = "1px solid #ff0000"
        return
    }

    //if everything is right... this function will lead the user to the dating.html
    window.location.href = "dating.html"
    
}

//function for forgot.html
function findSecret(){
    //this function first ask for the username then ask them their secret question and then check the answer 

    // getting the username entered
    var usernameForgot = document.getElementById('forgot-username').value;
    var secretQuestion = document.getElementById('secretQuestion');
    var errorMessageForgot = document.getElementById('error_message_forgot');
    // fetching the login.json file
    fetch('./json_files/login.json')
    .then(function(response) {
        // converting the json file into javascript object
        return response.json();
    })
    .then(function(people) {
        // people is the array of js objects represent each username
        let n = people.length
        let index = -1

        //getting the index of the username entered by the user
        for(i=0; i<n; i+=1){
            if(people[i].username == usernameForgot) {
                index = i;
                break;
            }
        }
        // displaying the error if no username matches the database
        if(index == -1){
            // display is initially none and then set to block
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
            //if we get the index this means the user is found.. now we display his/her secret question
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
        // fetching the json file and coverting it to js object
        return response.json();
    })
    .then(function(people) {

        //The find() method returns the value of the first element that has the same user name as the input.

        let user = people.find(person => person.username === username);
        //if user returns undefined that means that no username matches that value. this only means that site user might have changed value after putting the correct username
        if(user == undefined){
            errorMessageForgot.style.display = "block"
            errorMessageForgot.innerHTML = "Username does not exist, please enter the correct username"
            errorMessageForgot.style.padding = "5px 7px"
            errorMessageForgot.style.border = "1px solid #ff0000"
            return
        }
        
        // if user exists
        if (user) {
            // converting the answer to lowercase so that capital letters doesnot matter as the secret answer is not something that is case sensitive
            if (enteredAnswer.toLowerCase() === user.secret_answer.toLowerCase() ) {
                // if verified... n=move to the next page
                window.location.href = "dating.html"
            } else {
                // case when the answer is wrong
                errorMessageForgot.style.display = "block"
                errorMessageForgot.innerHTML = "Incorrect answer. Please try again.";
                errorMessageForgot.style.padding = "5px 7px"
                errorMessageForgot.style.border = "1px solid #ff0000"
            }
        } 
    });
}

// function for the scroll_or_swipe.html page
function checkFilter(person, filter){
    // function gets called when someone applies filter
    // takes filter and person as input and returns if the person is passes the filter

    qualified = true

    for(i=0; i<filter.length; i+=1){
        // there can be multiple filters, so cheking each of them
        if(! person.Interests.includes(filter[i]) && ! person.Hobbies.includes(filter[i])) {
            qualified = false
            break;
        }
    }

    return qualified;
}



//function for scroll functionality
function scroll(){
    // to render everyoone (who match the filters) in the scroll-container
    // function will be called when scroll_or_swipe.html will be loaded

    cont = document.getElementById('scroll-container')
    CGender = JSON.parse(localStorage.getItem('CGender'));
    // to count number of students displayed
    var counter = 0;
    var filters = JSON.parse(localStorage.getItem('filterData'))

    fetch('./json_files/students.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(student) {
        
        let nStudent = student.length;
        container = document.getElementById('scroll-container');
        for(let i = 0; i < nStudent  ; i++) {
            // iterating through the json 
            if (filters == null || filters == []) {
                // if there are no filters, everyone will be qualified
                qualified =  true;
                // if there are no filter, no need to display the remove filters button
                document.getElementById('removeFilters').style.display = "none"
            }
            else{
                qualified = checkFilter(student[i],filters )  
            }
        
            if(CGender.includes(student[i].Gender)){
                // if the student gender is in the user's "interested in" array
        
                if(qualified){
                    // if the student passes through the filter
                    counter =+ 1;
                
                    let div = document.createElement('div');
                    div.className = "box"; // Apply the class name to the div
            

                    //create a container for the student
                    let smallerContainer = document.createElement('div');
                    smallerContainer.className = "smaller-container"; // Apply a class name for styling
                    let UltrasmallerContainer = document.createElement('div');
                    UltrasmallerContainer.className = "ultra-smaller-container"; // Apply a class name for styling
                    
                    // student name element
                    let studentName = document.createElement('p');
                    studentName.innerHTML = student[i].Name + ", "  + student[i].Age ;
                    studentName.className = 'swipe-name'

                    //student image element
                    let studentImage = document.createElement('img');
                    studentImage.setAttribute('src', student[i].Photo);

                    //student basic details, includes year of study and iitb roll number
                    let basicDetails = document.createElement('p')
                    basicDetails.innerHTML = "Currently in " + "<b>" + student[i]["Year of Study"]+ "</b>" + " year.<br>" + "IITB Roll Number: "+ student[i]["IITB Roll Number"]  

                    //interests and hobbies
                    let intAndHob = document.createElement('p');
                    intAndHob.innerHTML = "<b>Interests</ b> <br> ";
                    for(x=0; x<student[i].Interests.length-1; x+=1) intAndHob.innerHTML += student[i].Interests[x] + ",  " 
                    intAndHob.innerHTML += student[i].Interests[student[i].Interests.length-1] + "<br><b>Hobbies </b><br>"
                    for(x=0; x<student[i].Hobbies.length-1; x+=1) intAndHob.innerHTML += student[i].Hobbies[x] + ", "
                    intAndHob.innerHTML += student[i].Hobbies[student[i].Hobbies.length-1]

                    //add to the div
                    // this div structure is to apply styles later
                //     scroll-container                      box
                //     ______|__________...                   |
                //    |    |    |    |  ...            smaller-container   
                //   box box   box  box ...                ___|___ 
                //                                        |       |   
                //                                     profile  ultra-smaller-
                //                                       img      container
                //                                                    |
                //                                           rest of the details 

                    smallerContainer.appendChild(studentImage);
                    UltrasmallerContainer.appendChild(studentName);
                    UltrasmallerContainer.appendChild(basicDetails)
                    UltrasmallerContainer.appendChild(intAndHob);
                    smallerContainer.appendChild(UltrasmallerContainer)
                    div.appendChild(smallerContainer);
                    
                    // Append the div to the container
                    container.appendChild(div);
            }}
        }

        // border cases for css
        boxArray = document.getElementsByClassName('box')
        if(boxArray.length == 1){
        boxArray[boxArray.length-1].setAttribute('style', "margin-left: 0%;")
        }
        else if(boxArray.length > 1){
            boxArray[boxArray.length-1].setAttribute('style', "margin-right: 20%;")
        }
        if(counter == 0){
            // if no result is found go to this page
            window.location.href = "scroll_not_found.html"
        }
    }
)
}

function removeFilters(){
    console.log('toto')
    localStorage.removeItem('filterData')
    // console.log(localStorage.getItem('filterData'))
     window.location.href = 'scroll_or_swipe.html'
}


// function loginPageSlideShow() {
//     // Define a function to change the images
//     function changeImages() {
//         var image1 = document.getElementById("login-photos1");
//         var image2 = document.getElementById("login-photos2");
//         var x = Math.floor(Math.random() * 6); // Assuming you have 6 images named 0.png to 5.png
//         image1.src = "./assets/loginSlideShow/" + x + ".png";
//         x = Math.floor(Math.random() * 6);
//         image2.src = "./assets/loginSlideShow/" + x + ".png";
//     }

//     // Call the function immediately to change images on page load
//     changeImages();

//     // Set interval to change images every 5 seconds
//     setInterval(changeImages, 5000);
// }


function logoutFun(){
    // function is called when logout is clicked on the navbar

    // everything stored in the local storage is removed so that no difficulty arises if a different user logs in again
    localStorage.removeItem("matchedStudent");
    localStorage.removeItem("detailsFilled");
    localStorage.removeItem("maxScore")
    localStorage.removeItem('filterData')
    localStorage.removeItem('CGender')
    
}

function openNav(){
    //function is called when filter button in the scroll_or_swipe.html page is clicked
    // opens the filterbar

    document.getElementById("filterBar").style.height = "180px";
    // now clicking on the filter button will close the filter bar 
    document.getElementById('filter-dropdown').setAttribute('onclick','closeNav()')
    // the dropdown image present in the filter button will get reversed
    document.getElementById('dropdown-arrow').setAttribute('src','./assets/caret-arrow-up.png')
    document.getElementById('dropdown-arrow').setAttribute('width','10px')
    document.getElementById('filter-container').style.paddingBottom = "20px"

}

function closeNav() {
    // //function is called when filter button in the scroll_or_swipe.html page is clicked adn filter bar is open
    // closes the filter bar

    document.getElementById("filterBar").style.height = "0";
    // now clicking on the filter button will opem the filter bar 
    document.getElementById('filter-dropdown').setAttribute('onclick','openNav()')
    // the up pointing image present in the filter button will get reversed
    document.getElementById('dropdown-arrow').setAttribute('src','./assets/down-arrow.png')
    document.getElementById('dropdown-arrow').setAttribute('width','15px')
    document.getElementById('filter-container').style.paddingBottom = "0px"
  }

function  FilterFunction(){
    // function is called when the filter button is hit in the filter bar in scroll_or_swipe.html page
    // first takes the input... what hobby or interest the user want to filter out

    // combined array for interests and hobbies
    interestsHobbies = []
    // checking if the interests are checked one by one
    if(document.getElementById('Traveling').checked){
        interestsHobbies.push("Traveling")
    }
    if(document.getElementById('Sports').checked){
        interestsHobbies.push("Sports")
    }
    if(document.getElementById('Movies').checked){
        interestsHobbies.push("Movies")
    }
    if(document.getElementById('Music').checked){
        interestsHobbies.push("Music")
    }
    if(document.getElementById('Literature').checked){
        interestsHobbies.push("Literature")
    }
    if(document.getElementById('Fashion').checked){
        interestsHobbies.push("Fashion")
    }
    if(document.getElementById('Art').checked){
        interestsHobbies.push("Art")
    }
    if(document.getElementById('Technology').checked){
        interestsHobbies.push("Technology")
    }
    // checking if the hobbies are checked one by one
    if(document.getElementById('Reading').checked){
        interestsHobbies.push("Reading")
    }
    if(document.getElementById('Cooking').checked){
        interestsHobbies.push("Cooking")
    }
    if(document.getElementById('Coding').checked){
        interestsHobbies.push("Coding")
    }
    if(document.getElementById('Gardening').checked){
        interestsHobbies.push("Gardening")
    }
    if(document.getElementById('Painting').checked){
        interestsHobbies.push("Painting")
    }
    if(document.getElementById('scrolling').checked){
        interestsHobbies.push("scrolling")
    }
    if(document.getElementById('playMusic').checked){
        interestsHobbies.push("Playing Music Instruments")
    }
    if(document.getElementById('Photography').checked){
        interestsHobbies.push("Photography")
    }

    // when filter button is hit the remove filter button will appear
    document.getElementById('removeFilters').style.display = 'block'
    localStorage.setItem('filterData', JSON.stringify(interestsHobbies))
    window.location.href = 'scroll_or_swipe.html'
}

function renderOwnDetails() {
    // this function will be triggered when the user clicks on home when on any page other than dating.html

    // geting details and oimage from the local storage
    var user = JSON.parse(localStorage.getItem('user_details'));
    console.log(user)
    pic = localStorage.getItem('pfp')
    console.log(pic)
    CGender = JSON.parse(localStorage.getItem('CGender'));
    console.log(CGender)

    //displaying the data in the appropriate elements
    document.getElementById('own-name').innerHTML = user.Name;
    document.getElementById('own-interests').innerHTML = "Interests include " +user.Interests.join(', ');
    document.getElementById('own-hobbies').innerHTML = user.Hobbies.join(', ') + " " + (user.Hobbies.length > 1 ? "are the hobbies." : "is an hobby.");
    document.getElementById('own-details').innerHTML = user.Age + ', ' + user.Gender + '<br>Looking for ' + (CGender.length == 1 ? CGender[0] : (CGender.length == 2) ? CGender[0] + ' and ' + CGender[1] : CGender[0] + ', ' + CGender[1] + ' and ' + CGender[2] ) ;
    document.getElementById('own-image').setAttribute('src', pic);

}


function scroll_the_scroll_container(e){
    // this function gets called when the user press any key when on the scrll_or_swipe.html page
    //basically, if the key pressed in right arrow key, it will scroll the scroll-container to the next box, hence displaying the next user

    if(e.code == 'ArrowRight'){
        document.getElementById('scroll-container').scrollBy(1650,0);
    }

    // if the key pressed in left arrow key, it will scroll the scroll-container to the previous box, hence displaying the previous user
    else if(e.code == 'ArrowLeft'){
        document.getElementById('scroll-container').scrollBy(-1650,0);
    }
}