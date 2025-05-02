// Project data for your AI/ML portfolio
const projectsData = {
    project1: {
        title: "Image Classification with CNN",
        image: "images/project1-full.jpg",
        github: "https://github.com/yourusername/image-classification",
        liveDemo: "https://yourdemo.com/image-classification",
        description: "This project implements a convolutional neural network (CNN) architecture to classify images across multiple categories. The model was trained on a diverse dataset to recognize patterns and features in images, enabling accurate classification even with variations in lighting, orientation, and background.",
        goals: [
            "Achieve classification accuracy above 95% on test dataset",
            "Minimize model size while maintaining high accuracy",
            "Implement data augmentation to improve model generalization",
            "Create a user-friendly interface for image uploads and predictions"
        ],
        problems: [
            "Initial overfitting on training data",
            "Computational resource limitations for large model training",
            "Class imbalance in the training dataset",
            "Integration challenges with web frontend"
        ],
        solutions: [
            "Implemented dropout layers and batch normalization to reduce overfitting",
            "Utilized transfer learning with a pre-trained MobileNet architecture",
            "Applied weighted sampling techniques to address class imbalance",
            "Created a RESTful API with Flask to interface between the model and frontend"
        ],
        outcomes: [
            "Achieved 97.3% accuracy on the test dataset",
            "Reduced model size from 250MB to 45MB with minimal accuracy loss",
            "Successfully deployed the model as a web application with real-time predictions",
            "Model effectively generalizes to unseen images from different sources"
        ],
        technicalDetails: "The architecture consists of 5 convolutional layers, followed by max pooling, batch normalization, and dropout layers. The final layers include fully connected neural networks with ReLU activation. The model was implemented using TensorFlow and Keras, trained on an NVIDIA RTX 3080 GPU for 25 epochs."
    },
    project2: {
        title: "Natural Language Processing Chatbot",
        image: "images/project2-full.jpg",
        github: "https://github.com/yourusername/nlp-chatbot",
        liveDemo: "https://yourdemo.com/nlp-chatbot",
        description: "This project involved creating a conversational AI chatbot that understands and responds to natural language queries. The system uses transformer-based architecture to process input text and generate contextually relevant responses, making it suitable for customer service applications.",
        goals: [
            "Develop a chatbot capable of maintaining context in conversations",
            "Integrate with multiple platforms (web, messaging apps)",
            "Implement intent recognition to better understand user queries",
            "Create a system that learns from user interactions" ],
            technicalDetails: "The chatbot uses a fine-tuned DistilBERT model for intent classification and a GPT-2 based architecture for response generation. The backend is built with FastAPI, with Redis for conversation state management. A feedback mechanism captures user ratings to enable continuous improvement."
        },
        project3: {
            title: "Predictive Analytics Dashboard",
            image: "/api/placeholder/800/500",
            description: "An interactive web-based dashboard that visualizes the performance of various predictive models and allows users to explore data trends, make predictions, and evaluate model accuracy. The system integrates multiple ML algorithms to provide comprehensive analytics.",
            goals: [
                "Create an intuitive interface for non-technical users to interact with ML models",
                "Provide real-time visualization of model performance metrics",
                "Enable users to upload their own datasets for analysis",
                "Support comparative analysis between different predictive models"
            ],
            problems: [
                "Processing large datasets efficiently in a web environment",
                "Creating visualizations that effectively communicate complex model behaviors",
                "Ensuring responsive UI despite intensive computational tasks",
                "Handling diverse data formats from user uploads"
            ],
            solutions: [
                "Implemented data preprocessing pipeline with Dask for handling large datasets",
                "Designed interactive visualizations using Plotly and D3.js",
                "Used web workers for background processing to maintain UI responsiveness",
                "Created a robust data validation and transformation layer for user uploads"
            ],
            outcomes: [
                "Dashboard successfully deployed and used by the data science team",
                "Reduced time for model evaluation from days to hours",
                "Increased accessibility of ML insights for business stakeholders",
                "Supports comparative analysis across 7 different ML algorithms"
            ],
            technicalDetails: "The dashboard is built using React for the frontend, with Flask serving as the backend API. Scikit-learn provides the core ML functionality, while Plotly and D3.js handle the interactive visualizations. Data processing leverages Pandas and Dask for efficient handling of large datasets."
        },
        project4: {
            title: "Reinforcement Learning for Game AI",
            image: "/api/placeholder/800/500",
            description: "This project focuses on training AI agents to play strategic games using reinforcement learning algorithms. The agents learn optimal strategies through repeated gameplay, improving their performance over time without explicit programming.",
            goals: [
                "Develop AI agents that can master complex game environments",
                "Implement and compare different reinforcement learning algorithms",
                "Create a framework for training and evaluating game-playing agents",
                "Achieve superhuman performance in selected game environments"
            ],
            problems: [
                "High computational requirements for training",
                "Long training times before seeing meaningful results",
                "Balancing exploration vs. exploitation in the learning process",
                "Designing appropriate reward functions for complex game states"
            ],
            solutions: [
                "Utilized distributed computing to parallelize training across multiple machines",
                "Implemented curriculum learning to gradually increase task difficulty",
                "Applied epsilon-greedy strategy with annealing for exploration-exploitation balance",
                "Designed hierarchical reward functions that decompose complex goals"
            ],
            outcomes: [
                "Agents achieved superhuman performance in three different game environments",
                "Successfully implemented and compared DQN, A3C, and PPO algorithms",
                "Created a reusable framework for training agents in new environments",
                "Published research paper on novel reward shaping techniques"
            ],
            technicalDetails: "The project utilizes PyTorch for the deep learning components and OpenAI Gym for the environment interfaces. Training was distributed across a cluster of 8 GPUs using Ray. The agent architectures include convolutional layers for visual processing and recurrent layers (LSTM) for handling temporal dynamics in games."
        },
        project5: {
            title: "Time Series Forecasting",
            image: "/api/placeholder/800/500",
            description: "A comprehensive time series forecasting system that combines statistical methods with deep learning approaches to predict future values in sequential data. The system was applied to financial market data, weather predictions, and energy consumption forecasting.",
            goals: [
                "Develop models capable of accurate short and long-term forecasting",
                "Create a framework that automatically selects optimal forecasting methods",
                "Handle seasonality and trend components effectively",
                "Quantify uncertainty in forecasts with confidence intervals"
            ],
            problems: [
                "Dealing with irregular sampling intervals in raw data",
                "Capturing long-term dependencies in time series",
                "Handling multiple seasonality patterns simultaneously",
                "Incorporating external factors that influence the time series"
            ],
            solutions: [
                "Implemented interpolation and resampling techniques for data regularization",
                "Used LSTM networks with attention mechanisms for long-term dependencies",
                "Applied multi-seasonal decomposition combined with Fourier terms",
                "Created feature engineering pipeline for incorporating exogenous variables"
            ],
            outcomes: [
                "Reduced forecast error by 35% compared to baseline methods",
                "Successfully deployed models for energy demand forecasting with 98% accuracy",
                "Created an automated pipeline that selects the best model for each scenario",
                "Developed a reusable library with 12 different forecasting algorithms"
            ],
            technicalDetails: "The system incorporates classical methods (ARIMA, ETS, Prophet) alongside deep learning approaches (LSTM, TCN, Transformer). A meta-learner was implemented to automatically select and ensemble multiple models based on historical performance. The backend utilizes TensorFlow for deep learning models and statsmodels for statistical approaches."
        },
        project6: {
            title: "Recommendation System",
            image: "/api/placeholder/800/500",
            description: "A personalized recommendation system that suggests items to users based on their past behavior and preferences. The system combines collaborative filtering, content-based recommendations, and contextual information to provide highly relevant suggestions.",
            goals: [
                "Create a hybrid recommendation system combining multiple approaches",
                "Achieve high precision and recall in recommendation quality",
                "Address the cold start problem for new users and items",
                "Scale to handle millions of users and items efficiently"
            ],
            problems: [
                "Sparse user-item interaction data",
                "Cold start problem for new users without history",
                "Balancing between exploration and exploitation in recommendations",
                "Computational efficiency at scale"
            ],
            solutions: [
                "Implemented matrix factorization with implicit feedback",
                "Created content-based fallback recommendations for new items",
                "Used Thompson sampling to balance exploitation vs. exploration",
                "Applied approximate nearest neighbor search for efficient retrieval"
            ],
            outcomes: [
                "Increased user engagement by 27% after system deployment",
                "Successfully scaled to handle 10+ million users and 1+ million items",
                "Reduced cold start problem impact by 45% compared to baseline",
                "System processes recommendations in real-time with sub-100ms latency"
            ],
            technicalDetails: "The system uses a hybrid architecture combining matrix factorization (implemented with Alternating Least Squares) for collaborative filtering and a neural network for content-based recommendations. The backend is built with Python and Spark for distributed processing, with Redis for caching frequently accessed recommendations."
        }
    };