var firebase = new Firebase('https://incandescent-fire-2010.firebaseio.com/');
var messagesRef = firebase.child('chat');

messagesRef.push({ name: "test", text: "testing text" });

function getMessageId(snapshot) {
  return snapshot.name().replace(/[^a-z0-9\-\_]/gi,'');
}

$('document').ready(function(e){
  $('#messageInput').keypress(function (e) {
      if (e.keyCode == 13) {
        var name = $('#nameInput').val();
        var text = $('#messageInput').val();
        messagesRef.push({ name:name, text:text });
        $('#messageInput').val('');
      }
  });
});
    messagesRef.limit(10).on('child_added', function(snapshot) {
      var message = snapshot.val();
      $('<div/>')
        .attr('id', getMessageId(snapshot))
        .text(message.text).prepend($('<em/>')
        .text(message.name+': ')).appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    });

    messagesRef.on('child_changed', function(snapshot) {
      var message = snapshot.val();
      var $messageEl = $('#messagesDiv').children('#' + getMessageId(snapshot));
      if ($messageEl) {
        $messageEl
          .text(message.text).prepend($('<em/>')
          .text(message.name+': '));
      }
    });

    messagesRef.on('child_removed', function(snapshot) {
      var $messageEl = $('#messagesDiv').children('#' + getMessageId(snapshot));
      if ($messageEl) {
        $messageEl.remove();
      }
    });