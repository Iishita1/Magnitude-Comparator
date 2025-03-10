let numbers = [];
let stepIndex = 0;
let isSorting = false;
let isPaused = false;
let interval;
let algorithm = 'bubble';
let currentIndex = 0; // For Selection Sort
let minIndex = 0; // For Selection Sort
let currentElement, insertIndex; // For Insertion Sort

const swapSound = document.getElementById('swapSound');
const compareSound = document.getElementById('compareSound');

document.getElementById('sortButton').addEventListener('click', () => {
  const input = document.getElementById('numberInput').value;
  numbers = input.split(',').map(Number);
  renderBars(numbers);
  stepIndex = 0;
  currentIndex = 0;
  minIndex = 0;
  isSorting = true;
  isPaused = false;
  document.getElementById('pauseButton').disabled = false;
});

document.getElementById('randomButton').addEventListener('click', () => {
  numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 50) + 1);
  document.getElementById('numberInput').value = numbers.join(',');
  renderBars(numbers);
  stepIndex = 0;
  currentIndex = 0;
  minIndex = 0;
  isSorting = true;
  isPaused = false;
  document.getElementById('pauseButton').disabled = false;
});

document.getElementById('resetButton').addEventListener('click', () => {
  numbers = [];
  stepIndex = 0;
  currentIndex = 0;
  minIndex = 0;
  isSorting = false;
  isPaused = false;
  clearInterval(interval);
  renderBars(numbers);
  document.getElementById('pauseButton').disabled = true;
});

document.getElementById('stepButton').addEventListener('click', () => {
  if (isSorting && !isPaused) {
    performSortStep();
  }
});

document.getElementById('autoButton').addEventListener('click', () => {
  if (isSorting && !isPaused) {
    const speed = parseInt(document.getElementById('speedSlider').value);
    interval = setInterval(() => {
      if (!isPaused) {
        const done = performSortStep();
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

document.getElementById('algorithmSelect').addEventListener('change', (e) => {
  algorithm = e.target.value;
  updateAlgorithmExplanation();
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
    bar.style.height = `${num * 5}px`;
    bar.textContent = num;
    if (algorithm === 'bubble' && (index === stepIndex || index === stepIndex + 1)) {
      bar.style.backgroundColor = '#ffcc00'; // Highlight compared bars for Bubble Sort
    } else if (algorithm === 'selection' && (index === currentIndex || index === minIndex)) {
      bar.style.backgroundColor = '#ffcc00'; // Highlight compared bars for Selection Sort
    } else if (algorithm === 'insertion' && index === insertIndex) {
      bar.style.backgroundColor = '#ffcc00'; // Highlight compared bars for Insertion Sort
    }
    visualization.appendChild(bar);
  });
}

function performSortStep() {
  compareSound.play();
  let done = false;
  switch (algorithm) {
    case 'bubble':
      done = bubbleSortStep();
      break;
    case 'selection':
      done = selectionSortStep();
      break;
    case 'insertion':
      done = insertionSortStep();
      break;
  }
  renderBars(numbers);
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

function selectionSortStep() {
  if (currentIndex >= numbers.length - 1) {
    isSorting = false;
    return true; // Sorting done
  }

  if (numbers[stepIndex] < numbers[minIndex]) {
    minIndex = stepIndex;
  }

  stepIndex++;
  if (stepIndex >= numbers.length) {
    if (minIndex !== currentIndex) {
      swapSound.play();
      [numbers[currentIndex], numbers[minIndex]] = [numbers[minIndex], numbers[currentIndex]];
    }
    currentIndex++;
    stepIndex = currentIndex + 1;
    minIndex = currentIndex;
  }

  return false; // Sorting not done
}

function insertionSortStep() {
  if (currentIndex >= numbers.length) {
    isSorting = false;
    return true; // Sorting done
  }

  if (currentIndex === 0) {
    currentElement = numbers[currentIndex];
    insertIndex = currentIndex;
    currentIndex++;
    return false;
  }

  if (insertIndex >= 0 && numbers[insertIndex] > currentElement) {
    swapSound.play();
    numbers[insertIndex + 1] = numbers[insertIndex];
    insertIndex--;
  } else {
    numbers[insertIndex + 1] = currentElement;
    currentElement = numbers[currentIndex];
    insertIndex = currentIndex - 1;
    currentIndex++;
  }

  return false; // Sorting not done
}

function updateAlgorithmExplanation() {
  const title = document.getElementById('algorithmTitle');
  const description = document.getElementById('algorithmDescription');
  switch (algorithm) {
    case 'bubble':
      title.textContent = 'How Bubble Sort Works';
      description.innerHTML = `
        <p><strong>What is Bubble Sort?</strong></p>
        <p>Bubble Sort is one of the simplest sorting algorithms. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted.</p>
        <p><strong>How Does It Work?</strong></p>
        <ol>
          <li>Start at the beginning of the list.</li>
          <li>Compare the first two elements. If the first is greater than the second, swap them.</li>
          <li>Move to the next pair of elements and repeat the comparison and swap if necessary.</li>
          <li>Continue this process until you reach the end of the list.</li>
          <li>Repeat the entire process until no swaps are needed, indicating the list is sorted.</li>
        </ol>
        <p><strong>Where is It Used?</strong></p>
        <p>Bubble Sort is rarely used in practice due to its inefficiency for large datasets. It is often used in educational settings to introduce the concept of sorting algorithms.</p>
      `;
      break;
    case 'selection':
      title.textContent = 'How Selection Sort Works';
      description.innerHTML = `
        <p><strong>What is Selection Sort?</strong></p>
        <p>Selection Sort is an in-place comparison sorting algorithm. It divides the list into a sorted and an unsorted part. It repeatedly selects the smallest (or largest) element from the unsorted part and swaps it with the first unsorted element.</p>
        <p><strong>How Does It Work?</strong></p>
        <ol>
          <li>Find the smallest element in the unsorted portion of the list.</li>
          <li>Swap it with the first unsorted element.</li>
          <li>Move the boundary between the sorted and unsorted portions one element to the right.</li>
          <li>Repeat the process until the entire list is sorted.</li>
        </ol>
        <p><strong>Where is It Used?</strong></p>
        <p>Selection Sort is used when memory space is limited because it performs sorting in place. It is also used in systems where the cost of swapping elements is low.</p>
      `;
      break;
    case 'insertion':
      title.textContent = 'How Insertion Sort Works';
      description.innerHTML = `
        <p><strong>What is Insertion Sort?</strong></p>
        <p>Insertion Sort is a simple sorting algorithm that builds the final sorted array one element at a time. It is much less efficient on large lists than more advanced algorithms like Quick Sort or Merge Sort.</p>
        <p><strong>How Does It Work?</strong></p>
        <ol>
          <li>Start with the second element in the list.</li>
          <li>Compare it with the elements before it and insert it into the correct position in the sorted portion.</li>
          <li>Repeat this process for each element in the list.</li>
          <li>Continue until the entire list is sorted.</li>
        </ol>
        <p><strong>Where is It Used?</strong></p>
        <p>Insertion Sort is used when the list is small or nearly sorted. It is also used in algorithms like Timsort, which is used in Python’s <code>sort()</code> and <code>sorted()</code> functions.</p>
      `;
      break;
  }
}