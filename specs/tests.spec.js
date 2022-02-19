import { app } from '../framework/pages/index';
import chai from 'chai';
import { goto, run, stop } from '../lib/browser/browser';
import { getRandomInnYrLiso, getRandomInnIP } from '../framework/pages/data';

//TODO включить линтеры, а то код нечитабельный в jetbrains

const { expect } = chai;
let page;

let url = process.env.url;
let i = process.env.i; //  (для сбера 0, для втб 1)
// запускам тесты командой: url=<значение> i=<значение> npm test, пример: url=https://vtb.cprr-dev.weintegrator.com i=1 npm test

beforeEach(async () => {
    await run();
    page = await goto(url + '/login');

});

afterEach(async () => {
    await stop();
});





describe('Набор тестов для создания НП', () => {


    it.only('Создание НП-10 значный', async () => {
        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);

        const inn = getRandomInnYrLiso();
        console.log('рандомный innYL: ', inn);
        await app().createTaxpayerPage().createTaxpayer2(page, inn);



        // ИНН:        
        const cellInn = await app().locatorPage().getLocator(await app().filterSearchPage().getLocatorInnCellInRequestsTab()); // в гриде, на вкладке Запросы, ячейка где хранится ИНН
        const cellInnText = await app().locatorPage().getElement(page, cellInn); // получаем текст элемента
        expect(cellInnText)
            .to
            .have
            .string(inn);



        // Активность:  
        const cellActivity = await app().locatorPage().getLocator(await app().createTaxpayerPage().getLocatorCellActivityInRequestsTab()); // в гриде, на вкладке Зарпосы, ячейка где хранится АКтивность
        const cellActivityText = await app().locatorPage().getElement(page, cellActivity);
        expect(cellActivityText)
            .to
            .have
            .string('Получение карты сведений о НП');



        // Статус:  
        const cellStatus = await app().locatorPage().getLocator(await app().createTaxpayerPage().getLocatorCellStatusInRequestsTab()); // в гриде, на вкладке Зарпосы, ячейка где хранится Статус
        const cellStatusText = await app().locatorPage().getElement(page, cellStatus);
        expect(cellStatusText)
            .to
            .have
            .string('Подтвержден');

    });



    it('Запрос документов', async () => {
        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);

        await app().requestDocumentsPage().requestDocument(page); // Запрос дока

        // расскоментить когда пофиксят 
        // const notUpdateButtonLocator = await app().requestDocumentsPage().getLocatorNotUpdateButton(); // ('text="Нет обновлений"'); // задизейбленая кнопка Нет обновлений
        // const notUpdateButtonText = await app().locatorPage().getElement(page, notUpdateButtonLocator);
        // expect(notUpdateButtonText)
        //     .to
        //     .have
        //     .string('Нет обновлений');


        await app().requestDocumentsPage().historyRequest(page); // Переходим на История заявок в карточке НП
        const statusRequestDocLocator = await app().requestDocumentsPage().getLocatorCellStatusInHistoryRequestsTab();
        const statusRequestDocText = await app().locatorPage().getElement(page, statusRequestDocLocator);
        // как пофиксят, рассклменнтить этот блок
        // expect(statusRequestDocText)
        //     .to
        //     .have
        //     .string('Подтвержден'); // Проверяем  статус запроса в История заявок (в карточке НП)


        const cellActivityLocator = await app().requestDocumentsPage().getLocatorAboutTaxpayer();
        const cellActivityText = await app().locatorPage().getElement(page, cellActivityLocator);
        expect(cellActivityText)
            .to
            .have
            .string('Получение сведений о НП');

        // проверка формата дока:   
        const cellFormatLocator = await app().locatorPage().getLocator(await app().requestDocumentsPage().getLocatorCellFormatInHistoryRequestsTab());
        const cellFormatText = await app().locatorPage().getElement(page, cellFormatLocator);
        expect(cellFormatText).contains("PDF", "XML");
        expect(cellFormatText).to.include("PDF", "XML");


        // проверка числа загруженных доков в гриде НП:
        const countUploadedDocLocator = ('table>tbody>tr:nth-child(1)>td:nth-child(4)')
        const countUploadedDocText = await app().locatorPage().getElement(page, countUploadedDocLocator);
        // как пофиксят, расскомментить этот блок:
        // expect(countUploadedDocText)
        //     .to
        //     .have
        //     .string('2 / 1'); 


        // проверка статуса запроса дока в гриде запросов :
        await app().requestDocumentsPage().validateInfoInRequestsTab(page);
        const statusDocRequestLocator = await app().requestDocumentsPage().getLocatorStatusDocRequestLocator();
        const statusDosRequestText = await app().locatorPage().getElement(page, statusDocRequestLocator);
        // как пофиксят, расскомментить этот блок:
        // expect(statusDosRequestText)
        //     .to
        //     .have
        //     .string('Подтвержден'); 


        // проверка формата дока в гриде запросов:
        const cellFormatInQueryRequestsLocator = await app().requestDocumentsPage().getLocatorcellFormatInQueryRequests();
        const cellFormatInQueryRequestsText = await app().locatorPage().getElement(page, cellFormatInQueryRequestsLocator);
        expect(cellFormatInQueryRequestsText).contains("PDF", "XML");
        expect(cellFormatInQueryRequestsText).to.include("PDF", "XML");

    });





    it.skip('Создание НП-12 значный', async () => {

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);


        const inn = getRandomInnIP();
        console.log('рандомный innIP: ', inn);
        await app().createTaxpayerPage().createTaxpayer(page, inn);



        // ИНН:  
        const cellInn = await app().locatorPage().getLocator(await app().filterSearchPage().getLocatorInnCellInRequestsTab());
        const cellInnText = await app().locatorPage().getElement(page, cellInn);
        expect(cellInnText)
            .to
            .have
            .string(inn);


        // Активность:   
        const cellActivity = await app().locatorPage().getLocator(await app().createTaxpayerPage().getLocatorCellActivityInRequestsTab());
        const cellActivityText = await app().locatorPage().getElement(page, cellActivity);
        expect(cellActivityText)
            .to
            .have
            .string('Получение карты сведений о НП');


        // Статус:  
        const cellStatus = await app().locatorPage().getLocator(await app().createTaxpayerPage().getLocatorCellStatusInRequestsTab());
        const cellStatusText = await app().locatorPage().getElement(page, cellStatus);
        expect(cellStatusText)
            .to
            .have
            .string('Подтвержден');
    });


    it.skip('Создание НП, который уже есть в системе', async () => {

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);

        const inn = await app().loginPage().getAllInn(url, i);
        await app().createTaxpayerPage().createTaxpayerAlreadyExist(page, inn);

        const redBlock = await app().locatorPage().getLocator(await app().createTaxpayerPage().getLocatorForRedMessage());
        const redBlockText = await app().locatorPage().getElement(page, redBlock);

        expect(redBlockText)
            .to
            .have
            .string('По данному ИНН уже создана карточка НП');
    });

});


