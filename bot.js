/*
#  ██        ██  ████████████        ██      ██           ████████   ██        ██  ████████████   ██████████   ██        ██  ████████████  ██        ██  #
#  ██      ██    ██        ██      ██  ██    ██          ██      ██  ██        ██  ██            ██        ██  ██      ██    ██             ██      ██   #
#  ██    ██      ██        ██    ██      ██  ██          ██      ██   ██      ██   ██            ██            ██    ██      ██              ██    ██    #
#  ██  ██        ████████████    ██      ██  ██          ██      ██   ██      ██   ██            ██            ██  ██        ██               ██  ██     # 
#  ████          ████            ██      ██  ██          ██      ██    ██    ██    ████████████  ██            ████          ████████████       ██       #
#  ██  ██        ██  ██          ██████████  ██          ██      ██    ██    ██    ██            ██            ██  ██        ██                 ██       #
#  ██    ██      ██    ██        ██      ██  ██          ██      ██     ██  ██     ██            ██            ██    ██      ██                 ██       #
#  ██      ██    ██      ██      ██      ██  ██      ██  ██      ██     ██  ██     ██            ██        ██  ██      ██    ██                 ██       #
#  ██        ██  ██        ██    ██      ██  ██████████   ████████        ██       ████████████   ██████████   ██        ██  ████████████       ██       #
*/
//SETTINGS VAR
var token = 'TOKEN_BOT'; //INSERT HERE YOUR AUTHENTICATION TOKEN PROVIDED BY @BotFather
var AUTHID = 'USER_ID'; //INSERT HERE YOUR UNIQUE ID, YOU CAN FIND IT STARTING THE BOT AND SENDING THE COMMAND /myid
var botname = 'RemoteControl'; //INSERT YOUR YOUR BOT NAME (OR WHAT YOU PREFERE)


var TEMP_LIMIT = 60;
var tempLimitToggle = false;
var setIntervalTemp;

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

var sys = require('util'),
  exec = require('child_process').exec,
  child;


console.log('Bot @'+botname+' - server started...');
send("Bot @"+botname+" is now up!", AUTHID); //THE BOT WILL SEND THIS MESSAGE AT THE START

bot.onText(/^\/temp$/, function(msg, match){
	var reply = "";
	if(msg.chat.id == AUTHID){
		child = exec("vcgencmd measure_temp", function (error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
				reply = "Error: " + error;
				send(reply, msg.chat.id);
			} else {
				var temp = String(stdout);
				reply = "" + temp;
				console.log(msg.chat.id);
				send(reply, msg.chat.id);
			}
		});
	}
});

bot.onText(/^\/cpu$/, function(msg, match){
	var reply = "";
	if(msg.chat.id == AUTHID){
		child = exec("mpstat -P ALL", function (error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
				reply = "Error: " + error;
				send(reply, msg.chat.id);
			} else {
				var cpu = String(stdout);
				reply = "" + cpu;
				console.log(msg.chat.id);
				send(reply, msg.chat.id);
			}
		});
	}
});

bot.onText(/^\/mem$/, function(msg, match){
        var reply = "";
        if(msg.chat.id == AUTHID){
        	console.log("Show Info (inxi).");
                child = exec("inxi -F | grep Memory", function (error, stdout, stderr) {
                                if (error !== null) {
                                        console.log('exec error: ' + error);
                                        reply = "Error: " + error;
                                        send(reply, msg.chat.id);
                                } else {
                                        var mem = String(stdout);
                                        reply = "" + mem;
                                        console.log(msg.chat.id);
                                        send(reply, msg.chat.id);
                                }
                        });
        }
});

bot.onText(/^\/disk$/, function(msg, match){
	var reply = "";
	if(msg.chat.id == AUTHID){
		console.log("Show Info (df).");
                child = exec("sudo df -h / /boot", function (error, stdout, stderr) {
                                if (error !== null) {
                                        console.log('exec error: ' + error);
                                        reply = "Error: " + error;
                                        send(reply, msg.chat.id);
                                } else {
                                        var mem = String(stdout);
                                        reply = "" + mem;
                                        console.log(msg.chat.id);
                                        send(reply, msg.chat.id);
                                }
                        });
        }
});

bot.onText(/^\/devices$/, function(msg, match){
	var reply = "";
	if(msg.chat.id == AUTHID){
		console.log("Show Info (iostat - device).");
                child = exec("sudo iostat -kd | grep -A2 'Device'", function (error, stdout, stderr) {
                                if (error !== null) {
                                        console.log('exec error: ' + error);
                                        reply = "Error: " + error;
                                        send(reply, msg.chat.id);
                                } else {
                                        var mem = String(stdout);
                                        reply = "" + mem;
                                        console.log(msg.chat.id);
                                        send(reply, msg.chat.id);
                                }
                        });
        }
});

