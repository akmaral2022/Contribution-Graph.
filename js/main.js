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
            dayBox.addEventListener('mouseenter', () => {
                const showSucces = document.createElement('div')
                showSucces.setAttribute('class', 'show__succes')
                showSucces.innerHTML = `
                <p>${contributionCount} contributions</p>
                <p>${contributionDate}</p>
                `
                dayBox.appendChild(showSucces)
                dayBox.addEventListener('mouseleave', () => {
                    showSucces.style.display = 'none'
                })
            })

            const contributionCount = allBoxes[contributionDate] || 0;

            // console.log(contributionCount);

            // СЕГОДНЯШНИЙ ДЕНЬ
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            console.log(formattedDate);
            console.log(contributionDate);
            if (formattedDate === contributionDate) {
                dayBox.classList.toggle('today')
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

        ////////////// Блоки с обьяснением ///////////////////////
        const zero = document.querySelector('.zero')
        const nine = document.querySelector('.nine')
        const nineteen = document.querySelector('.nineteen')
        const twentyNine = document.querySelector('.twenty__nine')
        const thirty = document.querySelector('.thirty')
        zero.addEventListener('mouseenter', () => {
            const showSucces = document.createElement('div')
            showSucces.setAttribute('class', 'zero__con con')
            showSucces.innerHTML = `
                <p>0 contributions</p>
                `
            zero.appendChild(showSucces)
            zero.addEventListener('mouseleave', () => {
                showSucces.style.display = 'none'
            })
        })
        nine.addEventListener('mouseenter', () => {
            const showSucces = document.createElement('div')
            showSucces.setAttribute('class', 'nine__con con')
            showSucces.innerHTML = `
        <p>1-9 contributions</p>
        `
            nine.appendChild(showSucces)
            nine.addEventListener('mouseleave', () => {
                showSucces.style.display = 'none'
            })
        })
        nineteen.addEventListener('mouseenter', () => {
            const showSucces = document.createElement('div')
            showSucces.setAttribute('class', 'nineteen__con con')
            showSucces.innerHTML = `
        <p>10-19 contributions</p>
        `
            nineteen.appendChild(showSucces)
            nineteen.addEventListener('mouseleave', () => {
                showSucces.style.display = 'none'
            })
        })
        twentyNine.addEventListener('mouseenter', () => {
            const showSucces = document.createElement('div')
            showSucces.setAttribute('class', 'twenty__nine__con con')
            showSucces.innerHTML = `
        <p>20-29 contributions</p>
        `
            twentyNine.appendChild(showSucces)
            twentyNine.addEventListener('mouseleave', () => {
                showSucces.style.display = 'none'
            })
        })
        thirty.addEventListener('mouseenter', () => {
            const showSucces = document.createElement('div')
            showSucces.setAttribute('class', 'thirty__con con')
            showSucces.innerHTML = `
        <p>30+ contributions</p>
        `
            thirty.appendChild(showSucces)
            thirty.addEventListener('mouseleave', () => {
                showSucces.style.display = 'none'
            })
        })
    } catch {
        console.error('Произошла ошибка', error);

    }
}