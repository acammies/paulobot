const TeleBot = require('telebot');
const TOKEN = process.env.TOKEN;
const bot = new TeleBot(TOKEN);

bot.on(['/hello', '/start', '/paulo'], (msg) => {
    console.log(`/hello, /start, /paulo triggered`)
    return bot.sendMessage(msg.chat.id, `Welcome, ${ msg.from.first_name } \u{1F602} !`);
});

bot.on('/welcomeall', (msg) => {
    console.log(`/welcomeall triggered`)
    return [
        bot.sendMessage(msg.chat.id,  `Welcome ${ msg.chat.first_name } \u{1F602}`),
        bot.sendMessage(msg.chat.id,  `Welcome Peter Fry \u{1F602}`),
        bot.sendMessage(msg.chat.id,  `Welcome Stu \u{1F602}`),
        bot.sendMessage(msg.chat.id,  `Welcome Will \u{1F602}`),
        bot.sendMessage(msg.chat.id,  `Welcome grads \u{1F602}`),
        bot.sendMessage(msg.chat.id,  `Special welcome to Chris Brown \u{1F602}`)
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
        let emojiBoi = ((ranNum < 6) ? ""  : "\u{1F602}")
        emojiBoi += (ranNum < 12) ? '': "\u{1F602}"
        emojiBoi += (ranNum < 18) ? '': "\u{1F602}"
        bot.sendMessage(msg.chat.id, messages[welcome] + emojiBoi);
    }
    
    // return messagesToSend;
});

bot.on('/welcomenew', (msg) => {
    console.log(`/welcomenew triggered`)
    return bot.sendMessage(msg.chat.id, `Welcome, ${ msg.chat.first_name } \u{1F602} !`);
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
            let emojiBoi = ((ranNum < 6) ? ""  : "\u{1F602}")
            emojiBoi += (ranNum < 12) ? '': "\u{1F602}"
            emojiBoi += (ranNum < 18) ? '': "\u{1F602}"
            bot.sendMessage(msg.chat.id, messages[welcome] + emojiBoi);
        }
    }
    catch (error) {
        return bot.sendMessage(msg.chat.id, `You broke me because of Aidan's poor error handling, I don't feel so good Mr Stark. \u{1F602} !`)
    }
})


bot.on('error', (msg) => {
    console.log(`error generated`)
    return bot.sendMessage(msg.chat.id, `You broke me because of Aidan's poor error handling, I don't feel so good Mr Stark. \u{1F602} !`)
})
 
bot.start();