bot.onText(/^\/uptime$/, function(msg, match){
	var reply = "";
	if(msg.chat.id == AUTHID){
		console.log("Uptime");
                child = exec("sudo uptime", function (error, stdout, stderr) {
                                if (error !== null) {
                                        console.log('exec error: ' + error);
                                        reply = "Error: " + error;
                                        send(reply, msg.chat.id);
                                } else {
                                        var mem = String(stdout);
                                        reply = "" + mem;
                                        console.log(msg.chat.id);
                                        send(reply, msg.chat.id);
                                }
                        });
        }
});

bot.onText(/^\/meminfo$/, function(msg, match){
	var reply = "";
	if(msg.chat.id == AUTHID){
		console.log("Meminfo");
                child = exec("cat /proc/meminfo", function (error, stdout, stderr) {
                                if (error !== null) {
                                        console.log('exec error: ' + error);
                                        reply = "Error: " + error;
                                        send(reply, msg.chat.id);
                                } else {
                                        var mem = String(stdout);
                                        reply = "" + mem;
                                        console.log(msg.chat.id);
                                        send(reply, msg.chat.id);
                                }
                        });
        }
});

bot.onText(/^\/free$/, function(msg, match){
	var reply = "";
	if(msg.chat.id == AUTHID){
		console.log("free");
                child = exec("free -h", function (error, stdout, stderr) {
                                if (error !== null) {
                                        console.log('exec error: ' + error);
                                        reply = "Error: " + error;
                                        send(reply, msg.chat.id);
                                } else {
                                        var mem = String(stdout);
                                        reply = "" + mem;
                                        console.log(msg.chat.id);
                                        send(reply, msg.chat.id);
                                }
                        });
        }
});

bot.onText(/^\/reboot$/, function(msg, match){
	var reply = "";
	if(msg.chat.id == AUTHID){
		send("Rebooting Raspberry Pi!", msg.chat.id);
		console.log("Rebooting");

		setInterval(function(){child = exec("sudo shutdown -r now", function (error, stdout, stderr) {
				if (error !== null) {
					console.log('exec error: ' + error);
					reply = "Error: " + error;
					send(reply, msg.chat.id);
				}
			});
		},5000);
	}
});

bot.onText(/^\/shutdown$/, function(msg, match){
	var reply = "";
	if(msg.chat.id == AUTHID){
		send("Shutting down Raspberry Pi!", msg.chat.id);
		console.log("Shutting down");

		setInterval(function(){child = exec("sudo shutdown now", function (error, stdout, stderr) {
				if (error !== null) {
					console.log('exec error: ' + error);
					reply = "Error: " + error;
					send(reply, msg.chat.id);
				}
			});
		},5000);
	}
});

bot.onText(/^\/wakepc$/, function(msg, match){
        var reply = "";
        if(msg.chat.id == AUTHID){
                send("Send Wake-On-LAN Magic Packets to PC!", msg.chat.id);
                console.log("Send Wake-On-LAN Magic Packets to PC");
                child = exec("etherwake 00:00:00:00:FF:FF", function (error, stdout, stderr) {
                        if (error !== null) {
                                console.log('exec error: ' + error);
                                reply = "Error: " + error;
                                send(reply, msg.chat.id);
                        } else {
                                var temp = String(stdout);
                                reply = "" + temp;
                                console.log(msg.chat.id);
                                send(reply, msg.chat.id);
                        }
                });
        }
});

bot.onText(/^\/benchmark$/, function(msg, match){
        var reply = "";
        if(msg.chat.id == AUTHID){
                console.log("test");
                child = exec("sudo /bin/bash /opt/remotecontrol-bot/rpi-benchmark.sh", function (error, stdout, stderr) {
                                if (error !== null) {
                                        console.log('exec error: ' + error);
                                        reply = "Error: " + error;
                                        send(reply, msg.chat.id);
                                } else {
                                        var mem = String(stdout);
                                        reply = "" + mem;
                                        console.log(msg.chat.id);
                                        send(reply, msg.chat.id);
                                }
                        });
        }
});

bot.onText(/^\/myid$/, function(msg, match){
	send("Your unique ID is: "+msg.chat.id, msg.chat.id);
  send("Insert this in 'my-telegram-id' in your bot.js", msg.chat.id);
});

/* SEND FUNCTION */
function send(msg, id){
	console.log(id);
	bot.sendMessage(id, msg).then(function () {
			console.log(msg);
		});
}