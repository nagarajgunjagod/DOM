
document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm'); // Form element
    const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0]; // Table body element

    // Loading students from local storage when the page loads
    loadStudents();

    // Event listener for form submission
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from submitting the traditional way
        
        // Getting form input values
        const studentName = document.getElementById('studentName').value;
        const studentID = document.getElementById('studentID').value;
        const emailID = document.getElementById('emailID').value;
        const contactNo = document.getElementById('contactNo').value;

        // Validating form inputs and Adding student record if validation passes
        if (validateForm(studentName, studentID, emailID, contactNo)) {
         
            addStudent(studentName, studentID, emailID, contactNo);
            studentForm.reset(); 
        }
    });

    // Function to validate form inputs
    function validateForm(name, id, email, contact) {
        const namePattern = /^[a-zA-Z\s]+$/; 
        const idPattern = /^[0-9]+$/; 
        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/; 
        const contactPattern = /^[0-9]+$/; 

        
        if (!namePattern.test(name)) {
            alert('Student name must contain only characters.');
            return false;
        }
        
        if (!idPattern.test(id)) {
            alert('Student ID must contain only numbers.');
            return false;
        }
        
        if (!emailPattern.test(email)) {
            alert('Invalid email format.');
            return false;
        }
        
        if (!contactPattern.test(contact)) {
            alert('Contact number must contain only numbers.');
            return false;
        }
        return true; // Return true if all validations pass
    }

    // This Function adds a new student record
    function addStudent(name, id, email, contact) {
        const student = { name, id, email, contact }; 
        let students = JSON.parse(localStorage.getItem('students')) || []; 
        students.push(student); 
        localStorage.setItem('students', JSON.stringify(students)); 
        displayStudent(student); 
    }

    // This Function display a student record in the table
    function displayStudent(student) {
        const row = studentsTable.insertRow();
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(this)"><i class="fa-solid fa-pen-to-square" style="color: #142542;"></i></button>
                <button onclick="deleteStudent(this)"><i class="fa-solid fa-trash" style="color: #d90202;"></i></button>
            </td>
        `; // Setting the inner HTML of the new row with student data and action buttons
    }

   
    function loadStudents() {
        let students = JSON.parse(localStorage.getItem('students')) || []; 
        students.forEach(student => displayStudent(student)); 
    }

    // This Function edits a student record
    window.editStudent = function(button) {
        const row = button.parentNode.parentNode; 
        const name = row.cells[0].innerText; 
        const id = row.cells[1].innerText; 
        const email = row.cells[2].innerText; 
        const contact = row.cells[3].innerText; 

        
        document.getElementById('studentName').value = name;
        document.getElementById('studentID').value = id;
        document.getElementById('emailID').value = email;
        document.getElementById('contactNo').value = contact;

        
        deleteStudent(button);
    };

    
    window.deleteStudent = function(button) {
        const row = button.parentNode.parentNode; 
        const id = row.cells[1].innerText; 
        row.remove(); 

        let students = JSON.parse(localStorage.getItem('students')) || []; 
        students = students.filter(student => student.id !== id); 
        localStorage.setItem('students', JSON.stringify(students)); 
    };
});
