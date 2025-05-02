const projects = [
    {
      title: "AI-Driven Sustainable Route Navigation",
      img: "images/route-navigation.png",
      description: "Developed an AI-driven app that optimizes travel routes for sustainability, integrating real-time traffic updates and eco-friendly travel modes like walking, cycling, and e-bus.",
      goals: "To promote greener travel habits by optimizing routes for lower carbon footprints.",
      problems: "Handling real-time data integration and providing multi-modal transport options.",
      solution: "Integrated public transport APIs and built a route scoring model to prioritize sustainability.",
      outcome: "Enhanced user choices and environmental awareness through sustainable navigation suggestions."
    },
    {
      title: "Stock Market Prediction (S&P 500)",
      img: "images/stock-market.png",
      description: "Machine learning-based forecasting of S&P 500 index movements using models like RandomForest and HistGradientBoostingClassifier.",
      goals: "To enhance prediction accuracy for upward market movements.",
      problems: "Low initial precision (47.58%) and class imbalance.",
      solution: "Used feature engineering and model comparison to boost prediction performance.",
      outcome: "Increased precision to 54.92% for identifying profitable market days."
    },
    {
      title: "Chagas Disease Research - Epitope Prediction",
      img: "images/chagas-epitope.png",
      description: "Predictive modeling for identifying linear B-cell epitopes in Chagas disease using Random Forest and Logistic Regression.",
      goals: "Aid vaccine research by identifying potential epitope sequences.",
      problems: "Limited available labeled data for training models.",
      solution: "Employed balanced training techniques and ensemble models.",
      outcome: "Created a functional predictive tool for biomedical research."
    },
    {
      title: "Fraud Detection in Banking",
      img: "images/fraud-detection.png",
      description: "Developed a fraud detection system using Random Forest to identify fraudulent transactions from a dataset of 600k records.",
      goals: "Detect banking fraud with high accuracy.",
      problems: "Highly imbalanced dataset.",
      solution: "Applied SMOTE and ensemble methods to improve minority class detection.",
      outcome: "Improved true positive rate and reduced false negatives in transaction monitoring."
    },
    {
      title: "Customer Segmentation with Clustering",
      img: "images/customer-segmentation.png",
      description: "Applied K-Means, Hierarchical Clustering, and Gaussian Mixture Model to group customers based on behavior in an e-commerce platform.",
      goals: "Enable targeted marketing and customer personalization.",
      problems: "Choosing the optimal number of clusters and interpreting results.",
      solution: "Used Elbow method and silhouette analysis for cluster validation.",
      outcome: "Segmented customer base into meaningful groups to guide business strategy."
    },
    {
      title: "Real Estate Factor Analysis",
      img: "images/real-estate.png",
      description: "Performed dimensionality reduction using Factor Analysis on real estate data to understand key variables influencing property prices.",
      goals: "Identify the core factors affecting real estate value.",
      problems: "High correlation among features.",
      solution: "Used Factor Analysis to reduce data complexity.",
      outcome: "Provided key drivers of value to support pricing models."
    },
    {
      title: "Pocketry: Blockchain-Based Property Registration",
      img: "images/pocketry-blockchain.png",
      description: "Led development of a property registration system using Ethereum smart contracts to improve transparency and security.",
      goals: "Modernize the real estate registration process.",
      problems: "Ensuring secure and tamper-proof records.",
      solution: "Designed Ethereum contracts and user-friendly interface.",
      outcome: "Delivered a secure decentralized solution for land registry."
    }
  ];
  
  window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("projects-container");
  
    projects.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("project-card");
  
      card.innerHTML = `
        <img src="${project.img}" alt="${project.title}">
        <h2>${project.title}</h2>
        <button class="toggle-details">View Details</button>
        <div class="project-details hidden">
          <p><strong>Description:</strong> ${project.description}</p>
          <p><strong>Goals Achieved:</strong> ${project.goals}</p>
          <p><strong>Problems Faced:</strong> ${project.problems}</p>
          <p><strong>Solution Found:</strong> ${project.solution}</p>
          <p><strong>Outcome:</strong> ${project.outcome}</p>
        </div>
      `;
  
      container.appendChild(card);
    });
  
    document.addEventListener("click", e => {
      if (e.target.classList.contains("toggle-details")) {
        const details = e.target.nextElementSibling;
        details.classList.toggle("hidden");
        e.target.textContent = details.classList.contains("hidden") ? "View Details" : "Hide Details";
      }
    });
  });
  