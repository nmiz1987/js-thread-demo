const { Worker } = require('worker_threads');
const { performance } = require('perf_hooks');

const jobs = Array.from({ length: 100 }, () => 1e9);

function chunkify(array, n) {
  const chunk = []; // Initialize an empty array to hold the chunks
  for (let i = n; i > 0; i--) {
    // Calculate the size of the chunk
    const chunkSize = Math.ceil(array.length / i);

    // Remove the calculated number of elements from the start of the array
    const chunkPart = array.splice(0, chunkSize);

    // Add the newly created chunk to the chunk array
    chunk.push(chunkPart);
  }
  return chunk; // Return the array of chunks
}

function run(job, concurrentWorkers) {
  const chunk = chunkify(job, concurrentWorkers);

  const tick = performance.now();

  let completedWorkers = 0;

  chunk.forEach((data, i) => {
    const worker = new Worker('./worker.js');
    worker.postMessage(data);
    worker.on('message', () => {
      completedWorkers++;
      worker.terminate().then(()=>console.log(`Worker ${i} finished`)); // Workers should be terminated after they complete their tasks to free up resources
      if (completedWorkers === concurrentWorkers) {
        console.log(`${completedWorkers} workers took ${performance.now() - tick} ms`);
        process.exit();
      }
    });
    worker.on('error', (err) => {
      console.error(`Worker ${i} encountered an error:`, err);
    });
  });
}

run(jobs, 4);