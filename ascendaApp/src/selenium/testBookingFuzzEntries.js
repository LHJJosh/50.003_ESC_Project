require('chromedriver');
const { Builder, By, Key, Capabilities } = require('selenium-webdriver');

NUM_ATTEMPTS = 3;


const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function createEntries(length){
  let entry = "";
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      entry += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return entry;
}

function createNum(length){
  let entry = "";
  for ( let i = 0; i < length; i++ ) {
    entry += getRandomInt(9);
  }

  return entry;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max + 1);
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

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

for(let i = 0; i < NUM_ATTEMPTS; i++){
  describe('Booking Actions', function() {
      this.timeout(10000);
      var driver;

      let day = new Date();
      let expiryDate =  formatDate(randomDate(day, new Date(day.getFullYear(), 12-1, 31)));
    
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
              titleOptions[getRandomInt(4)-1].click();

              let firstNameBox = await driver.findElement(By.xpath('//*[@id="firstName"]'));
              firstNameBox.sendKeys(createEntries(getRandomInt(10)));

              let lastNameBox = await driver.findElement(By.xpath('//*[@id="lastName"]'));
              lastNameBox.sendKeys(createEntries(getRandomInt(10)));

              let countryCodeBox = await driver.findElement(By.xpath('//*[@id="countryCode"]'));
              countryCodeBox.sendKeys(createEntries(getRandomInt(10)));

              let phoneNoBox = await driver.findElement(By.xpath('//*[@id="phoneNumber"]'));
              phoneNoBox.sendKeys(createNum(8))

              let emailAddressBox = await driver.findElement(By.xpath('//*[@id="emailAddress"]'));
              emailAddressBox.sendKeys(createEntries(getRandomInt(10)).concat('@mymail.sutd.edu.sg'));

              let specialRecBox = await driver.findElement(By.xpath('//*[@id="specialRequest"]'));
              specialRecBox.sendKeys(createEntries(getRandomInt(10)));

              let cardNoBox = await driver.findElement(By.xpath('//*[@id="cardNumber"]'));
              cardNoBox.sendKeys(createNum(16));

              let nameBox = await driver.findElement(By.xpath('//*[@id="nameOnCard"]'));
              nameBox.sendKeys(createEntries(getRandomInt(10)));

              let expiryDateBox = await driver.findElement(By.xpath('//*[@id="expiryDate"]'));
              expiryDateBox.sendKeys(expiryDate);

              let CVVBox = await driver.findElement(By.xpath('//*[@id="cvvCvc"]'));
              CVVBox.sendKeys(createNum(3));

              let addressBox = await driver.findElement(By.xpath('//*[@id="address"]'));
              addressBox.sendKeys(createEntries(getRandomInt(10)).concat('Street'));

              let cityBox = await driver.findElement(By.xpath('//*[@id="city"]'));
              cityBox.sendKeys(createEntries(getRandomInt(10)));

              let zipCodeBox = await driver.findElement(By.xpath('//*[@id="zipCode"]'));
              zipCodeBox.sendKeys(createNum(6));

              let countryBox = await driver.findElement(By.xpath('//*[@id="country"]'));
              countryBox.sendKeys(createEntries(getRandomInt(10)));

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
}