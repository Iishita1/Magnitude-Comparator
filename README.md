# Sorting Algorithm Visualizer

Welcome to the **Sorting Algorithm Visualizer**! This project is a web-based tool that helps you visualize how different sorting algorithms work. It’s designed to be interactive, educational, and visually appealing.

![Sorting Visualizer Screenshot](screenshot.png) <!-- Add a screenshot if you have one -->

## Features

- **Visualize Sorting Algorithms:**
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
- **Interactive Controls:**
  - Step-by-step sorting.
  - Auto-sort with adjustable speed.
  - Pause and resume functionality.
- **Random Number Generation:**
  - Generate random datasets for sorting.
- **Responsive Design:**
  - Works seamlessly on desktop and mobile devices.
- **Educational Explanations:**
  - Detailed step-by-step explanations of each algorithm.

## How to Use

1. **Enter Numbers:**
   - Enter a list of numbers (comma-separated) in the input field.
   - Example: `5, 3, 8, 1`

2. **Generate Random Numbers:**
   - Click the **Generate Random Numbers** button to create a random dataset.

3. **Select an Algorithm:**
   - Choose a sorting algorithm from the dropdown menu.

4. **Sort:**
   - Click **Sort** to start the sorting process.
   - Use **Step** to sort step-by-step or **Auto Sort** to sort automatically.
   - Pause the sorting process at any time using the **Pause** button.

5. **Reset:**
   - Click **Reset** to clear the dataset and start over.

## Algorithms Explained

### Bubble Sort
- **What is Bubble Sort?**
  Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted.

- **How Does It Work?**
  1. Start at the beginning of the list.
  2. Compare the first two elements. If the first is greater than the second, swap them.
  3. Move to the next pair of elements and repeat the comparison and swap if necessary.
  4. Continue this process until you reach the end of the list.
  5. Repeat the entire process until no swaps are needed, indicating the list is sorted.

- **Where is It Used?**
  Bubble Sort is rarely used in practice due to its inefficiency for large datasets. It is often used in educational settings to introduce the concept of sorting algorithms.

### Selection Sort
- **What is Selection Sort?**
  Selection Sort is an in-place comparison sorting algorithm. It divides the list into a sorted and an unsorted part. It repeatedly selects the smallest (or largest) element from the unsorted part and swaps it with the first unsorted element.

- **How Does It Work?**
  1. Find the smallest element in the unsorted portion of the list.
  2. Swap it with the first unsorted element.
  3. Move the boundary between the sorted and unsorted portions one element to the right.
  4. Repeat the process until the entire list is sorted.

- **Where is It Used?**
  Selection Sort is used when memory space is limited because it performs sorting in place. It is also used in systems where the cost of swapping elements is low.

### Insertion Sort
- **What is Insertion Sort?**
  Insertion Sort is a simple sorting algorithm that builds the final sorted array one element at a time. It is much less efficient on large lists than more advanced algorithms like Quick Sort or Merge Sort.

- **How Does It Work?**
  1. Start with the second element in the list.
  2. Compare it with the elements before it and insert it into the correct position in the sorted portion.
  3. Repeat this process for each element in the list.
  4. Continue until the entire list is sorted.

- **Where is It Used?**
  Insertion Sort is used when the list is small or nearly sorted. It is also used in algorithms like Timsort, which is used in Python’s `sort()` and `sorted()` functions.

## Deployment

This project is deployed using [GitHub Pages](https://pages.github.com/). You can access the live version of the project here:
[Live Demo](https://your-username.github.io/sorting-visualizer)

### How to Deploy Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sorting-visualizer.git
