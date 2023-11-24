const calendar = document.querySelector('.calendar')
// const dayBox = document.querySelector('.day__box')
window.onload = async () => {
    try {
        const today = new Date();
        const startDate = new Date(today.getTime() - 50 * 7 * 24 * 60 * 60 * 1000);
        const endDate = new Date(today.getTime() + 50 * 7 * 24 * 60 * 60 * 1000);

        console.log(startDate);
        const response = await fetch('https://dpg.gg/test/calendar.json')
        const allBoxes = await response.json()
        const contributions = Object.values(allBoxes)
        const graphContainer = document.querySelector('.contribution-graph');

        let currentDate = new Date(startDate)
        while (currentDate <= today) {
            const contributionDate = currentDate.toISOString().split('T')[0];
            currentDate.setDate(currentDate.getDate() + 1);

            console.log(contributionDate);

            const dayBox = document.createElement('div')
            dayBox.setAttribute('class', 'day__box')

            const contributionCount = allBoxes[contributionDate];

            console.log(contributionCount);
            // contributions.forEach(box => {


            if (contributionCount === 0) {
                dayBox.style.background = '#EDEDED'
            } else if (contributionCount > 1 & contributionCount < 9) {
                dayBox.style.background = '#ACD5F2'
            } else if (contributionCount > 9 & contributionCount < 19) {
                dayBox.style.background = '#7FA8C9'
            } else if (contributionCount > 20 & contributionCount < 29) {
                dayBox.style.background = '#527BA0'
            } else if (contributionCount > 30) {
                dayBox.style.background = '#254E77'
            }
            calendar.appendChild(dayBox)
            // });
        }

    } catch {
        console.error('Произошла ошибка', error);

    }
}