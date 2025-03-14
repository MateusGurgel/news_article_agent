import {EachMessagePayload, KafkaMessage} from "kafkajs";

interface NewsPublishMessage {
    source: string
    url: string
}

export function onNewsPublish(topic: string, partition: number, message: KafkaMessage) {
    console.log('message:', message.value)
    console.log('message_string', message.value?.toString())
    throw new Error('stop')
}