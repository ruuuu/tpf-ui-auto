import supertest from 'supertest';
import { app } from './index.js';

const FilterSearchPage = function() {

    const poiskButton = ('div>div>div>div:nth-child(1)>div>div:nth-child(4)>div>div');
    const searchInnField = ('[placeholder="Введите ИНН"]');
    const requests = ('text="Заявки на получение сведений"');

    const filterButtonForInnAtTaxpayers = ('table>thead>tr>th:nth-child(1)>div>div>div:nth-child(2)>div:nth-child(2)>div');
    const innFiled = ('[placeholder = "Найти..."]');
    const applyButton = ('text="Применить"');
    const filterButtonForInnAtRequests = ('table>thead>tr>th:nth-child(4)>div>div>div:nth-child(2)>div:nth-child(2)');




    this.searchTaxpayerByInnAtTaxpayers = async function(page, inn) { // поиск по ИНН на вкладке НП

        await page.click(poiskButton);

        await page.fill(searchInnField, inn);

    };



    this.filterTaxpayerByInnAtTaxpayers = async function(page, inn) { // фильтр по Инн на вкладке НП

        await page.click(filterButtonForInnAtTaxpayers);

        await page.fill(innFiled, '');
        await page.fill(innFiled, inn);

        await page.click(applyButton);

    };



    this.searchTaxpayerByInnAtRequests = async function(page, inn) { // поиск по ИНН на вкладке Запросы

        await page.click(requests);

        await page.click(poiskButton);

        await page.fill(searchInnField, inn);

    };



    this.filterTaxpayerByInnAtRequests = async function(page, inn) { // фильтр по Инн на вкладке Запросы

        await page.click(requests);

        await page.click(filterButtonForInnAtRequests);

        await page.fill(innFiled, inn);

        await page.click(applyButton);

    };


    this.filterByStatusAtRequests = async function(url, statusRequest, j) { // фильтр по Статусу на вкладке Запросы

        const data = {
            grant_type: "password",
            password: String(app().data()[j].password),
            username: String(app().data()[j].email)
        };

        const rr = await supertest(url)
            .post('/api/v0/vst-oauth2/oauth/token')
            .set('Authorization', `Basic ZGVtby1jbGllbnQ6c2VjcmV0`)
            .send(data);

        const token = rr.body.access_token;
        //console.log('token = ', token);

        const r = await supertest(url)
            .get('/api/v0/tpf-bank/taxpayers/requests')
            .query({ page: 0, size: 20, status: statusRequest })
            .set('Authorization', `Bearer ${token}`);
        //console.log('r.body ', r.body);    

        let arrayStatus = [];
        for (let i = 0; i < r.body.content.length; i++) {
            arrayStatus.push(r.body.content[i].status);
        }

        return arrayStatus;
    };


    this.getLocatorInnCellInTaxpayerTab = async function() {
        const innLocator = ('table>tbody>tr>td:nth-child(1)>span');
        return innLocator;
    }

    this.getLocatorInnCellInRequestsTab = async function() {
        const innLocator = ('table>tbody>tr:nth-child(2)>td:nth-child(4)>div');
        return innLocator;
    }





};


export { FilterSearchPage };