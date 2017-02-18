// YOUR CODE HERE:
var app = {
  init: function() {
    return true;
  },
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
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  clearMessages: function() {
    $('#chats').children().remove();
  },
  renderMessage: function(message) {
    // var chat = document.createTextNode(message);
    // $('#chats').append(chat);

    // $('#chats').html(message.text);
    $('#chats').append('<div>' + message + '</div>');
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

