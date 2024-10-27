const loadData = async () => {
  const link = "https://openapi.programming-hero.com/api/retro-forum/posts";
  const res = await fetch(link);
  const data = await res.json();
  console.log(data.posts);
  displayData(data.posts);
};

function displayData(posts) {
  console.log(posts);
  posts.forEach(post => {
    const div = document.createElement("div");
    div.classList = (`card card-compact bg-base-100 shadow-xl p-5 bg-[#F3F3F5] my-5`);
    div.innerHTML = `
            <div class="flex">
                <div class="avatar">
                  <div class="w-24 h-24 rounded">
                    <img
                      src="${post.image}"
                    />
                  </div>
                  <span
                    class="h-4 w-4 rounded-full absolute ${post.isActive? 'bg-[#10B981]' : 'bg-[#FF3434]'}  -right-2 -top-2"
                  ></span>
                </div>
                <div class="card-body">
                  <div class="flex text-xs">
                    <span class="mr-5"># ${post.category}</span>
                    <p>Author: <span>${post.author.name}</span></p>
                  </div>
                  <h2 class="card-title text-xl font-bold">
                    ${post.title}
                  </h2>
                  <p class="border-b border-dashed border-gray-400 pb-2">
                    ${post.description}
                  </p>
                  <div class="flex justify-between">
                    <div class="flex">
                      <p class="mr-10">
                        <i class="fa-regular fa-message mr-1"></i>
                        <span>${post.comment_count}</span>
                      </p>
                      <p class="mr-10">
                        <i class="fa-solid fa-eye mr-1"></i><span>${post.view_count}</span>
                      </p>
                      <p>
                        <i class="fa-regular fa-clock mr-1"></i
                        ><span>${post.posted_time}</span>
                      </p>
                    </div>
                    <div>
                      <button onclick="markRead(${post.id})"><i
                        class="fa-solid fa-envelope-open bg-[#10B981] text-white p-2 rounded-full"
                      ></i></button>
                    </div>
                  </div>
                </div>
            </div>
        `
        const blogContainer = getElementById("blog-container");
        blogContainer.classList.add('py-0')
        blogContainer.appendChild(div);
    });

}

const markRead = async(id)=>{
    console.log(id)
    const link = `https://openapi.programming-hero.com/api/retro-forum/post/${id}`;
  const res = await fetch(link);
  const data = await res.json();
  console.log(data);
  displayMarkedData(data);
}

function displayMarkedData(data){
    const markCount = getElementById('mark-count');
    markCount.innerText = Number(markCount.innerText) + 1;
    const markedContainer = getElementById('marked-container')
    const div = document.createElement('div');
    div.classList = `bg-white flex p-5 justify-between rounded-3xl`;
    div.innerHTML = `
            <p>${data.title}</p>
            <p class="flex items-center"><i class="fa-regular fa-eye"></i> <span>${data.view_count}</span></p>
    `;
    markedContainer.appendChild(div)
}

const latestPost = async() => {
    const link = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`;
    const res = await fetch(link);
    const data = await res.json();
    displayLatestPosts(data);
}

function displayLatestPosts(data){
    const latestPostContainer = getElementById('latest-posts');
    data.map(post => {
        console.log(post)
        const div = document.createElement('div');
        div.classList = `card bg-base-100 shadow-xl`;
        div.innerHTML = `
            <figure>
                <img class="p-5 rounded-[30px]"
                src="${post.cover_image}"
                alt=""/>
            </figure>
            <div class="card-body py-0 space-y-2 px-5">
                <div>
                <div class="flex">
                    <img src="images/suiticon.svg" alt="">
                    <p class="text-[#12132D99] ml-2">${post.author.posted_date?post.author.posted_date: "No Publish Date"}</p>
                </div>
                </div>
                <h2 class="card-title font-extrabold">What will a mars habitat force that impact in our daily life!!!</h2>
                <p>Yes, you can run unit tests and view the results directly within the app.</p>
                <div class="card-actions">
                <div class="avatar">
                    <div class="w-14 rounded-full">
                        <img src="${post.profile_image}" />
                    </div>
                    </div>
                    <div class="pb-10">
                    <h2 class="text-[#12132D] font-bold">${post.author.name}</h2>
                    <p class="text-xs">${post.author.designation? post.author.designation : "Unknown"}</p>
                    </div>
                </div>
            </div>  
        `
        latestPostContainer.appendChild(div)
    })
}

const search = async() => {
    const searchValue = getElementById('search-value');
    let input = searchValue.value;
    const blogContainer = getElementById("blog-container");
    blogContainer.innerHTML = '';
    
    const link = "https://openapi.programming-hero.com/api/retro-forum/posts";
    const res = await fetch(link);
    const data = await res.json();
    let searchArray = [];
    data.posts.map(post => {
        if(input.toLowerCase() === post.category.toLowerCase()){
            searchArray.push(post);
        }
    })
    blogContainer.innerHTML = '<div class="flex justify-center mx-auto py-5"><span class="loading mx-auto loading-spinner loading-lg"></span></div>';
    searchValue.value = '';
    setTimeout(function() {
        if(searchArray.length === 0){
    
            blogContainer.innerHTML = '';
            blogContainer.classList.add('pt-10');
            blogContainer.innerText = 'No Search Found!!!';
        } else {
            blogContainer.innerHTML = '';
            blogContainer.classList.add('pt-0');
            displayData(searchArray);
        }
    }, 2000);
}

loadData();
latestPost();