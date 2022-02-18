const LocatorPage = function() {
    this.getLocator = async function(locator) {
        return locator;
    };

    this.getElement = async function(page, locator) {
        await page
            .waitForSelector(locator)
            .then(() => console.log("Загрузился элемент"));

        const elemText = await page.textContent(locator);
        return elemText;
    };
};

export { LocatorPage };