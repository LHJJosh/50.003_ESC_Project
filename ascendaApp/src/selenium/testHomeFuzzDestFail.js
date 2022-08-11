require('chromedriver');
const { Builder, By, Key, Capabilities} = require('selenium-webdriver');
const assert = require('assert');

NUM_ATTEMPTS = 20;
THRESHOLD = 0.2;
API_CALL_WAIT = 200;

function getRandomValidStr(minlength) {
  length = Math.random() * 5 + minlength;
  let result           = '';
  let characters       = '1234567890!@#$%^&*()';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

describe('Home Actions', function() {
  this.timeout(100000);
  var driver;
  
  beforeEach(function(){
    driver = new Builder().withCapabilities(
      Capabilities.chrome()).build();
    driver.get('http://127.0.0.1:3000/');
  });

  
  describe('fuzz invalid destinations', function() {
    it('function should terminate without error', async function() {

      let failCount = 0;
      let testCount = 0;
      let value = '';
      
      let destBox = await driver.findElement(By.xpath('//*[@id="destination"]'));
      for(let i = 0; i < NUM_ATTEMPTS; i++){
        await destBox.sendKeys(getRandomValidStr(2));
        await driver.sleep(API_CALL_WAIT);
        await destBox.sendKeys(Key.TAB);
        value = await destBox.getAttribute('value');
        if (value === '') {
          failCount ++;
        }
        await destBox.sendKeys(Key.CONTROL + "a");
        await destBox.sendKeys(Key.DELETE);
        testCount ++;
      }
      
      // console.log(`Success rate: ${(testCount - failCount)}/${testCount}`);
      assert(failCount / testCount > THRESHOLD);
    });
  });
  

  afterEach(function() {
    driver.quit();
  })
});
