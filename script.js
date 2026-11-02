// ч1
// Тема: Робота з масивами, функціями та алгоритмами обробки даних

// 1. Початковий масив із 10 записів про сервіси ательє
const services = [
    { id: 101, name: "Пошив сукні", type: "Пошив", readDay1: 150, readDay2: 220, duration: 5, price: 2500 },
    { id: 102, name: "Ремонт блискавки", type: "Ремонт", readDay1: 300, readDay2: 450, duration: 1, price: 300 },
    { id: 103, name: "Укорочення штанів", type: "Ремонт", readDay1: 200, readDay2: 180, duration: 1, price: 250 },
    { id: 104, name: "Пошив костюма", type: "Пошив", readDay1: 80, readDay2: 120, duration: 10, price: 6000 },
    { id: 105, name: "Вишивка логотипу", type: "Декор", readDay1: 95, readDay2: 110, duration: 2, price: 800 },
    { id: 106, name: "Прасування пальта", type: "Догляд", readDay1: 110, readDay2: 90, duration: 1, price: 400 },
    { id: 107, name: "Підгонка піджака", type: "Ремонт", readDay1: 170, readDay2: 210, duration: 3, price: 1200 },
    { id: 108, name: "Пошив штори", type: "Декор", readDay1: 60, readDay2: 85, duration: 2, price: 1500 },
    { id: 109, name: "Реставрація шкіри", type: "Ремонт", readDay1: 130, readDay2: 175, duration: 5, price: 3500 },
    { id: 110, name: "Хімчистка сукні", type: "Догляд", readDay1: 210, readDay2: 260, duration: 3, price: 1800 }
];

/*
  1.1 Впорядкування назв сервісів за терміном тривалості та знаходження середньої кількості користувачів для кожного терміну.
 */
function processServicesByDuration(servicesList) {
    console.log("1.1 Впорядкування за терміном тривалості та середня відвідуваність");
    
    // Перевірка типів даних через typeof (Стор. 2 методички)
    console.log("[typeof] Перевірка типів: масив=" + typeof servicesList + ", об'єкт=" + typeof servicesList[0] + ", ціна=" + typeof servicesList[0].price);

    // Сортуємо копію масиву за зростанням тривалості (duration) за допомогою concat() та sort()
    const sorted = [].concat(servicesList).sort((a, b) => a.duration - b.duration);
    
    console.log("Впорядковані назви сервісів:");
    sorted.forEach(s => console.log(" - " + s.name + " (Тривалість: " + s.duration + " дн., Ціна: " + s.price + " грн)"));

    // Групуємо сервіси за тривалістю
    const groups = {};
    sorted.forEach(s => {
        if (!groups[s.duration]) {
            groups[s.duration] = [];
        }
        groups[s.duration].push(s);
    });

    console.log("\nСередня кількість користувачів за однакової тривалості:");
    for (const duration in groups) {
        const items = groups[duration];
        const totalDay1 = items.reduce((sum, item) => sum + item.readDay1, 0);
        const totalDay2 = items.reduce((sum, item) => sum + item.readDay2, 0);
        
        const avgDay1 = (totalDay1 / items.length).toFixed(1);
        const avgDay2 = (totalDay2 / items.length).toFixed(1);
        
        // Округлення за допомогою об'єкта Math.round() зі стор. 14 методички
        const rawAvg = (parseFloat(avgDay1) + parseFloat(avgDay2)) / 2;
        const avgTotal = Math.round(rawAvg);

        console.log("Тривалість: " + duration + " дн. (Сервісів: " + items.length + ") -> Ср. Доба 1: " + avgDay1 + ", Ср. Доба 2: " + avgDay2 + ", Загальне округлене (Math.round): " + avgTotal);
    }
}

/*
 1.2 Знаходження сервісу з максимальною кількістю читачів за добу_2
 */
function findMaxReadDay2(servicesList) {
    console.log("\n 1.2 Сервіс з максимальною відвідуваністю за добу_2");
    
    const maxService = servicesList.reduce((max, current) => 
        current.readDay2 > max.readDay2 ? current : max
    , servicesList[0]);

    console.log("Сервіс: " + maxService.name);
    console.log("Читачів за добу_2: " + maxService.readDay2);
    console.log("Тип сервісу: " + maxService.type);
}

/*
 1.3 Додавання нового запису (неповні дані -> в кінець, повні -> за зростанням ціни)
 */
