/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const STUDENTS_PER_PAGE = 9;



/*
Extra Credit
*/
function createSearchBar() {
  const studentsH2 = document.querySelector('header h2');
  let searchBarHTML =
  `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
   studentsH2.insertAdjacentHTML('afterend',searchBarHTML);
}

function addSearchFunctionality(searchInput, list) {
  let searchList = [];
  for(let i = 0; i < list.length; i++) {
    const fullName = list[i].name.first + " " + list[i].name.last;
    if(fullName.toLowerCase().includes(searchInput.toLowerCase()) && searchInput.length !== 0) {
      searchList.push(list[i]);
    }
  }
  if(searchInput.length == 0) {
    showPage(data, 1);
  }
  else {
    showPage(searchList, 1);
    addPagination(searchList);
  }

}


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
  //two variables to track the indices of the students being shown

  const startIndex = (page * STUDENTS_PER_PAGE) - STUDENTS_PER_PAGE;
  const endIndex = page * STUDENTS_PER_PAGE;

  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = "";

  const createElement = (tagName, className, content = "") => {
    const element = document.createElement(tagName);
    element.className = className;
    if(tagName === 'img') {
      element.src = content;
      element.alt = "Profile Picture";
    }
    else if(tagName === 'span' || tagName === 'h3') {
      element.textContent = content;
    }
    return element;
  };

  for(let i = startIndex; i < endIndex; i++) {
    if(list[i]) {
      const li = createElement('li', 'student-item cf');
      const studentInfoDiv = createElement('div', 'student-details');
      const img = createElement('img', 'avatar', list[i].picture.large);
      let studentName = list[i].name.first + " " + list[i].name.last;
      const h3 = createElement('h3', '', studentName);
      const emailSpan = createElement('span', 'email', list[i].email);
      studentInfoDiv.appendChild(img);
      studentInfoDiv.appendChild(h3);
      studentInfoDiv.appendChild(emailSpan);
      const joinedDiv = createElement('div', 'joined-details');
      const joinedSpan = createElement('span', 'date', "Joined " + list[i].registered.date);
      joinedDiv.appendChild(joinedSpan)
      li.appendChild(studentInfoDiv);
      li.appendChild(joinedDiv);
      studentList.appendChild(li);
    }
  }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
  const linkList = document.querySelector('.link-list');
  const numOfPages = Math.ceil(list.length / STUDENTS_PER_PAGE);
  linkList.innerHTML = "";
  for(let i = 1; i <= numOfPages; i++) {
    let buttonStr =
    `
    <li>
      <button type = "button">${i}</button>
    </li>
    `;
    linkList.insertAdjacentHTML('beforeend', buttonStr);
  }
  const actButton = linkList.querySelector('button:first-child');
  if(actButton) {
    actButton.className = 'active';
  }
  linkList.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
      const activeButton = linkList.querySelector('button.active');
      activeButton.className = '';
      e.target.className = 'active';
      showPage(list, e.target.textContent);
    }
  });
}



// Call functions
createSearchBar();
const search = document.querySelector('.student-search');
const searchSubmit = document.querySelector('label button');
showPage(data, 1);
addPagination(data);

searchSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  addSearchFunctionality(search.target.value, data);
});

search.addEventListener('keyup', (event) => {
  addSearchFunctionality(event.target.value, data);
});
