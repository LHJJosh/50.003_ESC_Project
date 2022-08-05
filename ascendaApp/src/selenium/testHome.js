require('chromedriver');
const { Builder, By, Key, Capabilities} = require('selenium-webdriver');
const assert = require('assert');


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


describe('Home Actions', function() {
  this.timeout(100000);
  var driver;

  beforeEach(function(){
    driver = new Builder().withCapabilities(
      Capabilities.chrome()).build();
    driver.get('http://127.0.0.1:3000/');
  });

  describe('fill all form fields', function() {
    it('function should terminate without error', async function() {

      let today = new Date();
      let start = new Date(today.getTime() + 2.628e+9);
      let end = new Date(today.getTime() + 2.628e+9 + 2.592e+8);
      let startdate = formatDate(start);
      let enddate = formatDate(end);

      let destBox = await driver.findElement(By.xpath('//*[@id="destination"]'));
      destBox.sendKeys('Singapore, Singapore (SIN-Changi)');
      
      let checkInDayBox = await driver.findElement(By.xpath('//*[@id="checkInDay"]'));
      checkInDayBox.sendKeys(startdate);
      
      let checkOutDayBox = await driver.findElement(By.xpath('//*[@id="checkOutDay"]'));
      checkOutDayBox.sendKeys(enddate);
      
      let roomSelectBox = await driver.findElement(By.xpath('//*[@id="rooms"]'));
      await roomSelectBox.click();
      let roomOptions = await driver.findElements(By.className('menuItem'));
      roomOptions[0].click();
      
      let adultSelectBox = await driver.findElement(By.xpath('//*[@id="adults"]'));
      await adultSelectBox.click();
      let adultOptions = await driver.findElements(By.className('menuItem'));
      adultOptions[0].click();

      let childrenSelectBox = await driver.findElement(By.xpath('//*[@id="children"]'));
      await childrenSelectBox.click();
      let childrenOptions = await driver.findElements(By.className('menuItem'));
      childrenOptions[0].click();
      
      await driver.sleep(3000);
      let hotelList = await driver.findElements(By.xpath("//*[@id='hotelList']/div/div/ul/div"));
      assert(hotelList.length > 0);

      let cardSelectBox = driver.findElement(By.className('hotelButton'));
      cardSelectBox.click();
    });
  });

  afterEach(function() {
    driver.quit();
  })

});