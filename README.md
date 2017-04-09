# webpack-build-issue
##### [Stackoverflow URL](http://stackoverflow.com/questions/41306822/webpack-url-file-loader-is-not-resolving-the-relative-path-of-url)
Webpack [url/file-loader] is not resolving the Relative Path of URL #3585

I have 2 separate project in **Workspace directory** :

 1. Project-A [Bundling using Gulp] : **Stable & Working**
 2. Project-B [Bundling using Webpack] : **New project**

As both the projects are using same Styling, so I wanted to reuse the SCSS files [consisting of standard variables, predefined layouts, modals, classes etc] of ***Project A into Project B***.

[![enter image description here][1]][1]

Now, if I am trying to import Project-A index.scss in Project-B index.scss as another partial [*Commenting out the Background Image URL Depency*], webpack is able to generate the required CSS output file.

    // Import Project A SCSS [Common Varibles, Classes, Styling etc] 
    @import "../../../../Project_A/assets/stylesheets/index";


But as Project-A's index.scss is further referring background images from the respective Relative-Path, the webpack build is throwing error 

> 'File / dir not found in XYZ/Project-B/Source/Stylesheets'.

Exact Error Block : 

> ERROR in ./src/assets/stylesheets/index.scss
Module build failed: ModuleNotFoundError: Module not found: Error: Cannot resolve 'file' or 'diWorkSpace\Project_B\src\assets\stylesheets

screenshot : 
[![**enter image description here**][2]][2]

I am not able to understand, **why Webpack is not able to resolve the Relative path of assets inside Project-A and still looking inside 'Project B'**.

Here is the Code-Repo URL for the simulated issue : 
https://github.com/raviroshan/webpack-build-issue/tree/master/WorkSpace

**Steps to reproduce.**

 1. Download the Repo. 
 2. Browse inside Project_B folder, and do a NPM install. 
 3. Run 'webpack'. It would build correctly as Relative Image
    URL code is commented out. 
 4. Now put back the commented line of code :  https://github.com/raviroshan/webpack-build-issue/blob/master/WorkSpace/Project_A/assets/stylesheets/index.scss#L27

  [1]: https://i.stack.imgur.com/jMZh9.png
  [2]: https://i.stack.imgur.com/IfQv2.png


# Solution 

So, finally after so much struggle, got a proper **SOLUTION**.

It turns out to be an issue with CSS-loader i.e it is not able to resolve the URL with respective to current file.

Using **resolve-url-loader** solved this problem.
https://www.npmjs.com/package/resolve-url-loader

     // Old Loader Config in Webpack-entry
     loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap')
    
     // New [Fixed] Loader Config in Webpack-entry
     loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!resolve-url-loader!sass-loader?sourceMap')

Here is updated Code-Repo with solution : https://github.com/raviroshan/webpack-build-issue

**Note** : Don't omit -loader
Your Webpack.config.js should always use the long-form of the loader name (i.e. the -loader suffix).

There is another package called resolve-url which Webpack can confuse with resolve-url-loader.
