// data/projects.ts

export interface Project {
  id: number
  title: string
  date: string
  description: string
  technologies: string[]
  image: string
  githubUrl: string | null
  liveUrl: string | null
  fullDescription?: string
  features?: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'To-Do List CRUD API',
    date: 'August 2024',
    description: 'Developed a secure RESTful API using FastAPI with MongoDB for a to-do list application. Implemented full CRUD operations, user authentication with JWT tokens, and password hashing for enhanced security.',
    fullDescription: 'A comprehensive RESTful API built with FastAPI and MongoDB that provides secure to-do list management. The application features complete CRUD operations for tasks, robust user authentication using JWT tokens, and secure password hashing. The API follows RESTful principles and includes proper error handling, validation, and response formatting.',
    technologies: ['FastAPI', 'MongoDB', 'JWT', 'Python'],
    image: '/assets/images/project1.png',
    githubUrl: 'https://github.com/nabinphoenix/projects',
    liveUrl: null,
    features: [
      'User authentication with JWT tokens',
      'Password hashing with bcrypt',
      'Full CRUD operations for tasks',
      'MongoDB database integration',
      'RESTful API design',
      'Input validation and error handling'
    ]
  },
  {
    id: 2,
    title: 'Energy Consumption Forecasting',
    date: 'July 2025',
    description: 'Built a time series forecasting model using SARIMAX to predict energy consumption patterns. Implemented data preprocessing, model training, and evaluation with confidence intervals for predictions.',
    fullDescription: 'A sophisticated time series forecasting project that uses SARIMAX (Seasonal AutoRegressive Integrated Moving Average with eXogenous regressors) to predict energy consumption patterns. The model includes comprehensive data preprocessing, feature engineering, and provides confidence intervals for predictions. The project demonstrates advanced statistical modeling techniques and time series analysis.',
    technologies: ['SARIMAX', 'Time Series', 'Python', 'Statsmodels'],
    image: '/assets/images/project2.png',
    githubUrl: 'https://github.com/nabinphoenix/projects',
    liveUrl: null,
    features: [
      'SARIMAX model implementation',
      'Time series data preprocessing',
      'Seasonal pattern detection',
      'Confidence interval predictions',
      'Model evaluation metrics',
      'Data visualization and analysis'
    ]
  },
  {
    id: 3,
    title: 'CNN Cat vs Dog Classification',
    date: 'June 2025',
    description: 'Developed a convolutional neural network using PyTorch for binary classification of cat and dog images. Achieved high accuracy through data augmentation, transfer learning, and hyperparameter tuning.',
    fullDescription: 'A deep learning project that implements a Convolutional Neural Network (CNN) using PyTorch for binary image classification between cats and dogs. The project utilizes advanced techniques including data augmentation, transfer learning, and comprehensive hyperparameter tuning to achieve high classification accuracy. The model demonstrates proficiency in computer vision and deep learning.',
    technologies: ['PyTorch', 'CNN', 'Python', 'Computer Vision'],
    image: '/assets/images/project3.png',
    githubUrl: 'https://github.com/nabinphoenix/projects',
    liveUrl: null,
    features: [
      'CNN architecture design',
      'Data augmentation techniques',
      'Transfer learning implementation',
      'Hyperparameter optimization',
      'Model training and evaluation',
      'Image preprocessing pipeline'
    ]
  },
  {
    id: 4,
    title: 'Test Management System',
    date: 'August 2024',
    description: 'Created a command-line test management system for organizing and tracking assessments. Features include test creation, result tracking, and performance analytics with file system storage.',
    fullDescription: 'A command-line application for managing and tracking educational assessments. The system allows for test creation, student result tracking, and comprehensive performance analytics. Data is stored using file system operations, demonstrating proficiency in Python programming, data structures, and system design.',
    technologies: ['Python', 'CLI', 'File System', 'Data Structures'],
    image: '/assets/images/project4.png',
    githubUrl: 'https://github.com/nabinphoenix/projects',
    liveUrl: null,
    features: [
      'Test creation and management',
      'Student result tracking',
      'Performance analytics',
      'File system data storage',
      'Command-line interface',
      'Data persistence and retrieval'
    ]
  },
  {
    id: 5,
    title: 'Fish Detection System',
    date: 'January 2025',
    description: 'A real-time fish species detection application using YOLO (You Only Look Once) computer vision model. Detects and identifies 13 different fish species with bounding boxes, confidence scores, and detailed species information including diet, lifespan, and estimated weight.',
    fullDescription: 'A comprehensive computer vision application that uses Ultralytics YOLO model for real-time fish species detection. The system consists of a FastAPI backend that processes uploaded images and returns annotated results with bounding boxes, confidence scores, and detailed metadata. The React frontend provides an intuitive interface for uploading images and displaying detection results. The application can identify 13 different fish species including AngelFish, BlueTang, ClownFish, GoldFish, and more. Each detection includes species-specific information such as diet preferences, average lifespan, and estimated weight, making it useful for marine biologists, aquarium enthusiasts, and educational purposes.',
    technologies: ['FastAPI', 'React', 'YOLO', 'Computer Vision', 'Python', 'Ultralytics', 'PIL', 'Vite'],
    image: '/assets/images/project5.png',
    githubUrl: 'https://github.com/nabinphoenix/projects',
    liveUrl: null,
    features: [
      'Real-time fish species detection using YOLO',
      'Detection of 13 different fish species',
      'Annotated images with bounding boxes and labels',
      'Confidence scores for each detection',
      'Detailed species information (diet, lifespan, weight)',
      'RESTful API with FastAPI backend',
      'Modern React frontend with Vite',
      'Image upload and processing pipeline',
      'Base64 encoded annotated image responses',
      'CORS-enabled for frontend-backend communication'
    ]
  },
]

