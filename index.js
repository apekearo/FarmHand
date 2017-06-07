var accountSid= 'AC7aa3c87df5d67ff71d034fa21d97f564';
var authToken='1ee04980696810bea25d604b8d56f9f5'

var twilio = require('twilio');
 
// Find your account sid and auth token in your Twilio account Console.
var client = new twilio(accountSid, authToken);
 
// Send the text message.
client.messages.create({
    body: 'Hey Earl Wants To Get You Trucking Along Today',
    to: '+18176883665',
    from: '+12544002317'
})
.then ((message)=> Console.log(message.sid));