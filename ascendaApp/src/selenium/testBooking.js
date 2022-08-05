require('chromedriver');
const { Builder, By, Key, Capabilities } = require('selenium-webdriver');

describe('Booking Actions', function() {
    this.timeout(10000);
    var driver;
  
    beforeEach(function(){
      driver = new Builder().withCapabilities(
        Capabilities.chrome()).build();
      driver.get('http://127.0.0.1:3000/bookings');
    });
    describe('fill all form fields', function(){
        it('function should terminate without error', async function() {
            let titleBox = await driver.findElement(By.xpath('//*[@id="title"]'));
            await titleBox.click();
            let titleOptions = await driver.findElements(By.className('menuItem'));
            titleOptions[2].click();

            let firstNameBox = await driver.findElement(By.xpath('//*[@id="firstName"]'));
            firstNameBox.sendKeys('Jane');

            let lastNameBox = await driver.findElement(By.xpath('//*[@id="lastName"]'));
            lastNameBox.sendKeys('Doe');

            let countryCodeBox = await driver.findElement(By.xpath('//*[@id="countryCode"]'));
            countryCodeBox.sendKeys('Singapore');

            let phoneNoBox = await driver.findElement(By.xpath('//*[@id="phoneNumber"]'));
            phoneNoBox.sendKeys('12345678')

            let emailAddressBox = await driver.findElement(By.xpath('//*[@id="emailAddress"]'));
            emailAddressBox.sendKeys('beverley_chee@mymail.sutd.edu.sg');

            let specialRecBox = await driver.findElement(By.xpath('//*[@id="specialRequest"]'));
            specialRecBox.sendKeys('NIL');

            let clickCheckBox = await driver.findElement(By.xpath('//*[@id="checkBox"]'));
            clickCheckBox.click();

            let confirmButton = await driver.findElement(By.xpath('//*[@id="confirmButton"]'));
            confirmButton.click();
        });
    });

    afterEach(function() {
        driver.quit();
    });
});