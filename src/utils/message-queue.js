const amqplib = require('amqplib');
const { EXCHANGE_NAME, MESSAGE_BROKER_URL } = require('../config/serverConfig');

const createChannel = async () =>{
    try{
        const connection = await amqplib.connect('MESSAGE_BROKER_URL');
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    }
    catch(err){
        console.log(err);
    }
}

const subscribeMessage = async (channel, service, bindingKey) => {
    try {
        const applicationQueue = await channel.assertQueue('QUEUE_NAME');
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, bindingKey);

        channel.consume(applicationQueue.queue, msg => {
            console.log('received message');
            console.log(msg.content.toString());
            channel.ack(msg);
        });
    } catch (err) {
        console.log(err);
    }
}

const publishMessage = async (channel, service, bindingKey, message) => {
    try {
        await channel.assertQueue(QUEUE_NAME);
        await channel.publish(EXCHANGE_NAME, bindingKey, Buffer.from(message));
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
  createChannel,
  subscribeMessage,
  publishMessage
};