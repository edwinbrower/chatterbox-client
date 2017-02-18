// // YOUR CODE HERE:
// $(document).ready(function() {
//   $().click(function() {

//   });
// });

var app = {
  username: 'blank',
  init: function() {
    // var executed = false;
    // inside if false then true
    return function () {
      $(document).ready(function() {
        app.username = window.location.search;
        app.username = app.username.slice(app.username.indexOf('=') + 1);
        console.log(app.username);  
        $('#send').submit(function(event) {
          event.preventDefault();
          var enteredText = $('#message').val();
          console.log(enteredText);
          var message = {
            roomname: 'lobby',
            text: enteredText,
            username: app.username
          };
          app.handleSubmit(message);
        });
      });
      app.fetch();
      setInterval(function() {
        app.fetch();
      }, 15000);
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
      // data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        app.storage = data.results;
        console.log('chatterbox: Message Fetched');
        // console.log(app.storage.room1[0]);
        // console.log(JSON.stringify(app.storage));
        console.log(app.storage);
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
      app.renderMessage(chatmessage);
    }
  },
  renderMessage: function(message) {
    var tempUsername = message.username;
    var $inputUsername = $('<div class = \'' + 'username' + ' ' + message.username + '\' >' + message.username + '</div>');
    $('#chats').append($inputUsername);
    $inputUsername.append('<div class = message \'' + message.username + '\'>' + message.text + '</div>');
    $inputUsername.click(function() { 
      console.log( message.username ); 
      app.handleUsernameClick();
    } );
    // console.log('input value :' + $('#message').val);

  },
  renderRoom: function(id) {
    $('#roomSelect').append('<div id = \"' + id + '\"></div>');
  },
  handleUsernameClick: function() {
    // called: false
  },
  handleSubmit: function (message) {
    app.send(message);
  },
  friendList: {}
};

app.init()();
