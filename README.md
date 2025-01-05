# JS Threads

This project demonstrates how to use worker threads in Node.js to perform concurrent processing. The main script splits
a large array of jobs into smaller chunks and assigns each chunk to a worker thread for processing.

## Project Structure

- `index.js`: The main script that initializes the jobs, splits them into chunks, and assigns them to worker threads.
- `worker.js`: The worker script that processes the jobs assigned to it.

## Files

### `index.js`
This file contains the main logic for the project. It includes:

- **`chunkify` function**: Splits an array into smaller chunks.
- **`run` function**: Distributes the chunks to worker threads and measures the time taken for processing.

### `worker.js`

This file contains the logic for the worker threads. Each worker processes the jobs assigned to it and sends a message
back to the main thread upon completion.

## How to Run

No need to install any dependencies. Just run the main script using Node.js.

Run the main script:
 ```sh
   node .
```
