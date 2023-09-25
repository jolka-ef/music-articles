

## Project description


HTML templates are built with [Nunjucks](https://mozilla.github.io/nunjucks/).

CSS written using SCSS in BEM methodology used by [Philip Walton](https://philipwalton.com/).

Build process of all source files uses techniques from [Philip Walton](https://github.com/philipwalton/blog)
and such tools as Gulp and Webpack.

[View site](https://jolka-ef.github.io/music-articles/)

##  Project Structure

```
|── dev
|   └── images    
|   └── scripts
|   └── styles
|       └── base
|       └── components
|       └── placeholders
|       └── styles.scss
|── node_modules
|── tasks
|── templates
|── .eslintrc
|── .gitignore
|── content.yaml
|── gulpfile.js
|── package.json
|── sampleData.js




``` 
## Viewing the Site Locally


```sh
# Clone the git repository and cd into the cloned directory.
git clone https://github.com/jolka-ef/music-articles.git
cd project-one

# Install the dependencies
npm install

# Build and serve the site at http://localhost:8080
npm start
```
