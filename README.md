# gulpflow
My gulp.js kit for rapidly building static pages and websites


--
### Getting started
- Clone the repository in your /dev folder
- Open the terminal inside the folder

```sh    
sudo node npm install 
```
- wait until complete

```sh    
gulp 
```
- You are finished!   
	
--
### Folders

I've chosen the folder structure that most suits my needs in order to keep thigs separated. You can rearrange the files as you like, just remember to update gulpfile.js

####/scss
As you guess, this folder contains the .scss files.
We have grid.scss and theme.scss

####/scripts
Here you will find main.js, an empty file, just in case you need it. 

####/images
All your images belong here.

####/assets
I managed to move all the processed files inside this folder.
Once you've finished to create your page, yo're supposed to move in production only index.html (or other html files) and this folder.