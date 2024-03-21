// script.js

let employeesData; // Variable to store the original employee data

// Load and display employee data
document.addEventListener('DOMContentLoaded', function() {
    fetch('EmployeeData.json')
        .then(response => response.json())
        .then(data => {
            employeesData = data.Employee_Data;
            displayEmployeeData(employeesData);
            populateFilters(data.Fields);
        })
        .catch(error => console.error('Error loading employee data:', error));
});
// Display employee data in table
let currentSortColumn = '';
let currentSortOrder = '';

// Display employee data in table  
// <td>${employee.employee_id}</td>
//   <td>${employee.phone}</td>
function displayEmployeeData(employees) {
    const tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';
    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
           
            <td onclick="showModal('${employee.employee_id}')">${employee.first_name}</td>
            <td onclick="showModal('${employee.employee_id}')">${employee.last_name}</td>
            <td>${employee.department}</td>
            <td>${employee.position}</td>
            <td>${employee.city}</td>
            <td>${employee.state}</td>
            <td>${employee.date_of_birth}</td>
            <td>${employee.gender}</td>
            <td>${employee.salary}</td>
            <td>${employee.hire_date}</td>
            <td>${employee.email}</td>
          
        `;
        tableBody.appendChild(row);
    });
}

// Populate filter options
function populateFilters(fields) {
    const departmentFilter = document.getElementById('departmentFilter');
    const positionFilter = document.getElementById('positionFilter');
    const cityFilter = document.getElementById('cityFilter');
    const stateFilter = document.getElementById('stateFilter');

    fields[0].departments.forEach(department => {
        departmentFilter.innerHTML += `<option value="${department}">${department}</option>`;
    });

    fields[0].positions.forEach(position => {
        positionFilter.innerHTML += `<option value="${position}">${position}</option>`;
    });

    fields[0].cities.forEach(city => {
        cityFilter.innerHTML += `<option value="${city}">${city}</option>`;
    });

    fields[0].states.forEach(state => {
        stateFilter.innerHTML += `<option value="${state}">${state}</option>`;
    });
}

// Sort employees by column
function sortEmployees(column) {
    // Toggle sorting order if the same column is clicked
    if (currentSortColumn === column) {
        currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = column;
        currentSortOrder = 'asc';
    }

    // Toggle the 'active' class on the clicked column header
    const clickedColumnHeader = document.querySelector(`th[data-column="${column}"]`);
    const isActive = clickedColumnHeader.classList.contains('active');
    document.querySelectorAll('th').forEach(th => {
        th.classList.remove('active');
    });
    if (!isActive) {
        clickedColumnHeader.classList.add('active');
    }

    // Sort employees based on the current sort column and order
    employeesData.sort((a, b) => {
        const valueA = a[column].toUpperCase();
        const valueB = b[column].toUpperCase();
        if (valueA < valueB) return currentSortOrder === 'asc' ? -1 : 1;
        if (valueA > valueB) return currentSortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    // Display sorted employee data
    displayEmployeeData(employeesData);
}

// Event listeners for sorting
document.querySelectorAll('th').forEach(th => {
    th.addEventListener('click', function() {
        const column = this.dataset.column;
        sortEmployees(column);
    });
});

// Search employees
function searchEmployees(query) {
    const filteredEmployees = employeesData.filter(employee => {
        for (const key in employee) {
            if (employee[key].toString().toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
        }
        return false;
    });
    displayEmployeeData(filteredEmployees);
}






// // Filter employees by department
// function filterByDepartment(department) {
//     const filteredEmployees = employeesData.filter(employee => employee.department === department);
//     displayEmployeeData(filteredEmployees);
// }

// // Filter employees by position
// function filterByPosition(position) {
//     const filteredEmployees = employeesData.filter(employee => employee.position === position);
//     displayEmployeeData(filteredEmployees);
// }

// // Filter employees by city
// function filterByCity(city) {
//     const filteredEmployees = employeesData.filter(employee => employee.city === city);
//     displayEmployeeData(filteredEmployees);
// }

// // Filter employees by state
// function filterByState(state) {
//     const filteredEmployees = employeesData.filter(employee => employee.state === state);
//     displayEmployeeData(filteredEmployees);
// }

// Filter employees by department
function filterByDepartment(department) {
    const filteredEmployees = employeesData.filter(employee => department === "" || employee.department === department);
    displayEmployeeData(filteredEmployees);
}

// Filter employees by position
function filterByPosition(position) {
    const filteredEmployees = employeesData.filter(employee => position === "" || employee.position === position);
    displayEmployeeData(filteredEmployees);
}

// Filter employees by city
function filterByCity(city) {
    const filteredEmployees = employeesData.filter(employee => city === "" || employee.city === city);
    displayEmployeeData(filteredEmployees);
}

// Filter employees by state
function filterByState(state) {
    const filteredEmployees = employeesData.filter(employee => state === "" || employee.state === state);
    displayEmployeeData(filteredEmployees);
}

// Event listeners for filtering
document.getElementById('departmentFilter').addEventListener('change', function() {
    const department = this.value;
    filterByDepartment(department);
});

document.getElementById('positionFilter').addEventListener('change', function() {
    const position = this.value;
    filterByPosition(position);
});

document.getElementById('cityFilter').addEventListener('change', function() {
    const city = this.value;
    filterByCity(city);
});

document.getElementById('stateFilter').addEventListener('change', function() {
    const state = this.value;
    filterByState(state);
});







// Show modal popup with employee details
function showModal(employeeId) {
    const employee = employeesData.find(emp => emp.employee_id === employeeId);
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
    <p><strong>employee_id:</strong> ${employee.employee_id} </p>
        <p><strong>Name:</strong> ${employee.first_name} ${employee.last_name}</p>
        <p><strong>Department:</strong> ${employee.department}</p>
        <p><strong>Position:</strong> ${employee.position}</p>
        <p><strong>City:</strong> ${employee.city}</p>
        <p><strong>State:</strong> ${employee.state}</p>
        <p><strong>Date of Birth:</strong> ${employee.date_of_birth}</p>
        <p><strong>Gender:</strong> ${employee.gender}</p>
        <p><strong>Salary:</strong> ${employee.salary}</p>
        <p><strong>Hire Date:</strong> ${employee.hire_date}</p>
        <p><strong>Email:</strong> ${employee.email}</p>
        <p><strong>Phone Number:</strong> ${employee.phone}</p>
        <p><strong>state:</strong> ${employee.state}</p>
        <p><strong>city:</strong> ${employee.city}</p>
        <p><strong>address:</strong> ${employee.address}</p>
        <p><strong>zip_code:</strong> ${employee.zip_code}</p>
    `;
    document.getElementById('myModal').style.display = 'block';
}

