import kafka from "../services/kafka/kafka_client";

const consumer = kafka.consumer({ groupId: 'test-task-' })

async function start() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'news' })



  await consumer.run({})
}