function addServiceRecord(servicesList, newRecord) {
    console.log("\n 1.3 Додавання нового запису");
    
    const requiredKeys = ['id', 'name', 'type', 'readDay1', 'readDay2', 'duration', 'price'];
    const isComplete = requiredKeys.every(key => newRecord.hasOwnProperty(key) && newRecord[key] !== null && newRecord[key] !== undefined && newRecord[key] !== '');

    const updatedList = [].concat(servicesList);

    if (!isComplete) {
        console.log("Інформація неповна! Додаємо новий запис у КІНЕЦЬ списку.");
        updatedList.push(newRecord);
    } else {
        console.log("Усі дані наявні! Шукаємо позицію в списку, відсортованому за зростанням вартості.");
        
        updatedList.sort((a, b) => a.price - b.price);

        let insertIndex = updatedList.length;
        for (let i = 0; i < updatedList.length; i++) {
            if (updatedList[i].price > newRecord.price) {
                insertIndex = i;
                break;
            }
        }
        
        updatedList.splice(insertIndex, 0, newRecord);
    }

    return updatedList;
}

/*
 1.4 Обчислення тривалості надання декількох сервісів одночасно за їх типом
 */
function calculateCombinedDuration(selectedServices) {
    console.log("\n 1.4 Обчислення сумарної тривалості декількох сервісів");
    
    const count = selectedServices.length;
    let multiplier = 1;

    // Конструкція if - else if - else за методичкою (Таблиця 16)
    if (count === 1) {
        multiplier = 1;
    } else if (count > 1 && count <= 3) {
        multiplier = 1.1;
    } else if (count > 3) {
        multiplier = 2;
    }

    console.log("Обрано сервісів: " + count + ". Множник тривалості: " + multiplier);

    let totalDuration = 0;
    selectedServices.forEach(s => {
        const adjustedDuration = s.duration * multiplier;
        totalDuration += adjustedDuration;
        console.log(" - " + s.name + " (" + s.type + "): початкова=" + s.duration + ", скоригована=" + adjustedDuration.toFixed(2));
    });

    console.log("Загальна підсумкова тривалість: " + totalDuration.toFixed(2) + " од.");
}

// Демонстрація роботи 1
processServicesByDuration(services);
findMaxReadDay2(services);

const incompleteService = { id: 111, name: "Терміновий замір", type: "Консультація" };
let listAfterIncomplete = addServiceRecord(services, incompleteService);

const completeService = { id: 112, name: "Пошив корсета", type: "Пошив", readDay1: 190, readDay2: 200, duration: 4, price: 2100 };
let listAfterComplete = addServiceRecord(services, completeService);

calculateCombinedDuration([services[0], services[3]]);


// ч2
// Тема: Об'єктно-орієнтоване програмування, класи та робота з датами
class UserAccount {
    constructor(lastName, firstName, age, email, feedbackGoal, dateStr, timeStr) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
        this.email = email;
        this.feedbackGoal = feedbackGoal;
        
        // Методи String: split('.') та явне перетворення Number
        const [day, month, year] = dateStr.split('.').map(Number);
        const [hours, minutes] = timeStr.split(':').map(Number);
        
        // Створення об'єкта Date за 4-м способом з методички (Стор. 12)
        this.requestDate = new Date(year, month - 1, day, hours, minutes);
    }

    // Методи об'єкта Date з методички (Стор. 13)
    getFormattedDate() {
        return this.requestDate.toLocaleDateString('uk-UA');
    }

    getFormattedTime() {
        return this.requestDate.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
    }
}

// Створення 10 облікових записів
const users = [
    new UserAccount("Коваленко", "Олена", 22, "olena.kov@gmail.com", "побажання", "12.05.2026", "14:30"),
    new UserAccount("Шевченко", "Тарас", 65, "t.shevchenko@ukr.net", "претензія", "15.05.2026", "10:15"),
    new UserAccount("Бондаренко", "Ігор", 40, "i.bond@gmail.com", "пропозиція", "12.05.2026", "14:30"),
    new UserAccount("Мельник", "Анна", 20, "a.melnik@ukr.net", "побажання", "03.06.2026", "11:00"),
    new UserAccount("Ткаченко", "Василь", 68, "v.tkach@gmail.com", "претензія", "12.05.2026", "16:45"),
    new UserAccount("Кравченко", "Марія", 30, "m.krav@gmail.com", "скарга", "22.05.2026", "09:20"),
    new UserAccount("Олійник", "Олег", 19, "oleg.oliynyk@gmail.com", "питання", "12.05.2026", "14:30"),
    new UserAccount("Павленко", "Ірина", 55, "i.pavl@ukr.net", "побажання", "10.05.2026", "18:10"),
    new UserAccount("Сидоренко", "Дмитро", 62, "d.sidor@gmail.com", "побажання", "12.05.2026", "12:00"),
    new UserAccount("Лисенко", "Софія", 24, "s.lysenko@ukr.net", "побажання", "12.05.2026", "14:30")
];

