// // YOUR CODE HERE:
// $(document).ready(function() {
//   $().click(function() {

//   });
// });

var app = {
  username: 'blank',
  rooms: {},
  init: function() {

    // var executed = false;
    // inside if false then true
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
          var message = {
            roomname: 'test',
            text: enteredText,
            username: app.username
          };
          app.handleSubmit(message);
        });
      });

      app.fetch();
      setInterval(function() {
        app.fetch();
      }, 10000);
    };
    // console.log(app.name);
    // setTimeout( (function() {
    //   console.log('input value :' + $('#message').value);
    // }), 1000);
    // console.log('input value :' + $('#message').val);

    // console.log(app.storage);
    // return true;
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
      // data: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        app.storage = data.results;
        var message = {
            roomname: 'test',
            text: 'enteredText',
            username: app.username
          };
          app.storage.push(message);
        // console.log('chatterbox: Message Fetched');
        // console.log(app.storage);
        app.clearMessages();
        app.sortMessages();
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
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
    // var $chat = $('<div class = chat></div>');
    var $inputUsername = $('<div class = \'' + 'username' + ' ' + message.username + '\' >' + message.username + '</div>');
    if (!app.detectHax(message)) {
      // for all room names
      // for (var room in app.rooms) {
        // if room name class
        // if ($chat.hasClass('\'' + room + '\'')) {  
          // then do the apending for that room.. so the code below should be here.
          // i need to look at select more 
          $('#chats').append($chat);
          $chat.append($inputUsername);
          $chat.append('<div class = \'' + 'message' + ' ' + message.username + '\'>' + message.text + '</div>');
        // }
      // }
    }
    $inputUsername.click(function() { 
      console.log( message.username ); 
      app.handleUsernameClick();
    } );
    // console.log('input value :' + $('#message').val);

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
    //// we need to get class of clicked username
    // add it to friends list
    // bold those in friends list
  },
  handleSubmit: function (message) {
    app.send(message);
  },
  friendList: {},
  detectHax: function (message) {
    var hacked = false;
    var detectHaxForPart = function(part) {
      console.log(part);
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

