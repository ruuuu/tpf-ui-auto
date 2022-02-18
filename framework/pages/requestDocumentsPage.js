const RequestDocumentsPage = function () {

    const innElement = ('table>tbody>tr:nth-child(1)'); // первый ИНН(котрый создали в  первом тесте)
    const loadButton = ('text="Загрузить"'); // кнопка Загрузить
    const historyRequestsTab = ('text="История заявок"');
    const cellFormatInHistoryTab = ('table>tbody>tr:nth-child(2)>td:nth-child(8)'); // Формат дока в История заявок
    const notUpdatedButton = ('text="Нет обновлений"');
    const closeButton = ('#modal-close-icon'); // крестик чтобы закрыть карточку НП
    const requqestsTab = ('text="Заявки на получение сведений"');



    this.requestDocument = async function (page) { // Запрос дока

        await page.click(innElement); // 

        await page.click(loadButton);


        // while (await page.textContent(loadButton) !== 'Нет обновлений') {
        //     await page.waitForTimeout(5000); // 5 сек ждем 
        //     if (await page.textContent(loadButton) === 'Нет обновлений') break;
        // }

        // расскоменить когда пофиксят баг
        //await page.waitForSelector(notUpdatedButton); // ждем пока не появится кнопка Нет обновлений
    };


    this.validateInfoInRequestsTab = async function (page) {

        await page.click(closeButton);

        await page.click(requqestsTab);
    }



    this.getLocatorNotUpdateButton = async function () { // кнопка Нет обновлений
        return notUpdatedButton;
    }


    this.historyRequest = async function (page) { // Вкладка История заявок
        await page.click(historyRequestsTab); // жмем на История заявок
    }


    this.getLocatorCellStatusInHistoryRequestsTab = async function () { // 
        const statusRequestDocLocator = ('table>tbody>tr:nth-child(2)>td:nth-child(2)>div>div'); // статус Док в История заявок в карточке НП                        
        return statusRequestDocLocator;
    }


    this.getLocatorAboutTaxpayer = async function () {
        const statusActivityInHistoryTab = ('text="Получение сведений о НП"');
        return statusActivityInHistoryTab;
    }


    this.getLocatorCellFormatInHistoryRequestsTab = async function () { // Локатор Формат в История заявок
        const cellFormatLocator = ('table>tbody>tr:nth-child(2)>td:nth-child(8)');
        return cellFormatLocator;
    }

    this.getLocatorStatusDocRequestLocator = async function () {
        const statusDocRequestLocator = ('table>tbody>tr:nth-child(2)>td:nth-child(2)');
        return statusDocRequestLocator;
    }

    this.getLocatorcellFormatInQueryRequests = async function () {
        const cellFormatInQueryRequestsLocator = ('table>tbody>tr:nth-child(2)>td:nth-child(9)');
        return cellFormatInQueryRequestsLocator;
    }


}


export { RequestDocumentsPage } //  экспорт фукнции