import { Kafka, KafkaConfig } from 'kafkajs';

const kafkaConfig: KafkaConfig = { brokers: ['localhost:9092'] }
const kafka = new Kafka(kafkaConfig)

export default kafka
