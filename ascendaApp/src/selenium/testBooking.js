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
    this.timeout(10000);
    var driver;
  
    beforeEach(function(){
      driver = new Builder().withCapabilities(
        Capabilities.chrome()).build();
      driver.get('http://127.0.0.1:3000/bookings');
    });
    describe('fill all form fields', function(){
        it('function should terminate without error', async function() {
            // let titleBox = await driver.findElement(By.xpath('//*[@id="title"]'));
            // await titleBox.click();
            let day = new Date();
            let date = new Date(day.getTime() + 2.628e+9);
            let expiryDate = formatDate(date);


            let titleOptions = await driver.findElements(By.className('menuItem'));
            titleOptions[2].click();

            let firstNameBox = await driver.find_element_by_id("firstName");
            firstNameBox.sendKeys('Jane');

            let lastNameBox = await driver.find_element_by_id("lastName");
            lastNameBox.sendKeys('Doe');

            let countryCodeBox = await driver.find_element_by_id("countryCode");
            countryCodeBox.sendKeys('Singapore');

            let phoneNoBox = await driver.find_element_by_id("phoneNumber");
            phoneNoBox.sendKeys('12345678');

            let emailAddressBox = await driver.find_element_by_id("emailAddress");
            emailAddressBox.sendKeys('beverley_chee@mymail.sutd.edu.sg');

            let specialRecBox = await driver.find_element_by_id("specialRequest");
            specialRecBox.sendKeys('NIL');

            let cardNoBox = await driver.find_element_by_id("cardNumber");
            cardNoBox.sendKeys('12345678');

            let nameBox = await driver.find_element_by_id("nameOnCard");
            nameBox.sendKeys('Jane Doe');

            let expiryDateBox = await driver.find_element_by_id("expiryDate");
            expiryDateBox.sendKeys(expiryDate);

            let CVVBox = await driver.find_element_by_id("cvvCvc");
            CVVBox.sendKeys('123');

            let addressBox = await driver.find_element_by_id("address");
            addressBox.sendKeys('ABC Street');

            let cityBox = await driver.find_element_by_id("city");
            cityBox.sendKeys('aaAAAA');

            let zipCodeBox = await driver.find_element_by_id("zipCode");
            zipCodeBox.sendKeys('654321');

            let countryBox = await driver.find_element_by_id("country");
            countryBox.sendKeys('Singapore')

            let clickCheckBox = await driver.find_element_by_id("checkBox");
            clickCheckBox.click();

            let confirmButton = await driver.find_element_by_id("confirmButton");
            confirmButton.click();
        });
    });

    afterEach(function() {
        driver.quit();
    });
});