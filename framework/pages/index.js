import { LoginPage } from './loginPage';
import { CreateTaxpayerPage } from './createTaxpayerPage';
import { LocatorPage } from './locatorPage';
import { FilterSearchPage } from './filterSearchPage';
import { RequestDocumentsPage } from './requestDocumentsPage';
import { dataGenerate } from './data';



const app = () => ({
    loginPage: () => new LoginPage(),
    createTaxpayerPage: () => new CreateTaxpayerPage(),
    locatorPage: () => new LocatorPage(),
    filterSearchPage: () => new FilterSearchPage(),
    requestDocumentsPage: () => new RequestDocumentsPage(),
    data: () => new dataGenerate(),
});


export { app };