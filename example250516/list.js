const songList = [
  "너에게 닿기를",
  "like JENNIE",
  "Drowning",
  "모르시나요(PROD.로코베리)",
  "TOO BAD",
  "HOME SWEET HOME",
  "나는 반딧불",
  "Whiplash",
  "REBEL HEART",
  "HOT",
];

const songDetails = {
  "너에게 닿기를": { artist: "10CM", likes: 58471 },
  "like JENNIE": { artist: "제니", likes: 76168 },
  "Drowning": { artist: "WOODZ", likes: 189248 },
  "모르시나요(PROD.로코베리)": { artist: "조째즈", likes: 70040 },
  "TOO BAD": { artist: "G-DRAGON", likes: 146178 },
  "HOME SWEET HOME": { artist: "G-DRAGON", likes: 211539 },
  "나는 반딧불": { artist: "황가람", likes: 141198 },
  "Whiplash": { artist: "aespa", likes: 132606 },
  "REBEL HEART": { artist: "IVE (아이브)", likes: 98429 },
  "HOT": { artist: "LE SSERAFIM (르세라핌)", likes: 35001 },
};

const songLists = document.getElementById('songList');

// for(let a=0; a<songList.length; a++){
//   const listItem = document.createElement('li');
//   listItem.classList.add('list-group-item')
//   listItem.textContent = `${a+1} ${songList[a]}`;
//   songLists.appendChild(listItem)
// }

/*while
  i=0;
  while(i<songList.length){
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.textContent = `${i + 1}. ${songList[i]}`;
    console.log(listItem);
    songLists.appendChild(listItem); 
     i++;
  }
*/


let s=0;
for(let song of songList){
   const listItem = document.createElement('li');
  listItem.classList.add('list-group-item');
  listItem.textContent = `${s+1}. ${song}`;
  songLists.appendChild(listItem); 
  s++;
}


const songDetailsList = document.getElementById('songDetailsList');
draw();

let a=0;
for(let song in songDetails){
  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item')
  listItem.textContent = `${a+1}. ${song} ${songDetails[song].artist} ${songDetails[song].likes}`;
  a++;
  songDetailsList.appendChild(listItem)
}

function draw(){
  const popularList = document.getElementById('popularList');
  let a= 0;
  for(let song in songDetails){
    if(songDetails[song].likes >= 60000){
  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item')
  listItem.textContent = `${a+1}. ${song} ${songDetails[song].artist} ${songDetails[song].likes}`;
  a++;
  popularList.appendChild(listItem)
    }
}
}

function addSong(){
  const title = document.getElementById('song-title').value;
  const singer = document.getElementById('singer').value;
  const like = document.getElementById('song-likes').value;

  songDetails[title] = {
    singer: singer,
    like: like,
  };
}