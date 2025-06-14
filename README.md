# remotecontrol-bot

This is a simple Telegram bot written on JavaScript for remote check (Temperatures\CPU\Disk usage\Memory etc.) and control (launch commands) Raspberry Pi. Is just a simple bot base easly expandable with several new commands.

Support commands and auto-notify. When the Node.js bot will go up (example. after reboot) the bot will notify you with a message.

## Setup

First of all install Node.js on your Linux (if not yet installed or upgraded by you):

1. Use the following terminal commands for install the latest Node.js version (more on nodesource `https://github.com/nodesource/distributions`)

```shell
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
```

2. Check if Node.js is correctly installed with `node -v`. It should appear the installed Node.js version (6.x)

Now is time to download\clone or whatever you want to get the source code of this bot. Enter the bot source code folder and start with the following steps!

1. Install dependencies with `npm install`
2. Create your personal Telegram bot following these instructions: `https://core.telegram.org/bots#botfather` (point 6. BotFather)
3. Replace `TOKEN_BOT` (token var) with the authorization token returned by @BotFather
4. Replace `RemoteControl` with the name of your bot (or what do you prefere, is not so important)
5. Start your bot with `node bot` (for the first setup we will just run the server one time, after we will use PM2)
6. Search and add your bot on your Telegram web\software\app and send him the command `/myid`
7. Now get the number returned by the bot and put it in `USER_ID`. This is your telegram unique id used by bot for send you messages and authenticate your commands.
**NOTE:** only you (authenticated by the unique id just entered) are able to send command and get notification from bot.
8. Now all is ready, you can turn of the bot and continue to the steps.

This is a brief tutorial on how let the bot start automatically on Raspberry Pi bootup:

1. Install PM2, a production process manager to keep your application alive forever. Use `sudo npm install -g pm2`
2. Start the bot with the command `pm2 start bot.js`
3. PM2 can generate and configure a startup script to keep PM2 and your processes alive at every server restart. `Use pm2 startup` for generate the script.
4. Be sure your bot is up with PM2 with `pm2 list`; you should see a row with bot.js (or something like) and status online.
5. Now use `pm2 save` for save the process list so PM2 will start the bot on restart or create systemd service <code>bot-remotecontrol.service</code>.


## Command list

Currently supported bot commands:

- When the Node.js bot will go up (example. after reboot) the bot will notify you with a message.
- `/temp` - Check the current temperature of your Pi.
- `/cpu` - Check the current CPU usage % of your Pi.
- `/disk` - df -h
- `/benchmark` - Run <code>rpi-benchmark.sh</code>.
- `/wakepc` - Send WOL Magic Packet to PC.
- `/devices` - Check the current Devices (iostat).
- `/uptime` - Display the time since the last boot.
- `/meminfo` - Displays the current memory.
- `/free` - Displays the total amount of free space.
- `/reboot` - Reboot your Pi.
- `/myid` - Usefull command for get your Telegram unique id for the first setup.
- `/mem` - Check the current Info (inxi).
- `/shutdown` - Shutdown your Pi.


## How to add your command

Just insert a new command at the end of the file in bot.js following this snippet:

```shell
bot.onText(/^\/mycommand$/, function (msg, match) {
	if(msg.chat.id == AUTHID){
    //insert here your command code
    send("Hello!", msg.chat.id);
	}
});
```

Use Javascript Regular expression (like `/^\/mycommand$/`) for parse your command and your parameters (if any). In the snippet example the regex will recognize the command `/mycommand`. Some usefull regex guide on `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions`.

Use `send(message, msg.chat.id)` inside your command code for send a message. In this case `msg.chat.id` is the id of who sent you the command.

You can use the send function outside the command snippet of code; example: `send("Hello!", AUTHID)`, `AUTHID` is the variable with your unique id. In this case the bot will send a message to you.

## Example: how to add a number (with 2 digit) parameter

```
bot.onText(/^\/mycommand (\d{2})$/, function (msg, match) {
	if(msg.chat.id == AUTHID){
    var myParam = match[1];
    //insert here your command code
    //use myParam for something
	}
});
```

In the `match` array you will find all your parameters (ignore match[0] is the textual part of the command).

## Packages used

This bot uses `node-telegram-bot-api`. You can find the documentation on `https://github.com/yagop/node-telegram-bot-api`.

---

<a href="https://www.paypal.com/donate/?hosted_button_id=GWWLEXEF3XL92">
  <img src="https://raw.githubusercontent.com/kraloveckey/kraloveckey/refs/heads/main/.assets/paypal-donate-button.png" alt="Donate with PayPal" width="225" height="100"/>
</a>
