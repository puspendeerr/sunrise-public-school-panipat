const express = require('express');
const router = express.Router();

// Get academic programs
router.get('/programs', async (req, res) => {
  try {
    const programs = [
      {
        id: 1,
        name: 'Primary School (Classes 1-5)',
        description: 'Foundation years focusing on basic literacy, numeracy, and social skills',
        subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Art', 'Physical Education'],
        ageGroup: '6-10 years',
        duration: '5 years'
      },
      {
        id: 2,
        name: 'Middle School (Classes 6-8)',
        description: 'Intermediate years building on foundational knowledge',
        subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Hindi', 'Computer Science', 'Art', 'Physical Education'],
        ageGroup: '11-13 years',
        duration: '3 years'
      },
      {
        id: 3,
        name: 'High School (Classes 9-10)',
        description: 'Secondary education preparing for board examinations',
        subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Hindi', 'Computer Science', 'Physical Education'],
        ageGroup: '14-15 years',
        duration: '2 years'
      },
      {
        id: 4,
        name: 'Senior Secondary (Classes 11-12)',
        description: 'Higher secondary education with specialization streams',
        streams: ['Science', 'Commerce', 'Humanities'],
        ageGroup: '16-17 years',
        duration: '2 years'
      }
    ];
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching academic programs', error: error.message });
  }
});

// Get curriculum details
router.get('/curriculum', async (req, res) => {
  try {
    const curriculum = {
      board: 'CBSE',
      description: 'We follow the Central Board of Secondary Education (CBSE) curriculum',
      features: [
        'Holistic development approach',
        'Activity-based learning',
        'Regular assessments and evaluations',
        'Parent-teacher collaboration',
        'Digital learning integration'
      ]
    };
    res.json(curriculum);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching curriculum details', error: error.message });
  }
});

// Get faculty information
router.get('/faculty', async (req, res) => {
  try {
    const faculty = [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        position: 'Principal',
        qualification: 'Ph.D. in Education',
        experience: '15 years',
        department: 'Administration',
        image: '/images/faculty/sarah-johnson.jpg'
      },
      {
        id: 2,
        name: 'Mr. Rajesh Kumar',
        position: 'Head of Mathematics',
        qualification: 'M.Sc. Mathematics, B.Ed.',
        experience: '12 years',
        department: 'Mathematics',
        image: '/images/faculty/rajesh-kumar.jpg'
      },
      {
        id: 3,
        name: 'Ms. Priya Sharma',
        position: 'Head of Science',
        qualification: 'M.Sc. Physics, B.Ed.',
        experience: '10 years',
        department: 'Science',
        image: '/images/faculty/priya-sharma.jpg'
      }
    ];
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching faculty information', error: error.message });
  }
});

module.exports = router;
