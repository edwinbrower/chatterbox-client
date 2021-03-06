// // YOUR CODE HERE:
// $(document).ready(function() {
//   $().click(function() {

//   });
// });

var app = {
  username: 'blank',
  rooms: {
    lobby: true
  },
  init: function() {
    return function() {
      $(document).ready(function() {
        app.username = window.location.search;
        app.username = app.username.slice(app.username.indexOf('=') + 1);
        $('#createRoomForm').submit(function(event) {
          event.preventDefault();
          var newRoom = $('#roomid').val();
          app.renderRoom(newRoom);  
        });
        $('#send').submit(function(event) {
          event.preventDefault();
          var enteredText = $('#message').val();
          console.log(enteredText);
          var room = $('#roomSelect').select().val();
          console.log(room);
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
      var chatmessage = app.storage[i];
      if (!app.detectHax(chatmessage)) {
        app.renderRoom(chatmessage.roomname);
        app.renderMessage(chatmessage);
      }
    }
  },
  renderMessage: function(message) {
    var $chat = $('<div class = \'' + 'chat ' + message.roomname + '\'></div>');
    if (message.username in app.friendList) {
      $chat.addClass('friend');
    }
    var $inputUsername = $('<div class = \'' + 'username' + ' ' + message.username + '\' >' + message.username + '</div>');
    room = $('#roomSelect').select().val() || 'lobby';
    if ($chat.hasClass(room)) {  
      $('#chats').append($chat);
      $chat.append($inputUsername);
      $chat.append('<div class = message>' + message.text + '</div>');
    }
    $inputUsername.click(function() { 
      console.log( message.username ); 
      app.handleUsernameClick(message.username);
    } );
  },
  renderRoom: function(room) {
    if (!(room in app.rooms)) {
      app.rooms[room] = true;
      $room = $('<option class = \"' + room + '\">' + room + '</option>');
      $('#roomSelect').append($room);
    } 
  },
  handleUsernameClick: function(username) {
    if (username in app.friendList) {
      var userclass = '.' + username;
      var $parent = $(userclass).parent();
      $parent.removeClass('friend');
      delete app.friendList[username];
    } else {
      app.friendList[username] = true;
    }
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

