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
for(let i = 0; i < NUM_ATTEMPTS; i++){
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