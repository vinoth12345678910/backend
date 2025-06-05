const express = require('express');
const app = express();
const fs = require('fs');

app.use((req,res,next)=>{
    console.log('Hello from the middleware!');
    next(); // Call the next middleware in the stack
}); // Middleware to parse JSON bodies

// Load tour data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

// GET ALL TOURS
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
});

// GET SPECIFIC TOUR
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; // Convert string to number
  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour
    }
  });
});

// POST METHOD
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    if (err) {
      console.log(err);
    }
    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour
      }
    });
  });
});

// PATCH METHOD
app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1; // Convert string to number
  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>'
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});