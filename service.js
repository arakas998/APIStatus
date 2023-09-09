const express = require('express');
const app = express();
app.use(express.json());

const houseACValues = {
  AC1: false,
  AC2: false,
  AC3: false,
  AC4: false,
  AC5: false,
  light1: false,
  light2: false,
  light3: false,
  light4: false,
  light5: false
};

function updatehouseACValues() {
  Object.keys(houseACValues).forEach((key) => {
    houseACValues[key] = Math.random() < 0.5;
  });
}

setInterval(updatehouseACValues, 3 * 60 * 1000);
updatehouseACValues();

app.get('/house/all/' , (req, res) => {
  console.log("call is made")
  return res.json(houseACValues)
})

app.get('/house/:id', (req, res) => {
  const { id } = req.params;

  if (houseACValues[id] !== undefined) {
    res.json({ id, value: houseACValues[id] });
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
});

app.put('/house/:id', (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
  
    if (houseACValues[id] !== undefined) {
      if (typeof value === 'boolean') {
        houseACValues[id] = value;
        console.log(`Updated ${id} to ${value}`);
        res.json({ id, value: houseACValues[id] });
      } else {
        console.log(`Invalid value for ${id}: ${value}`);
        res.status(400).json({ error: 'Invalid value, must be a boolean' });
      }
    } else {
      console.log(`ID not found: ${id}`);
      res.status(404).json({ error: 'Not Found' });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