describe('Набор тестов на поиск и фильтрацию данных НП', () => {

    it.skip('Поиск по ИНН на вкладке НП', async () => {

        const inn = await app().loginPage().getAllInn(url, i);
        //console.log('inn: ', inn);

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);

        await app().filterSearchPage().searchTaxpayerByInnAtTaxpayers(page, inn);

        const innCell = await app().locatorPage().getLocator(await app().filterSearchPage().getLocatorInnCellInTaxpayerTab());
        const innCellText = await app().locatorPage().getElement(page, innCell);
        expect(innCellText)
            .to
            .have
            .string(inn);
    });


    it.skip('Поиск по ИНН на вкладке Запросы', async () => {

        const inn = await app().loginPage().getAllInn(url, i);
        //console.log('inn: ', inn);

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);

        await app().filterSearchPage().searchTaxpayerByInnAtRequests(page, inn);


        const innCell = await app().locatorPage().getLocator(await app().filterSearchPage().getLocatorInnCellInRequestsTab());
        const innCellText = await app().locatorPage().getElement(page, innCell);
        expect(innCellText)
            .to
            .have
            .string(inn);
    });



    it.skip('Фильтр по ИНН на вкладке НП', async () => {

        const inn = await app().loginPage().getAllInn(url, i);
        //console.log('inn: ', inn);

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);

        await app().filterSearchPage().filterTaxpayerByInnAtTaxpayers(page, inn);

        const innCell = await app().locatorPage().getLocator(await app().filterSearchPage().getLocatorInnCellInTaxpayerTab());

        const innCellText = await app().locatorPage().getElement(page, innCell);
        expect(innCellText)
            .to
            .have
            .string(inn);
    });



    it.skip('Фильтр по ИНН на вкладке Запросы', async () => {

        const inn = await app().loginPage().getAllInn(url, i);
        //console.log('inn: ', inn);

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);

        await app().filterSearchPage().filterTaxpayerByInnAtRequests(page, inn);

        const innCell = await app().locatorPage().getLocator(await app().filterSearchPage().getLocatorInnCellInRequestsTab());

        //console.log('innCell', innCell);
        const innCellText = await app().locatorPage().getElement(page, innCell);
        expect(innCellText)
            .to
            .have
            .string(inn);
    });


    it.skip('Фильтр по Статус на вкладке Запросы', async () => {

        const statuses = ['PENDING', 'ACCEPTED', 'DECLINED', 'ERROR'];
        let statusRequest = statuses[Math.floor(Math.random() * statuses.length)];
        console.log('statusRequest ', statusRequest);

        const arrayStatus = await app().filterSearchPage().filterByStatusAtRequests(url, statusRequest, i);

        for (let i = 0; i < arrayStatus.length; i++) {
            expect(arrayStatus[i]).to.equal(statusRequest);
        }

        if (arrayStatus.length === 0) {
            expect(arrayStatus.length).to.equal(0);
        }
    });

});

