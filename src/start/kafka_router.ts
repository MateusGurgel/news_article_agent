import kafka from "../services/kafka/kafka_client";
import {onNewsPublish} from "../modules/news/events/on_news_publish.event";

const consumer = kafka.consumer({ groupId: 'test-task-' })

async function start_kafka_router() {
  try {
    await consumer.connect()
    await consumer.subscribe({ topic: 'news' })
    console.log('Connected to Kafka')
  } catch (error) {
    console.error('Error trying to connect to Kafka:', error)
  }

  try {
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        onNewsPublish(topic, partition, message)
      },
    });
  } catch (error) {
    console.error('Error while trying to consume a message:', error);
  }

}

export default start_kafka_router
