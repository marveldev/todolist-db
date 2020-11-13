const request = indexedDB.open('todoList', 2);

request.onsuccess = () => {
  const database = request.result;
  const transaction = database.transaction(['todoList'], 'readwrite')
  const store = transaction.objectStore('todoList');
  store.add({text: 'This is a sample Text', userPhoto: 'This is a sample image'})
}

request.onupgradeneeded = () => {
  const database = request.result;
  database.createObjectStore('todoList', { keyPath: 'itemId' });
}

request.onerror = () => {
  console.log('request unsuccessful');
}

const addEntryToDb = (entry) => {
  const database = request.result;
  const transaction = database.transaction(['todoList'], 'readwrite');
  const store = transaction.objectStore('todoList')
  store.add(entry);

  transaction.oncomplete = () => {
    alert('success')
  }

  transaction.onerror = () => {
    console.log(`error adding to todoList`)
  }
}

const getEntryFromDb = () => {
  const data = new Promise((resolve, reject) => {
    const database = request.result
    const transaction = database.transaction(['todoList']);
    const store = transaction.objectStore('todoList')
    const getData = store.getAll();

    getData.onsuccess = () => {
      resolve(getData.result)
    }

    getData.onerror = () => {
      console.log(`error adding to 'item'`)
      reject(getData.error);
    }
  })
  return Promise.resolve(data);
}

export { request, addEntryToDb, getEntryFromDb };