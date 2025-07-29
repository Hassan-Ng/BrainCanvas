// Mock project data
export const mockProjects = [
  {
    id: 1,
    name: 'Marketing Campaign Design',
    description: 'Visual designs for Q1 marketing campaign',
    location: 'Team Workspace',
    created: '2 weeks ago',
    edited: '3 hours ago',
    comments: 12,
    author: 'Sarah Chen',
    authorId: 1,
    isPublic: false,
    isFavorite: false,
    thumbnail: null,
    collaborators: [
      { id: 1, name: 'Sarah Chen', email: 'sarah@company.com', active: true },
      { id: 2, name: 'Mike Johnson', email: 'mike@company.com', active: false }
    ],
    canvasData: {
      shapes: [
        {
          id: 'rect-1',
          type: 'rectangle',
          x: 100,
          y: 100,
          width: 200,
          height: 150,
          fill: '#3b82f6',
          stroke: '#1d4ed8',
          strokeWidth: 2
        },
        {
          id: 'text-1',
          type: 'text',
          x: 150,
          y: 160,
          text: 'Marketing Campaign',
          fontSize: 24,
          fill: '#ffffff',
          stroke: 'transparent',
          strokeWidth: 0
        }
      ]
    }
  },
  {
    id: 2,
    name: 'Product Roadmap 2024',
    description: 'Strategic planning and feature roadmap',
    location: 'Product Team',
    created: '1 month ago',
    edited: '1 day ago',
    comments: 8,
    author: 'Mike Johnson',
    authorId: 2,
    isPublic: true,
    isFavorite: true,
    thumbnail: null,
    collaborators: [
      { id: 2, name: 'Mike Johnson', email: 'mike@company.com', active: true },
      { id: 3, name: 'Alex Rivera', email: 'alex@company.com', active: true }
    ],
    canvasData: {
      shapes: [
        {
          id: 'arrow-1',
          type: 'arrow',
          x: 50,
          y: 50,
          points: [0, 0, 150, 0, 150, 100],
          fill: 'transparent',
          stroke: '#10b981',
          strokeWidth: 3
        },
        {
          id: 'ellipse-1',
          type: 'ellipse',
          x: 250,
          y: 200,
          radiusX: 80,
          radiusY: 60,
          fill: '#f59e0b',
          stroke: '#d97706',
          strokeWidth: 2
        }
      ]
    }
  },
  {
    id: 3,
    name: 'User Flow Diagrams',
    description: 'Complete user journey mapping',
    location: 'Design System',
    created: '3 weeks ago',
    edited: '5 days ago',
    comments: 15,
    author: 'Alex Rivera',
    authorId: 3,
    isPublic: false,
    isFavorite: false,
    thumbnail: null,
    collaborators: [
      { id: 3, name: 'Alex Rivera', email: 'alex@company.com', active: false },
      { id: 4, name: 'Emma Davis', email: 'emma@company.com', active: true }
    ],
    canvasData: {
      shapes: [
        {
          id: 'line-1',
          type: 'line',
          x: 100,
          y: 300,
          points: [0, 0, 200, -100],
          fill: 'transparent',
          stroke: '#ef4444',
          strokeWidth: 2
        },
        {
          id: 'freedraw-1',
          type: 'freedraw',
          x: 300,
          y: 150,
          points: [0, 0, 20, 10, 40, -5, 60, 15, 80, 0],
          fill: 'transparent',
          stroke: '#8b5cf6',
          strokeWidth: 3
        }
      ]
    }
  },
  {
    id: 4,
    name: 'Brand Guidelines 2024',
    description: 'Complete brand identity and style guide',
    location: 'Design Team',
    created: '1 week ago',
    edited: '2 hours ago',
    comments: 6,
    author: 'Emma Davis',
    authorId: 4,
    isPublic: true,
    isFavorite: false,
    thumbnail: null,
    collaborators: [
      { id: 4, name: 'Emma Davis', email: 'emma@company.com', active: true },
      { id: 5, name: 'James Wilson', email: 'james@company.com', active: true }
    ],
    canvasData: {
      shapes: []
    }
  },
  {
    id: 5,
    name: 'API Documentation',
    description: 'Technical documentation and flow charts',
    location: 'Engineering',
    created: '4 days ago',
    edited: '1 hour ago',
    comments: 3,
    author: 'James Wilson',
    authorId: 5,
    isPublic: true,
    isFavorite: false,
    thumbnail: null,
    collaborators: [
      { id: 5, name: 'James Wilson', email: 'james@company.com', active: false },
      { id: 1, name: 'Sarah Chen', email: 'sarah@company.com', active: true }
    ],
    canvasData: {
      shapes: []
    }
  }
]