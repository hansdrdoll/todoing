## Todoing

##### Keeps one single list
This app doesn’t sort tasks into projects or categories, but instead keeps one single list all in priority order, so you can keep track of what you need to do no matter what it’s for

##### Hashtag filters
Uses hashtags to create filters so you can view specific tasks based on how you want to organize your tasks

##### Prioritization matrix
Besides keeping track of what you need to get done, this app can help you identify what to accomplish based on how much time you have available.

In the Priority View, the app allows you to classify each task as Urgent vs. Not Urgent and Quick vs. Not Quick. These classifications, available as filters on the right panel, allow you to decide how best to use your time.

For instance, if you only have 30 min between meetings, you can use this view to identify all of your Urgent and Quick items to get them out of the way. Or, if you happen to have a relatively clear day that can be used for work time, you can quickly see what you’ve marked as Not Quick so you can make progress on move involved tasks.

##### Track dependencies
What you have to accomplish may depend on someone else providing input or taking some sort of action before you do. So that you don’t lose track of tasks with dependencies, you can simply tab to indent the task.

#### Technologies used:
- Ruby on Rails
- React
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- [react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)
- [Blueprint UI](https://github.com/palantir/blueprint)

#### Wireframes:

![Todo entry](https://git.generalassemb.ly/raw/hans/project_4/master/wireframes/Todo%20Entry.png)

![Priority Matrix](https://git.generalassemb.ly/raw/hans/project_4/master/wireframes/Priority%20Matrix.png)

#### Installation:
This app uses Ruby on Rails. If you're not sure whether you have rails installed, try [this handy guide](http://installrails.com/).

Clone *[(?)](https://help.github.com/articles/cloning-a-repository/)* this repository, go into `/todo_app` in your terminal, and run `bundle install` to install server-side dependencies.

The app uses Postgres to store data, so from inside `/todo_app` run `rails db:setup` to set up the database. Run `rails s -p 3001` to start a local server running on port 3001.

Then, go into `/todo_app/client` and run `yarn_install` to install the client-side dependencies.

Start the app by running `yarn start`. Your browser should open automatically, but if it does not you can navigate to `http://localhost:3000`.

Anytime after initial setup, you can run `rails s -p 3001` from `/todo_app` and `yarn start` from `/todo_app/client` to start the app.
