---
layout: essay
type: essay
title: "Meteor Gotchas"
date: 2017-10-19
labels:
  - Software Engineering
  - Meteor
---
<p> 
  In working on a new repository called, "digits", I have encountered many problems.  But probably on the of the biggest problems is in carelessness.  In terms of carelessness, the area that I am most struggling with is in simple typos.  For example, when we were working with a file called "contacts.js", I accidently typed in contact.js in one of my "index.js" files.  Because of this simple typo, I was having multiple issues with the pages not loading.  Unfortunately, we were working with quite a bit of different file and to find this single error took forever to find.
</p>
<p>
  Thankfully, these seemingly simple error has really taught me to learn to use the various features of Intellij IDEA.  You know that environment that I previously have stated that I did not like due to my unfamiliarity with it…  I guess I am getting better aquatinted with it and learning to appreciate it’s power and sophistication.  Intellij helps the user out by pointing out where our errors are.  IntelliJ does this by a red x in the upper right corner of the environment window and with small clickable dashes where the error occurs within your code in a right hand column.  Additionally, to help out in finding our errors, we also are using the Meteor application.  When running Meteor in a terminal window, we find that if we were to have an error that cause the web application to stop running, that the particular error will instead be displayed on both the terminal window and the webpage (localhost:3000).  Learning to read and understand these error and learning how to locate and fix the problem had really gotten me a better understanding of the Meteor application and of Intellij.  So I am looking at all my typos as a benefit!  :P  Well, I guess I still need to work on reducing them.
</p>
<p>
Another problem that I am having with this unit is the sheer number of files that we are beginning to use.  In any project that we are using, we find ourselves having to edit a multitude of files.  These begin with server file, client files, and “both” files.  From there we have multiple html and js files for each one of those.  For the database, we need a html and js file for each page that accesses the database.  Then we need to import all of these files together and include them everywhere.  Keeping track of the overall structure has been a nightmare!  To make matters worse, as I found out from my spelling errors and from the view lessons, if even one of your files does not work or is not linked in properly, your entire application will not run.
</p>
Unfortunately, I have found that my brain is so over tapped that it is not able to get a grasp on the specifics of the file structure on how everything is related.  Thankfully, the naming convention is quite helpful.  Between that an keeping a piece of paper handy to sketch out the mapping of the interrelations for these files has been a blessing!  But even with this, the sheer number of file and the web of connections that they create still lead to a fair amount of difficulties.
<p>
