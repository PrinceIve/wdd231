const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course will introduce students to programming...",
    technology: ["Python"],
    completed: false
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course introduces students to the World Wide Web...",
    technology: ["HTML", "CSS"],
    completed: false
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "CSE 111 students become more organized...",
    technology: ["Python"],
    completed: false
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course will introduce the notion of classes...",
    technology: ["C#"],
    completed: false
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course builds on prior experience in Web Fundamentals...",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course builds on prior experience...",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false
  }
];

const container = document.querySelector('#courses-container');
const creditsDisplay = document.querySelector('#credits-total');
const filterButtons = document.querySelectorAll('.filters button');

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
    container.append(card);
  });
  const total = list.reduce((sum, c) => sum + c.credits, 0);
  creditsDisplay.textContent = `The total credits for courses listed above is ${total}`;
}

// Initial render
renderCourses(courses);

// Filter logic
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    let filtered;
    if (filter === 'all') {
      filtered = courses;
    } else {
      filtered = courses.filter(c => c.subject === filter);
    }
    renderCourses(filtered);
  });
});
