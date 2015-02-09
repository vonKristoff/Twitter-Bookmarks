#Twitter-Bookmarks

Features achieved:

* Twitter authentication dance
* auto-login on refresh
* pull in 25 tweets into desired style brief
* drag/drop resort and save to localStorage
* Any new favourites get prepended to top of the existing order

Features failed in time:

* IOS optimisation / mobile touch events
* Bespoke Desktop styles
* Time!


===

###Testing the app

The Twitter application makes a callback to `localhost:8888/twitter/index.php`, so like me please run **MAMP** at std port and deploy the code to the **twitter** directory as seen above in the callback. This will create issues if you try running this on a mobile, as it wont know where localhost is. Sorry.

###Application design

I did want to develop with `node`, but as for portability and the usage of `oauth`, I had to opt to use `php` as the backend manager.

The app follows basic `MVC` conventions. I have not used a framework, and wrote the drag and drop / resort functionallity myself rather than using an existing lib to do that. (probably shouldn't have done that however)

I hope things are straight forward to see how I tackled the app. I use the very basic `Transparency` template engine to render the tweets on the client side.

1. Once authorizred, the app gets a new bunch of favourite tweets from Twitter API 1.1
2. The tweets are digested into a filtered model, and then localstorage is checked for previous useage, then differences are matched in case of new favourite tweets, yet preserving the order, and finally combined into a 'live model', ready for sorting to be applied.
3. The results are rendered to the DOM.
4. Any Interaction is now handled by the `UI` event listeners, and any consequences are passed to the `Controller` to digest and update the `Model`, after which the page is re-rendered in the new order, making sure all DOM elements match the Model.

###Build tools

I used `gulp` as the build manager, to watch/preprocess `Jade` & `stylus` as well as copy my JS application files that are modularised via `require js`.

The `dev` folder is where I work from for the client side build.