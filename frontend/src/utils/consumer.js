import { createConsumer } from '@rails/actioncable';

// const consumer = createConsumer('ws://localhost:3000/cable');
const consumer = createConsumer();

export default consumer;