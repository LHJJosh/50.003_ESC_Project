require('chromedriver');
const { Builder, By, Key, Capabilities} = require('selenium-webdriver');
const assert = require('assert');

var today = new Date();

const currentYear = today.getFullYear();
const currentMonth = today.getMonth()+1;
const currentDay = today.getDate();
console.log(currentMonth);

function getRandomInt(max) {
  return Math.floor(Math.random() * max + 1);
}


for(let i = 0; i < 6; i++){
  try{
    
  describe('Home Actions', function() {
    this.timeout(10000);
    var driver;
    

    var month1 = currentMonth.toString();
    var month2 = Math.min(currentMonth + getRandomInt(11),12).toString();
    var day1 = currentDay.toString();
    if(day1 < 28){
      var day2 = Math.min(currentDay + getRandomInt(27),12).toString();
    }
    else{
      var day2 = currentDay.toString();
    }
    var secondYear = currentYear;
    if(month1 == 12){
      secondYear += 1;
      month2 = 1;
    }
    let startdate = day1.concat(month1,currentYear.toString());
    let enddate = day2.concat(month2,secondYear.toString());

    beforeEach(function(){
      driver = new Builder().withCapabilities(
        Capabilities.chrome()).build();
      driver.get('http://127.0.0.1:3000/');
    });
  
    
    describe('fill all form fields', function() {
      it('function should terminate without error', async function() {
  
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
  } catch(error){

    console.error(error);
    console.log("It has failed")
  }

}

