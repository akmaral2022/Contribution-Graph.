const calendar = document.querySelector('.calendar')
const month = document.querySelector('.month__line')
const week = document.querySelector('.week__column')

window.onload = async () => {
    try {
        const today = new Date();
        const startDate = new Date(today.getTime() - 50 * 7 * 24 * 60 * 60 * 1000);

        const monthNames = []

        // КАЛЕНДАРЬ        
        const response = await fetch('https://dpg.gg/test/calendar.json')
        const allBoxes = await response.json()

        let currentDate = new Date(startDate)
        while (currentDate <= today) {
            const monthName = currentDate.toLocaleString('default', { month: 'long' })
            if (!monthNames.includes(monthName)) {
                monthNames.push(monthName)
            }

            const contributionDate = currentDate.toISOString().split('T')[0];
            currentDate.setDate(currentDate.getDate() + 1);

            const dayBox = document.createElement('div')
            dayBox.setAttribute('class', 'day__box')

            const contributionCount = allBoxes[contributionDate] || 0;

            // console.log(contributionCount);
            dayBox.title = contributionDate;

            // СЕГОДНЯШНИЙ ДЕНЬ
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            ;
            if (formattedDate === contributionDate) {
                dayBox.style.border = "1px solid #000"
            }

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
        }


        monthNames.forEach(monthName => {
            const monthItem = document.createElement('div')
            monthItem.setAttribute('class', 'month__name')
            monthItem.textContent = monthName
            month.append(monthItem)
        })

    } catch {
        console.error('Произошла ошибка', error);

    }
}