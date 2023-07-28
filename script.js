document.getElementById("button-random-dog").addEventListener('click', async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      const img = document.createElement('img');
      img.src = data['message'];
      document.getElementById('content').innerHTML = img.outerHTML;
    } catch (e) {
      console.log(e.message);
    }
});
  
  document.getElementById("button-show-breed").addEventListener('click', async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${document.getElementById('input-breed').value.toLowerCase()}/images/random`);
      if (response.status === 404) throw new Error("Breed not found!")
      const data = await response.json();
      const img = document.createElement('img');
      img.src = data['message'];
      document.getElementById('content').innerHTML = img.outerHTML;
    } catch (e) {
      const p = document.createElement('p');
      p.innerText = e.message;
      document.getElementById('content').innerHTML = p.outerHTML;
    }
});
  
  document.getElementById("button-show-sub-breed").addEventListener('click', async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${document.getElementById('input-breed').value.toLowerCase()}/list`);
      if (response.status === 404) throw new Error("Breed not found!");
  
      const data = await response.json();
      const list = data['message'];
      if (list.length === 0) throw new Error("No sub-breeds found!");
  
      const orderedList = document.createElement('ol');
      list.forEach(breed => {
        const listItem = document.createElement('li');
        listItem.innerText = breed;
        orderedList.appendChild(listItem);
      });
      document.getElementById('content').innerHTML = orderedList.outerHTML;
    } catch (e) {
      const p = document.createElement('p');
      p.innerText = e.message;
      document.getElementById('content').innerHTML = p.outerHTML;
    }
});
  
  document.getElementById("button-show-all").addEventListener('click', async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      const data = await response.json();
      const list = data['message'];
      const orderedList = document.createElement('ol');
  
      for (const breed in list) {
        const listItem = document.createElement('li');
        listItem.innerText = breed;
  
        if (list[breed].length > 0) {
          const unorderedList = document.createElement('ul');
          list[breed].forEach(subBreed => {
            const listItem = document.createElement('li');
            listItem.innerText = subBreed;
            unorderedList.appendChild(listItem);
          });
          listItem.appendChild(unorderedList)
        }
  
        orderedList.appendChild(listItem);
      }
      document.getElementById('content').innerHTML = orderedList.outerHTML;
    } catch (e) {
      const p = document.createElement('p');
      p.innerText = e.message;
      document.getElementById('content').innerHTML = p.outerHTML;
    }
});