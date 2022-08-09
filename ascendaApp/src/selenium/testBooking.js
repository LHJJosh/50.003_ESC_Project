require('chromedriver');
const { Builder, By, Key, Capabilities } = require('selenium-webdriver');

function formatDate(date) {
  let formattedMonth = (date.getMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  let formattedDate = date.getDate().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  return `${formattedMonth}${formattedDate}${date.getFullYear()}`;
}

describe('Booking Actions', function() {
    this.timeout(100000);
    var driver;
  
    beforeEach(function(){
      driver = new Builder().withCapabilities(
        Capabilities.chrome()).build();
      driver.get('http://127.0.0.1:3000/bookings');
    });
    describe('fill all form fields', function(){
        it('function should terminate without error', async function() {
            
            let day = new Date();
            let date = new Date(day.getTime() + 2.628e+9);
            let expiryDate = formatDate(date);

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
            phoneNoBox.sendKeys('12345678');

            let emailAddressBox = await driver.findElement(By.xpath('//*[@id="emailAddress"]'));
            emailAddressBox.sendKeys('beverley_chee@mymail.sutd.edu.sg');

            let specialRecBox = await driver.findElement(By.xpath('//*[@id="specialRequest"]'));
            specialRecBox.sendKeys('NIL');

            let cardNoBox = await driver.findElement(By.xpath('//*[@id="cardNumber"]'));
            cardNoBox.sendKeys('12345678');

            let nameBox = await driver.findElement(By.xpath('//*[@id="nameOnCard"]'));
            nameBox.sendKeys('Jane Doe');

            let expiryDateBox = await driver.findElement(By.xpath('//*[@id="expiryDate"]'));
            expiryDateBox.sendKeys(expiryDate);

            let CVVBox = await driver.findElement(By.xpath('//*[@id="cvvCvc"]'));
            CVVBox.sendKeys('123');

            let addressBox = await driver.findElement(By.xpath('//*[@id="address"]'));
            addressBox.sendKeys('ABC Street');

            let cityBox = await driver.findElement(By.xpath('//*[@id="city"]'));
            cityBox.sendKeys('aaAAAA');

            let zipCodeBox = await driver.findElement(By.xpath('//*[@id="zipCode"]'));
            zipCodeBox.sendKeys('654321');

            let countryBox = await driver.findElement(By.xpath('//*[@id="country"]'));
            countryBox.sendKeys('Singapore')

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