let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

function addWorkout() {
    const date = document.getElementById("date").value;
    const type = document.getElementById("type").value;
    const duration = document.getElementById("duration").value;
    const calories = document.getElementById("calories").value;

    if (!date || !type || !duration || !calories) {
        alert("Please fill all fields");
        return;
    }

    workouts.push({ date, type, duration, calories: parseInt(calories) });
    localStorage.setItem("workouts", JSON.stringify(workouts));

    displayWorkouts();
}

function displayWorkouts() {
    const list = document.getElementById("workoutList");
    list.innerHTML = "";

    let total = 0;

    workouts.forEach((workout, index) => {
        total += workout.calories;

        list.innerHTML += `
            <tr>
                <td>${workout.date}</td>
                <td>${workout.type}</td>
                <td>${workout.duration}</td>
                <td>${workout.calories}</td>
                <td><button onclick="deleteWorkout(${index})">Delete</button></td>
            </tr>
        `;
    });

    document.getElementById("totalCalories").innerText = total;

    updateChart();
}

function deleteWorkout(index) {
    workouts.splice(index, 1);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    displayWorkouts();
}

function updateChart() {
    const ctx = document.getElementById("calorieChart").getContext("2d");

    const labels = workouts.map(w => w.date);
    const data = workouts.map(w => w.calories);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Calories Burned',
                data: data
            }]
        }
    });
}

displayWorkouts();
