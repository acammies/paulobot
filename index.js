const TeleBot = require('telebot');
const TOKEN = process.env.TOKEN;
const bot = new TeleBot(TOKEN);

bot.on('/help', (msg) => {
    console.log(`/help triggered`)
    return bot.sendMessage(
        msg.chat.id, (`
Welcome to PauloBot \u{1F602}, here are some of the things I can do:
- I should already be configured to welcome any new user added to the group (along with a few others hahaha \u{1F602} )
- I also say goodbye \u{1F62D} to anyone who leaves the group
- Sending '/hello', '/start', or '/paulo' will send a default welcome message.
- There are a few other commands hidden too! (Aidan was using them for testing and is too lazy to remove them)
contribute at 'https://github.com/acammies/paulobot'
        `)
    );
});

bot.on(['/hello', '/start', '/paulo'], (msg) => {
    console.log(`/hello, /start, /paulo triggered`)
    return bot.sendMessage(msg.chat.id, `Welcome, ${ msg.from.first_name } \u{1F602} !`);
});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
  
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
  
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });

bot.on('/welcomeall', (msg) => {
    console.log(`/welcomeall triggered`)
    return [
        bot.sendMessage(msg.chat.id, `Welcome ${ msg.from.first_name } \u{1F602}`),
        bot.sendMessage(msg.chat.id, `Welcome Peter Fry \u{1F602}`),
        bot.sendMessage(msg.chat.id, `Welcome Stu \u{1F602}`),
        bot.sendMessage(msg.chat.id, `Welcome Will \u{1F602}`),
        bot.sendMessage(msg.chat.id, `Welcome grads \u{1F602}`),
        bot.sendMessage(msg.chat.id, `Special welcome to Chris Brown \u{1F602}`)
    ]
});

bot.on('/welcomeloop', (msg) => {
    console.log(`/welcomeloop triggered`)
    let messages = [
        `Welcome ${ msg.chat.first_name } `,
        `Welcome Peter Fry `,
        `Welcome Stu `,
        `Welcome Will `,
        `Welcome grads `,
        `Special welcome to Chris Brown `
    ]
    let messagesToSend = []

    for (welcome in messages) {
        const ranNum = Math.floor(Math.random() * 20) + 1
        let emojiBoi = ((ranNum < 6) ? "" : "\u{1F602}")
        emojiBoi += (ranNum < 12) ? '' : "\u{1F602}"
        emojiBoi += (ranNum < 18) ? '' : "\u{1F602}"
        bot.sendMessage(msg.chat.id, messages[welcome] + emojiBoi);
    }

    // return messagesToSend;
});

bot.on('/welcomenew', (msg) => {
    console.log(`/welcomenew triggered`)
    return bot.sendMessage(msg.chat.id, `Welcome, ${ msg.chat.first_name } \u{1F602} !`);
});

bot.on('/thanks', (msg) => {
    console.log(`/welcomenew triggered`)
    return bot.sendMessage(msg.chat.id, `You're welcome, ${ msg.from.first_name } \u{1F602} !`);
});


bot.on('/chatId', (msg) => {
    console.log(`/chatId triggered`)
    return bot.sendMessage(msg.chat.id, `The Chat Id of this group is ` + msg.chat.id + ' ');
});

bot.on('/goodluck', (msg) => {
    console.log(`/goodluck triggered`)
    return bot.sendMessage(msg.chat.id, `Good luck Tom Pooge \u{1F44D} \u{1F44D} \u{1F44D} \u{1F602} `);
});

bot.on('/sorry', (msg) => {
    console.log(`/sorry triggered`)
    return bot.sendMessage(msg.chat.id, `Sorry to hear about that Tom Pooge \u{1F62D} \u{1F62D} \u{1F62D} \u{1F62D} Paulo still loves you \u{2764} `);
});
bot.on('/rhcsa', (msg) => {
    console.log(`/rhcsa triggered`)
    return bot.sendMessage(
        msg.chat.id, (
            `Here are some useful RHCSA links:
RH124 Summary - https://role.rhu.redhat.com/rol-rhu/rhz/rhls/course/rh124-7/ch16s02
RH134 Summary - https://role.rhu.redhat.com/rol-rhu/rhz/rhls/course/rh134-7/ch15s02
Aidan's Trello Board of links: https://trello.com/b/erM6qmoN/rhcsa
            `
        )
    );
});

bot.on('leftChatMember', (msg) => {
    // console.log(msg)
    // console.log(msg.left_chat_member)
    console.log(`user left ${ msg.left_chat_member.first_name }`)
    return bot.sendMessage(msg.chat.id, `Goodbye ${ msg.left_chat_member.first_name } \u{1F62D} `);
});

bot.on('newChatMembers', (msg) => {
    console.log(`newChatMembers called`)
    // console.log('hello world chat members?')
    // console.log(msg.new_chat_members)
    // console.log(msg.new_chat_members[0])
    // console.log(msg.new_chat_members[0].first_name)
    // // console.log(new_chat_members)


    let messages = [
        `Welcome Peter Fry `,
        `Welcome Stu `,
        `Welcome Will `,
        `Welcome grads `,
        `Special welcome to Chris Brown `
    ]
    try {
        for (newMember in msg.new_chat_members) {
            // console.log('hello world chat members in loop')
            // console.log(msg.new_chat_members)
            // console.log('newMembers is ')
            // console.log(msg.new_chat_members[newMember])
            // console.log('first name is ')
            // console.log(msg.new_chat_members[newMember].first_name)
            messages.push(`Welcome ${ msg.new_chat_members[newMember].first_name }`)
        }

        // console.log(`whole messages block is: `)
        // console.log(messages)


        for (welcome in messages) {
            const ranNum = Math.floor(Math.random() * 20) + 1
            let emojiBoi = ((ranNum < 6) ? "" : "\u{1F602}")
            emojiBoi += (ranNum < 12) ? '' : "\u{1F602}"
            emojiBoi += (ranNum < 18) ? '' : "\u{1F602}"
            bot.sendMessage(msg.chat.id, messages[welcome] + emojiBoi);
        }
    } catch (error) {
        console.log(`error is ` + error)
        return bot.sendMessage(msg.chat.id, `You broke me because of Aidan's poor error handling, I don't feel so good Mr Stark. \u{1F602} !`)
        return bot.sendMessage(msg.chat.id, error)
    }
})


bot.on('error', (msg) => {
    console.log(`error generated`)
    return bot.sendMessage(msg.chat.id, `You broke me because of Aidan's poor error handling, I don't feel so good Mr Stark. \u{1F602} !`)
})

bot.start();