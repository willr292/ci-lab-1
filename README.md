# CI Lab Instructions
We're going to... **EXPLAIN WHAT WE'LL ACHIEVE IN THE LAB**


## Environment Setup
Check if node and npm are installed (and what version?)
Check that you can run git commands
- what about git setup?  Do we need things like
git config --global user.email "<username>@users.noreply.github.com"
git config --global user.name "<username>"



## Project Setup
1. Create a GitHub account for yourself if you don't have one already (it is free!)
2. From the GitHub website, fork this repository - your new repository will be associated with your own account on GitHub.  You can use the same name as this repository.  You should be able to see your new repository within GitHub - including its history, which is copied as part of the fork.  **Exactly which button to click to see commit history?**
3. Open a terminal, navigate to a directory that you normally use for your own development, and make a local clone of your new GitHub repository. **COMMAND** 
4. Examine the structure of this project.  Take a look at the site/index.html file.  See that it references bundle.js, and that this file does not currently exist.
5. Also see that there is very little so far in your top-level directory.
6. Take a look at package.json.  This is a descriptor for the project, and ***it drives our build tool, which is npm***.  Settings to note:
	- dependencies (third-party libraries) declared at the bottom of the file
	- a 'build' script that invokes a command called 'browserify' with some arguments
	- a 'start' script that invokes a 'node' server
7. NPM is our build tool and is installed on your machine.  We're going to run a few npm commands to get our project up and running.  The behaviour of the commands is driven by the package.json file.  Start with:

    `npm install`

    This command will connect to a remote npm repository and download the packages specified.  You can see them now in the node\_modules/ directory.

8. We now have the libraries we need to build, test and run our app, but we still need to produce that missing 'bundle.js' file.  This is going to be produced by the 'browserify' tool that is made available to us via the 'browserify' dependency.  The tool can be invoked via the script labelled 'build' in the package.json.  It bundles all the .js files from the `site` directory into a single .js file.

    `npm run build`

    See that the bundle.js now exists.

9. You should now be able to start the server.  Open a new terminal window, navigate to the top-level directory of this repo and run

    `npm start`

    This command should start up an http server which hosts our application. This command also blocks the terminal, so you should use the first terminal to continue working.  (You can kill the server at any time with `Ctrl+C`, but this will bring down the app). 

10. You can now access the web application by launching a browser and navigating to `http://localhost:3000/`.  As you can see, it's a very simple game of Tic-Tac-Toe / Noughts-and-Crosses.  The app is entirely self-contained - to play against an opponent you need to take turns with the mouse!  Have a click around - note that to restart the game you need to reload the whole web page.

