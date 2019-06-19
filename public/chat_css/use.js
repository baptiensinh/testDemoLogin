var socket = io();
var notify = [];
var messages = [];
var ownId;
var receiverId;
var recieverName;
var reciverImage;
var activeDiv;

// var user = undefined;
function update(req) {
    localUser = req;
}

function finish () {
     var temp = {};
                update(temp);
                socket.emit('user name', user);

}
socket.on('connectedUsers', function(onlineUsers) {
        var i = 0;
        while (i < onlineUsers.length) {
            if (onlineUsers[i].profileId == socket.id) {
                ownId = onlineUsers[i].profileId;
                break;
            }
            i++;
        }
        onlineUsers.splice(i, 1);
        if (notify.length == 0) {
            notify = onlineUsers;
      } else {
        if (onlineUsers.length > notify.length) {
            var temp = 0;
            notify.push({
                profileName: onlineUsers[onlineUsers.length - 1].profileName,
                profileId: onlineUsers[onlineUsers.length - 1].profileId,
                profileImage: onlineUsers[onlineUsers.length - 1].profileImage,
                counter: temp
            })
        } else {
            var temp = [];
            for (var i = 0; i < onlineUsers.length; i++) {
                if (onlineUsers[i].profileId == notify[i].profileId) {
                    temp.push({
                        profileName: notify[i].profileName,
                        profileId: onlineUsers[i].profileId,
                        counter: notify[i].counter
                    })
                }
            }
            notify = temp;
        }
    }
    $('#namechat').html("");
    for (var i = 0; i < onlineUsers.length; i++) {
        $('#namechat').append(`<li data-id="${onlineUsers[i].profileId}" name="${onlineUsers[i].profileName}" onclick="SendUserChat(this);" class="active"><div class="d-flex bd-highlight"><div class="img_cont"><img src="images/dog.jpg" class="rounded-circle user_img"><span class="online_icon"></span></div><div class="user_info"><span>${onlineUsers[i].profileName} </span> is online </div></div></li>`);
    }
})
function SendUserChat(data) {
    console.log("Socket Id of current User: " + socket.id);

    receiverId = data.getAttribute("data-id");
    recieverName = data.getAttribute("name");
    reciverImage = data.getAttribute("profileImage");
    activeDiv = receiverId;
    var senderID = socket.id;
    console.log('reciver ID ' + receiverId);
    console.log('reciver Name ' + recieverName);
    $('#username2').html("");
    $('#username2').html(recieverName);

    showChats(receiverId);
    } 

$("#btnSend").click(function(){
    var messageText = $("#textchat").val();
    console.log("receiverId",receiverId);
    socket.emit('chatting', messageText, user, receiverId);
    $("#textchat").val("");
})   


socket.on('senderPeer', function(message, from, to) {
    messages=[];
    messages.push({
        message: message,
        from: from,
        to: to
    })
    showChats(receiverId);
   
   
});  

socket.on('reciverPeer', function(message, from, to) {
    messages=[];
    messages.push({
        message: message,
        from: from,
        to: to
    })
    if (activeDiv != from) {
        for (var i = 0; i < notify.length; i++) {
            if (notify[i].profileId == from) {
                notify[i].counter = notify[i].counter + 1;
                // $('.usersContainer .user .notification .' + from).show();
                // $('.usersContainer .user .notification .' + from).empty();
                // $('.usersContainer .user .notification .' + from).text(notify[i].counter);
                console.log(notify[i].counter);
            }
        }
    }
    showChats(receiverId);
    console.log("receiverId",receiverId);
    console.log("messages[i].from",messages.from);
    recieverId = from;
   
});

function showChats(data) {
    console.log("data",data);
    var newMessages = [];
    for (var i = 0; i < messages.length; i++) {
            if (messages[i].from == ownId && messages[i].to == data) {
                newMessages.push({
                    message: messages[i].message,
                    from: messages[i].from,
                    to: messages[i].to,
                    // show: 'senderContainer'
                })
                $('#msg').append(`<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send" >${messages[i].message}</div><div class="img_cont_msg"><img src="images/dog2.jpg" class="rounded-circle user_img_msg"></div></div>`);
            } else {
                if(messages[i].from == data && messages[i].to == ownId){
                console.log("reciverContainer: ",messages[i].message)
                newMessages.push({
                    message: messages[i].message,
                    from: messages[i].from,
                    to: messages[i].to,
                    // show: 'reciverContainer'
                })
                $('#msg').append(`<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="images/dog.jpg" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">${messages[i].message}</div></div>`);
            }
        }
    }
}