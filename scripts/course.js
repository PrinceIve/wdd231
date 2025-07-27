const container = document.querySelector('#courses-container');
const creditsDisplay = document.querySelector('#credits-total');
const filterButtons = document.querySelectorAll('.filters button');
const courseDetails = document.getElementById("course-details");

function renderCourses(list) {
  container.innerHTML = '';
  list.forEach(course => {
    const card = document.createElement('div');
    card.className = `course-card ${course.completed ? 'completed' : ''}`;
    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <span>${course.credits} credits</span>
    `;
    card.addEventListener("click", () => displayCourseDetails(course));
    container.append(card);
  });

  const total = list.reduce((sum, c) => sum + c.credits, 0);
  creditsDisplay.textContent = `The total credits for courses listed above is ${total}`;
}

function displayCourseDetails(course) {
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Certificate:</strong> ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();

  document.getElementById("closeModal").addEventListener("click", () => {
    courseDetails.close();
  });
}

// Fetch JSON file
let courses = [];

fetch('data/courses.json')
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(data => {
    courses = data.courses;
    renderCourses(courses);

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        const filtered = filter === 'all' ? courses : courses.filter(c => c.subject === filter);
        renderCourses(filtered);
      });
    });
  })
  .catch(error => {
    console.error('Error loading courses:', error);
  });