## Project Design
1. Back to your terminal.  Time to take a look at the design of this simple application.  What we have here is a 'Single Page Application' (SPA).  This means that all the logic for the application is served up to the browser as JavaScript alongside the regular HTML elements.

    Ignore the `server` directory - this is just serving our entire application to our web browser when you first load the page.  The interesting stuff - the HTML and the JavaScript logic - is in the `site` directory.  Take a quick look at each file in turn (don't worry about completely absorbing everything here - just get the gist of each file):
	- `index.html` lays out our game board in HTML.  Each `<span>` element corresponds to a cell in the game and is identified with a two-digit co-ordinate.
	- `model.js` has a function, `createModel` to create a representation of the game as a JavaScript object.  This returns an object that is initialised to an 'empty board' state (see `Model.prototype.reset`), and that has another function to update the state of the game when a given cell is clicked (`Model.prototype.applyClick`).  **This function contains all the core game logic - including how to decide if the game has ended.**
	- `view.js` has a single function that updates the HTML on the web page to reflect a given model object.
	- `controller.js` has a function which attaches a 'click listener' to each of the cells in the HTML grid.  When a cell is clicked, the controller invokes the `applyClick` method on the model and finally updates the HTML by invoking the function on the view object.
	- `main.js` simply ties everything together and initiates the controller. 

## Testing
1. As mentioned, the core of the game logic is in the model.js file.  We have some unit tests for this file - look in the `site/spec` directory.  The file here, `model.spec.js`, is written in JavaScript using functions from a library called 'chai'.  (You may have noticed that 'chai' was one our dependencies in package.json).  Take a look:
	-  At the top of the file is a builder function that makes it easy to prepare a game model in any given state.
	-  The tests are lower down.  We're only testing the 'applyClick' function, but we're testing several scenarios.  See how each test declares what is required, before building a model, invoking `applyClick`, and verifying the end state of the model.  Again, it's not essential to fully understand the syntax here - the key takeaway is that we have unit tests to verify the behaviour of the model object.
2. The tests can be run using a tool called 'mocha' (another dependency declared in package.json).  From the top-level directory, run 

	`./node_modules/.bin/mocha site/spec/*.spec.js`

	You should get some output on your console telling you that all the tests passed.

## Continuous Integration with CircleCI - unit testing
1. Now we'll get these tests running on every check in.  Navigate to circle ci in your web browser **[URL?]**.  Log In with your GitHub credentials, and give authorisation to CircleCI to access your repositories (CircleCI needs read-only access in order to checkout and build your code).
2. Request an initial build of your project by clicking 'Build Project'.  You should be able to watch the build in real-time running through various steps including `npm install`.  However, the build will fail, complaining that there is no test step configured.  We need to fix that.
3. Edit your local version of `package.json`.  Add a new 'script' line alongside 'build' and 'start' (GOTCHA: commas are needed after each script declaration except the last one):

    `"test": "mocha site/spec/*.spec.js"`

    The name 'test' is significant to the npm build tool - it expects it to be there, and its absence is what is causing the failure in CircleCI.  The rest of the line is just the command to invoke - it will automatically find the 'mocha' script in `./node_modules` directory.

    Having made this change, you should now be able to run your tests from your terminal with

    `npm test`

    The tests should all pass, just as before.

4. You now need to push your changed `package.json` to the GitHub repository.  Let's just check exactly what has changed.  Run the following:

    `git status`

    This should tell you that your package.json file has change.  It is the only file we have changed so far.  If you're wondering why the the generated files like `bundle.js` and the `./node_modules` directory are not recognised by this command, the repo already has a `.gitignore` file configured to explicitly ignore these.

    `git diff`

    This command gives an in-depth look at what you've changed (just added one line).

    `git commit -a -m "Specified a test script in package.json"`

    `git push`

    The 'commit' command adds all the changes you've made to your local Git repository as a 'commit', and associates a message explaining the change.  The 'push' command transmits the commit to the remote GitHub repository.

    Take a look at GitHub now, you should be able to see your commit.  Also take a look at CircleCI.  It will recognise that your repository has changed, and it will re-run the build.  This time, the test command will be executed, the tests should all pass, and the overall build will be considered a success.  You should even get a marker on GitHub showing that your latest commit resulted in a successful build.

5. So right now, the project looks good.  But in fact there are bugs with the game - you may have already noticed.  It's just that there are no automated tests to expose those bugs.  For example, once someone has won the game, the game *ought* to end.  But in fact, you can continue placing more tokens.  Try it and see for yourself.

    This is part of the normal development lifecycle.  We have identified a bug that was missed during initial development.  Rather than fixing the bug immediately, we should first write an automated test to highlight the bug.  By adding this test to our code base, we ensure that this bug can never be accidentally reintroduced.

    As we've seen, with 'chai', your tests describe expected behaviour.  The expected behaviour here is that no more clicks are allowed when the game is over.  There is a commented-out test case in `site/spec/model.spec.js` to define this behaviour.  Uncomment it and re-run the tests with `npm test`.  This test should fail.

6. Normally, a developer would now fix the bug right away.  But let's demonstrate that CircleCI will fail a build if there is a test failure.  Use the above git commands to double-check your change, commit with a sensible message, and push to GitHub.  Check on CircleCI that the build does indeed fail.
7. Now go ahead and fix the problem.  You'll need to make a change to the 'applyClick' function in `site/model.js`.  HINT: look at what the the first 'if' clause is doing and see if you can modify its conditional check.
8. Once you've made your fix locally, re-run your tests and check that they all pass.
9. Now commit and push your fix to GitHub, and check that CircleCI builds again. 

## Continuous Integration with CircleCI - linting
1. Another class of problem with an application's code base is stylistic errors.  Processes called 'linters' can analyse your code for errors and can fail a build in the same way a test runner would.
2. We'll use a tool called 'eslint'.  For starters, we need to make this tool available by declaring it as a dependency of our project.  We could do this by hand-editing `package.json`, but a faster and more reliable way is with an npm command:

    `npm install eslint --save`

    This command installs the module to `node_modules` and the `--save` flag adds an entry to your package.json.

3. We'll also need to supply some stylistic rules for eslint to check.  Style is, after all, a matter of taste, and you're free to configure the style you want for your team.  However, configuring all rules from scratch would take ages, so let's use some rules from Google to get started.  Install another dependency:

    `npm install eslint-config-google --save`

4. Now let's add some custom rules.  Create a file in your local repository root directory called .eslintrc.json.  Give it the following content (don't worry about understanding what these rules mean; not important for this lab):

    `{
	    "extends": "google",
	    "installedESLint": true,
	    "env": {
	      "browser": true
	    },
	    "rules": {
	      "linebreak-style": 0,
	      "one-var": 0
	    }
    }`

5. Specify that eslint should run immediately before the unit tests by editing the 'test' script in `package.json`.  Change it to:

    `"test": "eslint site/*.js && mocha site/spec/*.spec.js",`

6. Now try running `npm test` again.  There should be linting failures.  Run the Git commands again to commit and push to GitHub.  See that CircleCI fails your build again.

7. Now fix the linting problems locally - you'll have to read each problem carefully to determine what needs fixing.

8. When you can run `npm test` successfully again, commit and push to GitHub again.  Check that CircleCI passes the build.  

## Additional features of CircleCI
Explore extra features (provide link).

## Extensions
Another bug to fix
https://circleci.com/docs/continuous-deployment-with-heroku/
