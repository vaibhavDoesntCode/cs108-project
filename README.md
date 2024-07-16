# Dating App Project
# Finder

## Overview
This project aims to create a basic dating website using HTML, CSS, and JavaScript. The goal is to build a platform where users can enter personal information and find potential matches among a pool of students. The website is designed to be user-friendly and facilitate connections between users.

## Features

### Login Page
The login page serves as the gateway to access the input interface. Users must enter a username and password combination. If the credentials match a registered user stored in the `login.json` file, access is granted. If not, appropriate error messages are displayed. The login page is implemented in `login.html`.

### “Forgot Password?” Button
The "Forgot Password?" feature helps users recover their passwords. Upon clicking the button, users are directed to `forgot.html` or remain on the login page to answer a secret question from the `login.json` file. If the answer is correct, the password is revealed; otherwise, an error message is displayed.

### Input Interface
Users can fill in their personal details using an input interface implemented in `dating.html` and styled with `style.css`. Fields include:
- IITB Roll Number
- Name
- Year of Study
- Age
- Gender (radio buttons)
- Interests (checkboxes)
- Hobbies (checkboxes)
- Email
- Photo
- Interested in (for orientation)

The "Submit" button initiates the search for the ideal match, and a "Logout" button allows users to return to the login screen.

### Swiping
Users can browse profiles and photos stored in the `students.json` file by accessing the `scroll_or_swipe.html` page. This page filters profiles based on the user's "interested in" input.

### Finding the “Right” Match
The "Submit" button on `dating.html` finds a suitable match among profiles in `students.json` using JavaScript. Matches are based on shared interests and custom criteria, with the Jaccard matching algorithm generating a score based on common hobbies/interests.

### Customizations
- **Search**: Users can search for profiles based on various criteria.
- **Sending Mail**: Users can send emails to their matches using EmailJS.
- **Cookies**: Cookies are used to store user sessions and preferences.
- **Filters**: Users can apply and remove filters to refine their searches.
- **Like Meter**: A feature to measure user interest.
- **Profile Page**: Users can view and edit their profiles.

## Instructions to Start the Server
1. Write `python3 -m http.server` in the terminal and press enter.
2. Open any browser and type `localhost:8000/login.html`.

## JavaScript Functions
- `submitHandler()`
- `findMatch()`
- `renderMatchFound()`
- `renderMatch()`
- `scoreCalculator(user1, user2)`
- `onLogin()`
- `checkLoginData(data)`
- `findSecret()`
- `checkSecretAnswer()`
- `checkFilter(person, filter)`
- `scroll()`
- `likeMeter()`
- `removeFilters()`
- `logoutFun()`
- `openFilterBar()`
- `closeFilterBar()`
- `FilterFunction()`
- `renderOwnDetails()`
- `scroll_the_scroll_container(e)`
- `setCookie()`
- `setForgotCookie()`
- `getCookie(key)`
- `checkCookie()`
- `checkCookiePages()`
- `removeFilterButton()`
- `searchFun()`
- `renderSearch()`
- `renderSearchResult()`
- `sendEmail(email, name, matchEmail, matchName, message)`

## Conclusion
This project demonstrates the creation of a basic dating website with essential features for user interaction and matchmaking. It serves as a foundation for further development and customization.

---

**Submitted by:** Vaibhav Singh, 23B1068  
**Course:** CS108  
**Institution:** Indian Institute of Technology Bombay  
**Semester:** Spring 2024
