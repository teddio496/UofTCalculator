// Function to add a new row for an assessment
function addAssessmentRow(course) {
    const tbody = document.querySelector(`#course-${course} tbody`);
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" name="name_new" value="" placeholder="New Assessment" oninput="calculateGrade(event, '${course}')"></td>
        <td><input type="number" name="weight_new" value="" min="0" max="100" required oninput="calculateGrade(event, '${course}')"></td>
        <td>
            <input type="number" name="marks_new" value="" min="0" max="999" required oninput="calculateGrade(event, '${course}')">/
            <input type="number" name="outof_new" value="" min="1" max="999" required oninput="calculateGrade(event, '${course}')">
        </td>
    `;
    tbody.appendChild(newRow);
}

// Function to remove the last row of the table if more than one row exists
function removeLastRow(course) {
    const tbody = document.querySelector(`#course-${course} tbody`);
    const lastRow = tbody.lastElementChild; // Gets the last row in the table body

    if (lastRow && tbody.children.length > 1) { // Check if there is a last row and it's not the only row
        let canRemove = true; // Flag to determine if the row can be removed

        // Iterate over all input elements in the last row
        const inputs = lastRow.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.type === 'number' || input.type === 'text') {
                if (input.value.trim() !== '') { // Check if any input is not empty
                    canRemove = false;
                }
            }
        });

        if (canRemove) {
            tbody.removeChild(lastRow); // Remove the row if all inputs are empty
        } else {
            alert("Cannot remove the row as it contains data.");
        }
    } else if (!lastRow) {
        alert("No row to remove!");
    }
}


// Function to calculate grade in real-time
function calculateGrade(event, course) {
    const table = document.querySelector(`#course-${course} tbody`);
    let total = 0;
    let totalWeight = 0;

    table.querySelectorAll('tr').forEach(row => {
        const weight = parseFloat(row.querySelector('input[name^="weight_"]').value) || 0;
        const marks = parseFloat(row.querySelector('input[name^="marks_"]').value) || 0;
        const outof = parseFloat(row.querySelector('input[name^="outof_"]').value) || 1;
        total += (marks / outof) * weight;
        totalWeight += weight;
    });

    const finalGrade = totalWeight === 100 ? total : (total * 100 / totalWeight);
    document.getElementById(`final-grade-${course}`).textContent = finalGrade.toFixed(2);
}
// Function to display the form for creating a new course
function showNewCourseForm() {
    document.getElementById('new-course-form').style.display = 'block';
}

// Function to create a new course dynamically
function createNewCourse() {
    const courseCodeInput = document.getElementById('new-course-code');
    const courseCode = courseCodeInput.value.trim();

    if (!courseCode) {
        alert("Please enter a course code to create a new course.");
        return;
    }

    if (document.getElementById(`course-${courseCode}`)) {
        alert("This course already exists.");
        return;
    }

    // Create a new course entry in the sidebar
    const courseList = document.getElementById('course-list');
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" onclick="showCourse('${courseCode}')">${courseCode}</a>`;
    courseList.appendChild(li);

    // Create a new course container in the main content
    const mainContent = document.getElementById('main-content');
    const newCourseDiv = document.createElement('div');
    newCourseDiv.id = `course-${courseCode}`;
    newCourseDiv.className = 'course-container';
    newCourseDiv.style.display = 'none'; // Initially hide it, will show it right away after creation
    newCourseDiv.innerHTML = `
        <h1>${courseCode}</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>Assessment</th>
                    <th>Weight</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                ${Array(4).fill(`<tr>
                    <td><input type="text" placeholder="Assessment Name"></td>
                    <td><input type="number" placeholder="Weight" min="0" max="100"></td>
                    <td><input type="number" placeholder="Marks" min="0"> / <input type="number" placeholder="Out of" min="1"></td>
                </tr>`).join('')}
            </tbody>
        </table>
    `;
    mainContent.appendChild(newCourseDiv);

    // Clear the input for the next use
    courseCodeInput.value = '';

    // Hide the new course form and show the newly added course
    document.getElementById('new-course-form').style.display = 'none';
    showCourse(courseCode); // Make the new course visible
}

// Function to show a specific course's details
function showCourse(courseId) {
    // Hide all courses
    document.querySelectorAll('.course-container').forEach(container => {
        container.style.display = 'none';
    });

    // Show the selected course
    const selectedCourse = document.getElementById(`course-${courseId}`);
    if (selectedCourse) {
        selectedCourse.style.display = 'block';
    }
}
