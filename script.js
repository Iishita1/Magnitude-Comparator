let numbers = [];
let stepIndex = 0;
let isSorting = false;
let isPaused = false;
let interval;

const swapSound = document.getElementById('swapSound');
const compareSound = document.getElementById('compareSound');

// Generate the full truth table
function generateTruthTable() {
  const truthTableBody = document.getElementById('truthTableBody');
  const examples = [
    [0, 0],
    [1, 0],
    [0, 1],
    [255, 255],
    [128, 127],
    [127, 128],
  ];

  examples.forEach(([a, b]) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${a}</td>
      <td>${b}</td>
      <td>${a.toString(2).padStart(8, '0')}</td>
      <td>${b.toString(2).padStart(8, '0')}</td>
      <td>${a > b ? 1 : 0}</td>
      <td>${a === b ? 1 : 0}</td>
      <td>${a < b ? 1 : 0}</td>
    `;
    truthTableBody.appendChild(row);
  });
}

// Initialize the truth table
generateTruthTable();

document.getElementById('sortButton').addEventListener('click', () => {
  const input = document.getElementById('numberInput').value;
  numbers = input.split(',').map(Number).filter(num => num >= 0 && num <= 255); // Limit to 8-bit numbers
  renderBars(numbers);
  renderBinaryPanel(numbers);
  stepIndex = 0;
  isSorting = true;
  isPaused = false;
  document.getElementById('pauseButton').disabled = false;
  updateNextComparison(); // Show the next comparison initially
});

document.getElementById('randomButton').addEventListener('click', () => {
  numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 256)); // Generate 8-bit numbers (0–255)
  document.getElementById('numberInput').value = numbers.join(',');
  renderBars(numbers);
  renderBinaryPanel(numbers);
  stepIndex = 0;
  isSorting = true;
  isPaused = false;
  document.getElementById('pauseButton').disabled = false;
  updateNextComparison(); // Show the next comparison initially
});

document.getElementById('resetButton').addEventListener('click', () => {
  numbers = [];
  stepIndex = 0;
  isSorting = false;
  isPaused = false;
  clearInterval(interval);
  renderBars(numbers);
  renderBinaryPanel(numbers);
  document.getElementById('pauseButton').disabled = true;
  document.getElementById('comparisonResult').textContent = ''; // Clear comparison panel
});

document.getElementById('stepButton').addEventListener('click', () => {
  if (isSorting && !isPaused) {
    const done = performSortStep();
    if (done) {
      isSorting = false;
    }
    updateNextComparison(); // Update the next comparison after each step
  }
});

document.getElementById('autoButton').addEventListener('click', () => {
  if (isSorting && !isPaused) {
    const speed = parseInt(document.getElementById('speedSlider').value);
    interval = setInterval(() => {
      if (!isPaused) {
        const done = performSortStep();
        updateNextComparison(); // Update the next comparison after each step
        if (done) {
          clearInterval(interval);
          isSorting = false;
        }
      }
    }, speed);
  }
});

document.getElementById('pauseButton').addEventListener('click', () => {
  isPaused = !isPaused;
  document.getElementById('pauseButton').textContent = isPaused ? 'Resume' : 'Pause';
});

document.getElementById('speedSlider').addEventListener('input', (e) => {
  document.getElementById('speedValue').textContent = `${e.target.value} ms`;
});

function renderBars(arr) {
  const visualization = document.getElementById('visualization');
  visualization.innerHTML = '';
  arr.forEach((num, index) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${num}px`;
    bar.textContent = num;
    if (index === stepIndex || index === stepIndex + 1) {
      bar.style.backgroundColor = '#ffcc00'; // Highlight compared bars
    }
    visualization.appendChild(bar);

    // Add comparison sign between bars
    if (index === stepIndex) {
      const comparisonSign = document.createElement('div');
      comparisonSign.className = 'comparison-sign';
      if (arr[index] > arr[index + 1]) {
        comparisonSign.textContent = '>';
      } else if (arr[index] < arr[index + 1]) {
        comparisonSign.textContent = '<';
      } else {
        comparisonSign.textContent = '=';
      }
      visualization.appendChild(comparisonSign);
    }
  });
}

function renderBinaryPanel(arr) {
  const binaryPanel = document.getElementById('binaryPanel');
  binaryPanel.innerHTML = '<h3>Binary Representation</h3>';
  arr.forEach((num) => {
    const binary = num.toString(2).padStart(8, '0');
    binaryPanel.innerHTML += `<p>${num} = ${binary}</p>`;
  });
}

function updateNextComparison() {
  const comparisonResult = document.getElementById('comparisonResult');
  if (stepIndex >= numbers.length - 1) {
    comparisonResult.textContent = 'Sorting Complete!';
    return;
  }

  const a = numbers[stepIndex];
  const b = numbers[stepIndex + 1];
  const aBinary = a.toString(2).padStart(8, '0');
  const bBinary = b.toString(2).padStart(8, '0');

  if (a > b) {
    comparisonResult.textContent = `${aBinary} (${a}) > ${bBinary} (${b})`;
  } else if (a < b) {
    comparisonResult.textContent = `${aBinary} (${a}) < ${bBinary} (${b})`;
  } else {
    comparisonResult.textContent = `${aBinary} (${a}) = ${bBinary} (${b})`;
  }
}

function performSortStep() {
  compareSound.play();
  const done = bubbleSortStep();
  renderBars(numbers);
  renderBinaryPanel(numbers);
  return done;
}

function bubbleSortStep() {
  if (stepIndex >= numbers.length - 1) {
    isSorting = false;
    return true; // Sorting done
  }

  if (numbers[stepIndex] > numbers[stepIndex + 1]) {
    swapSound.play();
    [numbers[stepIndex], numbers[stepIndex + 1]] = [numbers[stepIndex + 1], numbers[stepIndex]];
  }

  stepIndex++;
  if (stepIndex >= numbers.length - 1) {
    stepIndex = 0; // Reset for next pass
  }

  return false; // Sorting not done
}