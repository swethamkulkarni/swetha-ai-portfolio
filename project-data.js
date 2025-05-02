const projects = [
  {
    title: "AI-Driven Sustainable Route Navigation",
    img: "images/route-navigation.png",
    description: "Developed an AI-driven app that optimizes travel routes for sustainability, integrating real-time traffic updates and eco-friendly travel modes like walking, cycling, and e-bus.",
    goals: "To promote greener travel habits by optimizing routes for lower carbon footprints.",
    problems: "Handling real-time data integration and providing multi-modal transport options.",
    solution: "Integrated public transport APIs and built a route scoring model to prioritize sustainability.",
    outcome: "Enhanced user choices and environmental awareness through sustainable navigation suggestions.",
    tags: ["Machine Learning", "Sustainable Tech", "Route Optimization"],
    metrics: {
      accuracy: 92,
      efficiency: 85,
      impact: 90
    }
  },
  {
    title: "Stock Market Prediction (S&P 500)",
    img: "images/stock-market.png",
    description: "Machine learning-based forecasting of S&P 500 index movements using models like RandomForest and HistGradientBoostingClassifier.",
    goals: "To enhance prediction accuracy for upward market movements.",
    problems: "Low initial precision (47.58%) and class imbalance.",
    solution: "Used feature engineering and model comparison to boost prediction performance.",
    outcome: "Increased precision to 54.92% for identifying profitable market days.",
    tags: ["Financial ML", "Time Series", "RandomForest"],
    metrics: {
      accuracy: 55,
      efficiency: 78,
      impact: 82
    }
  },
  {
    title: "Chagas Disease Research - Epitope Prediction",
    img: "images/chagas-epitope.png",
    description: "Predictive modeling for identifying linear B-cell epitopes in Chagas disease using Random Forest and Logistic Regression.",
    goals: "Aid vaccine research by identifying potential epitope sequences.",
    problems: "Limited available labeled data for training models.",
    solution: "Employed balanced training techniques and ensemble models.",
    outcome: "Created a functional predictive tool for biomedical research.",
    tags: ["Healthcare ML", "Bioinformatics", "Random Forest"],
    metrics: {
      accuracy: 87,
      efficiency: 72,
      impact: 95
    }
  },
  {
    title: "Fraud Detection in Banking",
    img: "images/fraud-detection.png",
    description: "Developed a fraud detection system using Random Forest to identify fraudulent transactions from a dataset of 600k records.",
    goals: "Detect banking fraud with high accuracy.",
    problems: "Highly imbalanced dataset.",
    solution: "Applied SMOTE and ensemble methods to improve minority class detection.",
    outcome: "Improved true positive rate and reduced false negatives in transaction monitoring.",
    tags: ["Anomaly Detection", "Banking", "SMOTE"],
    metrics: {
      accuracy: 96,
      efficiency: 88,
      impact: 94
    }
  },
  {
    title: "Customer Segmentation with Clustering",
    img: "images/customer-segmentation.png",
    description: "Applied K-Means, Hierarchical Clustering, and Gaussian Mixture Model to group customers based on behavior in an e-commerce platform.",
    goals: "Enable targeted marketing and customer personalization.",
    problems: "Choosing the optimal number of clusters and interpreting results.",
    solution: "Used Elbow method and silhouette analysis for cluster validation.",
    outcome: "Segmented customer base into meaningful groups to guide business strategy.",
    tags: ["Clustering", "Customer Analytics", "Unsupervised Learning"],
    metrics: {
      accuracy: 83,
      efficiency: 90,
      impact: 89
    }
  },
  {
    title: "Real Estate Factor Analysis",
    img: "images/real-estate.png",
    description: "Performed dimensionality reduction using Factor Analysis on real estate data to understand key variables influencing property prices.",
    goals: "Identify the core factors affecting real estate value.",
    problems: "High correlation among features.",
    solution: "Used Factor Analysis to reduce data complexity.",
    outcome: "Provided key drivers of value to support pricing models.",
    tags: ["Factor Analysis", "Real Estate", "Dimensionality Reduction"],
    metrics: {
      accuracy: 81,
      efficiency: 85,
      impact: 78
    }
  },
  {
    title: "Pocketry: Blockchain-Based Property Registration",
    img: "images/pocketry-blockchain.png",
    description: "Led development of a property registration system using Ethereum smart contracts to improve transparency and security.",
    goals: "Modernize the real estate registration process.",
    problems: "Ensuring secure and tamper-proof records.",
    solution: "Designed Ethereum contracts and user-friendly interface.",
    outcome: "Delivered a secure decentralized solution for land registry.",
    tags: ["Blockchain", "Smart Contracts", "Property Tech"],
    metrics: {
      accuracy: 99,
      efficiency: 80,
      impact: 92
    }
  }
];

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projects-container");
  
  if (!container) {
    console.error("Projects container not found!");
    return;
  }
  
  // Create a grid container for the projects
  const projectGrid = document.createElement("div");
  projectGrid.className = "project-grid";
  container.appendChild(projectGrid);

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    // Generate tags HTML
    const tagsHTML = project.tags.map(tag => 
      `<span class="project-tag">${tag}</span>`
    ).join('');
    
    // Generate metrics HTML if metrics exist
    let metricsHTML = '';
    if (project.metrics) {
      metricsHTML = `
        <div class="metrics-container hidden">
          <div class="metric-label">
            <span>Accuracy</span>
            <span>${project.metrics.accuracy}%</span>
          </div>
          <div class="metric-bar">
            <div class="metric-fill" style="width: ${project.metrics.accuracy}%"></div>
          </div>
          
          <div class="metric-label">
            <span>Efficiency</span>
            <span>${project.metrics.efficiency}%</span>
          </div>
          <div class="metric-bar">
            <div class="metric-fill" style="width: ${project.metrics.efficiency}%"></div>
          </div>
          
          <div class="metric-label">
            <span>Impact</span>
            <span>${project.metrics.impact}%</span>
          </div>
          <div class="metric-bar">
            <div class="metric-fill" style="width: ${project.metrics.impact}%"></div>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="project-image">
        <img src="${project.img}" alt="${project.title}">
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <div class="project-tags">
          ${tagsHTML}
        </div>
        <p class="project-summary">${project.description.substring(0, 100)}...</p>
        <div class="project-actions">
          <button class="toggle-details" data-action="details">View Details</button>
          <button class="toggle-details" data-action="metrics">View Metrics</button>
        </div>
        <div class="project-details hidden">
          <p><strong>Description:</strong> ${project.description}</p>
          <p><strong>Goals Achieved:</strong> ${project.goals}</p>
          <p><strong>Problems Faced:</strong> ${project.problems}</p>
          <p><strong>Solution Found:</strong> ${project.solution}</p>
          <p><strong>Outcome:</strong> ${project.outcome}</p>
        </div>
        ${metricsHTML}
      </div>
    `;

    projectGrid.appendChild(card);
    
    // Make the title and image clickable to toggle details
    const projectTitle = card.querySelector(".project-title");
    const projectImage = card.querySelector(".project-image");
    const projectDetails = card.querySelector(".project-details");
    
    projectTitle.addEventListener("click", () => {
      projectDetails.classList.toggle("hidden");
      if (card.querySelector(".metrics-container")) {
        card.querySelector(".metrics-container").classList.add("hidden");
      }
    });
    
    projectImage.addEventListener("click", () => {
      projectDetails.classList.toggle("hidden");
      if (card.querySelector(".metrics-container")) {
        card.querySelector(".metrics-container").classList.add("hidden");
      }
    });
  });

  // Event listeners for buttons
  document.addEventListener("click", e => {
    if (e.target.classList.contains("toggle-details")) {
      const card = e.target.closest(".project-card");
      const action = e.target.dataset.action;
      
      if (action === "details") {
        const details = card.querySelector(".project-details");
        const metricsContainer = card.querySelector(".metrics-container");
        
        details.classList.toggle("hidden");
        if (metricsContainer) metricsContainer.classList.add("hidden");
        
        e.target.textContent = details.classList.contains("hidden") ? "View Details" : "Hide Details";
        const metricsButton = card.querySelector('[data-action="metrics"]');
        if (metricsButton) metricsButton.textContent = "View Metrics";
      }
      else if (action === "metrics") {
        const metricsContainer = card.querySelector(".metrics-container");
        const details = card.querySelector(".project-details");
        
        metricsContainer.classList.toggle("hidden");
        if (details) details.classList.add("hidden");
        
        e.target.textContent = metricsContainer.classList.contains("hidden") ? "View Metrics" : "Hide Metrics";
        const detailsButton = card.querySelector('[data-action="details"]');
        if (detailsButton) detailsButton.textContent = "View Details";
      }
    }
  });
});