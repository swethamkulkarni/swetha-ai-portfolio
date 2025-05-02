const projectsContainer = document.getElementById('projects-container');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalThumbnail = document.getElementById('modal-thumbnail');
const modalDescription = document.getElementById('modal-description');
const modalDetails = document.getElementById('modal-details');
const closeModal = document.querySelector('.close');

projects.forEach(project => {
  const card = document.createElement('div');
  card.className = 'project-card';

  card.innerHTML = `
    <img src="${project.thumbnail}" alt="${project.title} Thumbnail">
    <h3>${project.title}</h3>
    <p>${project.description}</p>
  `;

  card.addEventListener('click', () => {
    modalTitle.textContent = project.title;
    modalThumbnail.src = project.thumbnail;
    modalDescription.textContent = project.description;
    modalDetails.innerHTML = `
      <li><strong>Goals Achieved:</strong> ${project.goals}</li>
      <li><strong>Problems Faced:</strong> ${project.problems}</li>
      <li><strong>Solutions Found:</strong> ${project.solution}</li>
      <li><strong>Outcome:</strong> ${project.outcome}</li>
    `;
    modal.classList.remove('hidden');
  });

  projectsContainer.appendChild(card);
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});
