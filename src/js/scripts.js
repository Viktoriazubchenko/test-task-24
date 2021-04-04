// random slider pic

const choosePic = () =>{
    const slides = ['slider-1.png', 'slider-2.png', 'slider-3.png', 'slider-4.png', 'slider-5.png'];
    const randomSlide = slides[Math.floor(Math.random() * slides.length)];
    const sliderImg = document.createElement('img');
    sliderImg.src = `./img/${randomSlide}`;
    let slider = document.getElementById('slider');
    slider.appendChild(sliderImg)
}
window.onload = choosePic;

// Read more/ read less 

document.querySelectorAll('.btn-more').forEach(item => {
    item.addEventListener('click', event => {
        
        let parent = item.parentElement;
        
        let text = parent.childNodes[5];
        
        let dots = text.childNodes[1];
       
        let moreText = text.childNodes[2];
        
        if(moreText.style.display === 'inline'){
            item.innerHTML = 'Read more';
            moreText.style.display = 'none';
            dots.style.display = 'inline';
       } else {
            console.log('not-inline');
            moreText.style.display = 'inline';
            item.innerHTML = 'Read less';
            dots.style.display = 'none';
       } 
    })
})

// Pagination

const posts = Array.from(document.querySelectorAll('.post'));
const posts_wrapper = document.getElementById('postsItems');
const btns_wrapper = document.getElementById('pagination');

let current_page = 1;
const posts_per_page = 3;
const pages_count = Math.ceil(posts.length / posts_per_page);
const btns_per_page = 3;

const postsList = (page) => {
    posts_wrapper.innerHTML = '';
    let first_post = (page - 1) * posts_per_page;
    let last_post = first_post + posts_per_page;
    let posts_list = posts.slice(first_post, last_post);
    posts_list.map((post) => posts_wrapper.appendChild(post));
}

const pagination = (page) => {
    btns_wrapper.innerHTML = '';
    for (let i = 1; i < pages_count + 1; i++) {
		let btn = PageBtn(i);
		btns_wrapper.appendChild(btn);
	}
}

const PageBtn = (page) => {
    let button = document.createElement('button');
    button.classList.add('pagination-element');
    button.innerHTML = page;
    if(page === current_page){
        button.classList.add('current')
    }

    
    button.addEventListener('click', () => {
        current_page = page;
        postsList(page);
        document.querySelector('.current').classList.remove('current');
        button.classList.add('current')
        document.getElementById('currentPageNumber').innerHTML = `Page ${page} from 5`
    })

    document.getElementById('nextBtn').addEventListener('click', ()=>{
        postsList(pages_count);
        current_page = pages_count;
        document.querySelector('.current').classList.remove('current');
        button.classList.add('current') 
        document.getElementById('currentPageNumber').innerHTML = `Page ${page} from 5` 
    })
    return button
}



postsList(current_page);
pagination(current_page);

// search 

const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');


searchBtn.addEventListener('click', (e) => {
    
    e.preventDefault();


  
    let text = searchBar.value;

    if(!text){
        alert('Please enter some text to search!');
        return;
    }

    if(!window.find(text)){
        alert(`The following text was not found: ${text}`)
    }
    
    let search = new RegExp("(\\b" + text + "\\b)", "gim");
    
    let searchArea = document.getElementById('postsItems').innerHTML;
   
    let searchAreaNew = searchArea.replace(/(<mark>|<\/mark>)/igm, "");
    document.getElementById('postsItems').innerHTML = searchAreaNew;
    var result = searchAreaNew.replace(search, '<mark class="mark">$1</mark>');
    
    document.getElementById('postsItems').innerHTML = result;
})


 


