import { getRandomInnYrLiso } from './data'; //../framework/pages/data

const CreateTaxpayerPage = function () {

    const createTaxpayerButton = ('text="Создать карточку"'); // кнопка "Создать карточку"    
    const innField = ('[data-field-name = "inn"]'); // поле ввода ИНН
    const checkButton = ('text="Найти"'); //  кнопка  Найти(check) 
    const prodolgitButton = ('text="Продолжить"'); // кнопка Продолжить
    const queryTab = ('text="Заявки на получение сведений"'); // вкладка  Запросы
    const innTab = ('text="Налогоплательщики"'); // вкладка Налогоплательщики
    const closeButton = ('#modal-close-icon'); // крестик чтобы закрыть карточку НП

    const searchButton = ('#process-search--icon'); // кнпока поиска
    const searchInput = ('#process-search--input'); // поле поиска
    const searchResult = ('table>tbody>tr>td:nth-child(1)>span'); // ячейка в котром выдается результат
    const noData = ('table>tbody>tr>td');
    ////*[@id="grommetRoot"]/div/div[2]/div/div[3]/div[3]/div[1]/div/div/table/tbody/tr/td


    this.createTaxpayer2 = async function (page, inn) {
        let attemptCount = 0;
        let Urinn = inn; // нач значение 
        console.log('зашли в createTaxpayer2');

        await page.click(searchButton); // Кнопка поиска
        await page.fill(searchInput, Urinn); // вбиваем в поле поиска inn

        console.log('await page.textContent(searchResult) =', await page.textContent(searchResult));


        while (await page.textContent(searchResult) === Urinn) {
            console.log('зашли в цикл while, inn=', Urinn);
            await page.fill(searchInput, ''); // очищаем поле поиска

            Urinn = getRandomInnYrLiso();
            await page.fill(searchInput, Urinn); // заполняем поле поиска
            attemptCount++;

            if (await page.textContent(noData) === 'Нет данных.') { // 
                console.log('такого инн нет в системе');
                break;
            }

        }

        console.log('вышли из цикла');
        console.log('число попыток равно ', attemptCount);

        await this.createTaxpayer(page, Urinn);

        await page.click(closeButton); // Крестик

        await page.click(queryTab); // вкладка  Запросы

    }



    this.createTaxpayer = async function (page, inn) {

        await page.click(createTaxpayerButton); // кнопка Создать карточку
        console.log('зашли в createTaxpayer');
        console.log('inn ', inn);

        await page.waitForTimeout(2000); // 2 сек ждем 

        await page.fill(innField, inn); // запонлить поле

        await page.click(checkButton); // жмем Найти

        await page.click(prodolgitButton); // жмем Продолжить

        await page.waitForTimeout(2000); // 2 сек ждем 

    };




    this.createTaxpayerAlreadyExist = async function (page, inn) { // Создаем НП, котрый уже есть в системе

        await page.click(createTaxpayerButton);

        await page.fill(innField, inn);

        await page.click(checkButton);

        await page.click(prodolgitButton);

        await page.click(prodolgitButton);

    };

    this.getLocatorCellActivityInRequestsTab = async function () {
        const activityLocator = ('table>tbody>tr:nth-child(2)>td:nth-child(3)>div');
        return activityLocator;
    }

    this.getLocatorCellStatusInRequestsTab = async function () { // локатор для статуса
        const statusLocator = ('table>tbody>tr:nth-child(2)>td:nth-child(2)>div>div');
        return statusLocator;
    }

    this.getLocatorForRedMessage = async function () {
        const redMessageLocator = ('text="По данному ИНН уже создана карточка НП"');
        return redMessageLocator;
    }


};

export { CreateTaxpayerPage }