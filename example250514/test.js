  const users = [];

  function addUser(){
    const name = document.getElementById('username').value;
    const status = document.getElementById('status').value;

    const userList = document.getElementById('userList');
    
    const newUser = {
      name,
      status
    };
    users.push(newUser);
    update();
    totalAdd();
    activeAdd();
    }
    
    function update(){
    users.forEach((user, index) => {
      userList.innerHTML="";
      const listItem = document.createElement('li');
      listItem.classList.add("list-group-item", "d-flex", "justify-content-between");
      listItem.innerHTML =  `
      <span>${user.name} - ${user.status}</span>
      <button class="btn btn-sm btn-outline-primary" onclick="sendMessage('${user.name}')">📩 메시지</button>
    `;
      userList.appendChild(listItem);
    });
      if(users.length === 0){
        userList.innerHTML= '<li class="list-group-item text-muted">사용자가 없습니다.</li>';
      }
    }

    function totalAdd(){
      totalUsers = document.getElementById('totalUsers');
      totalUsers.textContent = `${users.length}`;
    }

    function activeAdd(){
      activeUsers = document.getElementById('activeUsers');

      let user = 0;
      for(let a = 0; a<users.length; a++){
        if(users[a].status === '활성'){
          user++;
        }
      }
      activeUsers.textContent = `${user}명`;
    }