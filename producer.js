const amqp = require('amqplib');

const init = async () => {
  // Connect to RabbitMQ
  const connection = await amqp.connect('amqp://localhost');

  // Create a channel
  const channel = await connection.createChannel();

  // Create a queue
  const queue = 'dicoding';
  const message = 'Selamat belajar message broker!';

  /**
   * Publish a message (memastikan bahwa queue dengan nama dicoding sudah dibuat)
   * channel.assertQueue bersifat idempoten, yang berarti ia hanya akan membuat channel baru bila channel yang diperiksa tidak ada. Properti durable pada options berfungsi untuk menjaga agar queue tetap tersedia ketika server message broker restart.
   */
  await channel.assertQueue(queue, {
    durable: true,
  });

  /**
   * sendToQueue() mengirim pesan ke queue. Parameter pertama berupa nama queue dan parameter kedua berupa pesan yang ingin dikirim.
   * */
  await channel.sendToQueue(queue, Buffer.from(message));
  console.log('Pesan berhasil terkirim!');

  setTimeout(() => {
    connection.close();
  }, 1000);
};

init();
