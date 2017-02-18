// YOUR CODE HERE:
var app = {
  init: function() {
    app.fetch();
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

    for (var i = 0; i < 16; i++) {
      var chatmessage = app.storage[i];  // will sort later
      app.renderMessage(chatmessage);
    }
  },
  renderMessage: function(message) {
    var tempUsername = message.username;
    var $inputUsername = $('<div class = \'' + message.username + '\'>' + message.username + '</div>');
    // $('#chats').append('<div>' + inputUsername + '</div>');
    // debugger;
    $('#chats').append($inputUsername);
    // debugger;
    // $('\'.' + message.username + '\'').click(function() { console.log( message.username ); } );
    $inputUsername.click(function() { console.log( message.username ); } );

    // document.addEventListener('click', )
    // console.log(document.getElementsByClassName('testt'));
    // document.getElementsByClassName('testt').addEventListener('click', function() { console.log('hello'); } );
    // $userchat[0].addEventListener('click', function() { console.log('hello'); } );
    //$userchat.append( '<div>' + message.text + '</div>');
    // console.log($userchat);

  },
  renderRoom: function(id) {
    $('#roomSelect').append('<div id = \"' + id + '\"></div>');
  },
  handleUsernameClick: function() {
    
  },
  handleSubmit: function () {

  },
  friendList: {}
};

app.init();