// Close modal popup
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Event listeners for sorting
document.querySelectorAll('th').forEach(th => {
    th.addEventListener('click', function() {
        const column = this.dataset.column;
        toggleSortOrder(column);
    });
});

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', function() {
    const searchQuery = this.value.trim();
    searchEmployees(searchQuery);
});

// Event listeners for filtering
document.getElementById('departmentFilter').addEventListener('change', function() {
    const department = this.value;
    filterByDepartment(department);
});

document.getElementById('positionFilter').addEventListener('change', function() {
    const position = this.value;
    filterByPosition(position);
});

document.getElementById('cityFilter').addEventListener('change', function() {
    const city = this.value;
    filterByCity(city);
});

document.getElementById('stateFilter').addEventListener('change', function() {
    const state = this.value;
    filterByState(state);
});






// Function to reset all filters and display original data
function refreshData() {
    // Reset filter dropdowns to their default (empty) value
    document.getElementById('departmentFilter').value = '';
    document.getElementById('positionFilter').value = '';
    document.getElementById('cityFilter').value = '';
    document.getElementById('stateFilter').value = '';

    // Display original unfiltered data
    displayEmployeeData(employeesData);
}

// Event listener for refresh button
document.getElementById('refreshButton').addEventListener('click', refreshData);






const rows = Array.from(document.querySelectorAll('tr'));

function slideOut(row) {
  row.classList.add('slide-out');
}

function slideIn(row, index) {
  setTimeout(function() {
    row.classList.remove('slide-out');
  }, (index + 5) * 200);  
}

rows.forEach(slideOut);

rows.forEach(slideIn);




























