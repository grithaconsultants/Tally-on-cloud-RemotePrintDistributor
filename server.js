const chokidar = require('chokidar');
const path = require('path');
const io = require('socket.io')(4000, {
cors: {
    origin: '*',
  }
});

const watcher = chokidar.watch('/var/lib/tomcat9/webapps/ROOT/invoices/', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

watcher
  .on('add', filePath => {
    console.log(`File ${filePath} has been added`);
    const fileName = path.basename(filePath);
    io.emit('show-print', fileName);
  })
  .on('error', error => {
    console.error(`Watcher error: ${error}`);
  });

console.log(`Watching for file changes on /var/lib/tomcat9/webapps/ROOT/invoices/`);

