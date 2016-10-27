# Build a PC
By Ad Infinitum. A NTNU IT2805 Web Technologies project.

## Links
+ [Website](https://build-a-pc.github.io/)
+ [GitHub repo] (https://github.com/build-a-pc/build-a-pc.github.io)
+ [Slack chat] (https://webtech-adinf.slack.com/)

## Code Style
+ 2 spaces for indent, no tabs (tabs vs spaces discussion overruled)


## Hosting site locally
Since AJAX (XMLHttpRequest) is not allowed to load local files, you need to serve the site via HTTP og similar. The fastest ways of doing this if you have Python 2/3 or Node.js installed, is:

#### Node.js
If you have Node.js installed and added to PATH, you can install http-server globally.
```bash
# Install it:
npm install -g http-server
# Run it:
http-server
```

#### Python 2
If you have Python 2 installed and added to PATH, you can use the SimpleHTTPServer module.
```bash
python -m SimpleHTTPServer 8080
```

#### Python 3
If you have Python 3 installed and added to PATH, you can use the http.server module.
```bash
python -m http.server 8080
```
