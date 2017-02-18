// // YOUR CODE HERE:
// $(document).ready(function() {
//   $().click(function() {

//   });
// });

var app = {
  username: 'blank',
  rooms: {},
  init: function() {
    return function() {
      $(document).ready(function() {
        app.username = window.location.search;
        app.username = app.username.slice(app.username.indexOf('=') + 1);
        // $('#createRoom').submit(function(event) {
        //   console.log('creating ROOM');
        // });
        $('#send').submit(function(event) {
          event.preventDefault();
          var enteredText = $('#message').val();
          console.log(enteredText);
          var room = $('#roomSelect').select().val();
          var message = {
            roomname: room,
            text: enteredText,
            username: app.username
          };
          app.handleSubmit(message);
        });
      });

      app.fetch();
      setInterval(function() {
        app.fetch();
      }, 1000);
    };
  },
  storage: [],
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        app.storage.push(message);
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        app.storage = data.results;
        app.clearMessages();
        app.sortMessages();
      },
      error: function (data) {
        console.error('chatterbox: Failed to fetch message', data);
      }
    });
  },
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  clearMessages: function() {
    $('#chats').children().remove();
  },
  sortMessages: function() {
    for (var i = 0; i < app.storage.length; i++) {
      var chatmessage = app.storage[i];  // will sort later
      app.renderRoom(chatmessage);
      app.renderMessage(chatmessage);
    }
  },
  renderMessage: function(message) {
    var $chat = $('<div class = \'' + 'chat ' + message.roomname + '\'></div>');
    var $inputUsername = $('<div class = \'' + 'username' + ' ' + message.username + '\' >' + message.username + '</div>');
    if (!app.detectHax(message)) {
      room = $('#roomSelect').select().val();
      if ($chat.hasClass(room)) {  
        $('#chats').append($chat);
        $chat.append($inputUsername);
        $chat.append('<div class = \'' + 'message' + ' ' + message.username + '\'>' + message.text + '</div>');
      }
    }
    $inputUsername.click(function() { 
      console.log( message.username ); 
      app.handleUsernameClick();
    } );
  },
  renderRoom: function(message) {
    var room = message.roomname;
    if (!app.detectHax(message)) {
      if (!(room in app.rooms)) {
        app.rooms[room] = true;
        $room = $('<option class = \"' + room + '\">' + room + '</option>');
        $('#roomSelect').append($room);
      } 
    }
  },
  handleUsernameClick: function() {
  
  },
  handleSubmit: function (message) {
    app.send(message);
  },
  friendList: {},
  detectHax: function (message) {
    var hacked = false;
    var detectHaxForPart = function(part) {
      // console.log(part);
      if (part === undefined || part === null || part === '') {
        hacked = true;
        return;
      }
      if (part[0] === '<' || part[0] === '%' || part.includes('script') ) {
        hacked = true;
        return;
      }
    };
    detectHaxForPart(message.username);
    detectHaxForPart(message.text);
    detectHaxForPart(message.roomname);
    return hacked;
  }
};

app.init()();