class UserAnalyticsManager {
    constructor(userList) {
        this.users = userList;
    }

    /*
      2.1 Виведення переліку користувачів, які звернулись протягом певного місяця та в заданий момент часу
     */
    filterByMonthAndTime(targetMonth, targetTimeStr) {
        console.log(" 2.1 Користувачі, що звернулися у місяць №" + targetMonth + " о " + targetTimeStr);
        
        const filtered = this.users.filter(u => {
            const userMonth = u.requestDate.getMonth() + 1; // Метод getMonth() (Стор. 13)
            const userTime = u.getFormattedTime();
            return userMonth === targetMonth && userTime === targetTimeStr;
        });

        if (filtered.length === 0) {
            console.log("Користувачів із такими параметрами не знайдено.");
        } else {
            filtered.forEach(u => {
                // Метод String.includes() зі стор. 15 методички
                const isUkrNet = u.email.includes("ukr.net") ? " (Ukr.net)" : "";
                console.log(" - " + u.lastName + " " + u.firstName + " | E-mail: " + u.email + isUkrNet + " | Мета: " + u.feedbackGoal);
            });
        }
    }

    /*
      2.2 Виведення мінімального віку користувача, його E-mail та дати звернення
     */
    getYoungestUserInfo() {
        console.log("\n2.2 Користувач з мінімальним віком");
        
        const youngest = this.users.reduce((minUser, currentUser) => 
            currentUser.age < minUser.age ? currentUser : minUser
        , this.users[0]);

        console.log("Наймолодший користувач: " + youngest.lastName + " " + youngest.firstName);
        console.log("Мінімальний вік: " + youngest.age + " років");
        console.log("E-mail: " + youngest.email);
        console.log("Дата звернення: " + youngest.getFormattedDate());
    }

    /*
      2.3 Поділ користувачів на класи за віком та метою звернення
     */
    classifyUsers() {
        console.log("\n2.3 Класифікація користувачів за категоріями");
        
        const classes = {
            "активна молодь": [],
            "похилий претензійний": [],
            "середній без претензій": [],
            "інші": []
        };

        this.users.forEach(u => {
            // Метод toLowerCase() об'єкта String (Стор. 15)
            const goal = u.feedbackGoal.toLowerCase();

            if (u.age < 25 && goal === "побажання") {
                classes["активна молодь"].push(u);
            } else if (u.age > 60 && goal === "претензія") {
                classes["похилий претензійний"].push(u);
            } else if (u.age >= 25 && u.age <= 60 && goal !== "претензія") {
                classes["середній без претензій"].push(u);
            } else {
                classes["інші"].push(u);
            }
        });

        for (const className in classes) {
            console.log("Клас \"" + className + "\": " + classes[className].length + " осіб");
            classes[className].forEach(u => {
                console.log(" - " + u.lastName + " " + u.firstName + " (" + u.age + " р., мета: " + u.feedbackGoal + ")");
            });
        }
    }

    /*
      2.4 Сортування користувачів в алфавітному порядку адреси E-mail із виведенням мети
     */
    sortByEmailWithGoal() {
        console.log("\n2.4 Сортування за алфавітом E-mail");
        
        const sorted = [].concat(this.users).sort((a, b) => {
            if (a.email < b.email) return -1;
            if (a.email > b.email) return 1;
            return 0;
        });

        sorted.forEach(u => {
            console.log("E-mail: " + u.email + " | Мета: " + u.feedbackGoal + " | Користувач: " + u.lastName + " " + u.firstName);
        });
    }
}

// Демонстрація роботи 2
const analytics = new UserAnalyticsManager(users);

analytics.filterByMonthAndTime(5, "14:30"); // Травень (місяць 5), час 14:30
analytics.getYoungestUserInfo();
analytics.classifyUsers();
analytics.sortByEmailWithGoal();