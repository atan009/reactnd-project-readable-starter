# Readable API Server

This is the starter project for the final assessment project for Udacity's Redux course where you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

## Installing

Clone the repository or download the zip and extract the files

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window
    - `cd frontend`
    - `npm start`

## Navigating the page
* The webpage should automatically open in the browser
* On the main page, all posts are displayed
* By clicking one of the categories, only those posts will be displayed

## Posts
* Upvoting/downvoting posts can be done with the +/- buttons
* The Edit button can be used to change the title and body
* Clicking delete removes the post as well as all the corresponding comments
* A post can be created by clicking the add post button and clicking submit

## Comments
* Voting works the same as posts
* The Edit button can be used to change the body
* clicking delete removes the respecive comment
* A comment can be created by clicking the add comment button and clicking submit


## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
