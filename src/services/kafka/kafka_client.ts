import { Kafka, KafkaConfig } from 'kafkajs';
import { KAFKA_BROKER, KAFKA_USERNAME, KAFKA_PASSWORD } from "../../utils/env";

const kafkaConfig: KafkaConfig = {
    brokers: [KAFKA_BROKER],
};

const kafka = new Kafka(kafkaConfig);

export default kafka;
