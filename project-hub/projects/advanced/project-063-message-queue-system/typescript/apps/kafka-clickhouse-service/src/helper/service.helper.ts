import {
    v4 as uuid
} from 'uuid';

import {
    Kafka
} from "kafkajs";

import {
    createClient
} from '@clickhouse/client'


const kafkaProducerClient = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['localhost:9092'],
});

const kafkaConsumerClient = new Kafka({
    clientId: 'kafka-consumer',
    brokers: ['localhost:9092']
})

const clickhouseClient = createClient({
    database: 'default',
    username: 'default',
    password: 'ashish1022',
    url: 'http://localhost:18123',
})

export const producer = kafkaProducerClient.producer();
export const consumer = kafkaConsumerClient.consumer({
    groupId: 'test-group'
});

export let messages: Array<{
    id: string;
    content: string;
    timestamp: string;
}> = [];

export async function initializeConsumer() {
    try {
        await consumer.connect();
        await consumer.subscribe({ topics: ['test-topic'] });
        await consumer.run({
            autoCommit: false,
            eachMessage: async function ({ message, heartbeat }) {
                const messageData = {
                    id: uuid(),
                    content: message.value?.toString() || '',
                    timestamp: new Date().toISOString()
                };
                messages.unshift(messageData);

                if (messages.length > 50) {
                    messages = messages.slice(0, 50);
                }

                const { query_id } = await clickhouseClient.insert({
                    table: 'message_event',
                    values: [{ id: uuid(), message: message.value?.toString(), timestamp: new Date().toISOString() }],
                    format: 'JSONEachRow'
                })

                await heartbeat();
            }
        });
    } catch (error) {
        console.error('Error initializing consumer:', error);
    }
};