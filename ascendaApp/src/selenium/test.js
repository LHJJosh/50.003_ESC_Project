require("chromedriver");
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert');

// describe(name_of_test_group, callback)
describe('IndexArray', function() {
  describe('#checkIndex negative()', function() {
    // individual mocha test case
    // it(description, callback) 
    it('the function should return -1 when the value is not present', function(){
      assert.equal(-1, [4,5,6].indexOf(7));
    });
  });

  describe('#checkIndex positive()', function() {
    it('the function should return 0 when the value is present', function(){
      assert.equal(0, [8,9,10].indexOf(8));
    });
  });

  describe('#check generated text', function() {
    it('the function should return something', async function() {
      //open Chrome browser
      let driver = await new Builder().forBrowser("chrome").build();

      try {
        //open the website
        await driver.get("https://victoria-lo.github.io/bulletin-board/");

        //find the search box and enter a note
        await driver
          .findElement(By.xpath('//*[@id="new-item"]/input'))
          .sendKeys("Hello Selenium", Key.RETURN);

        //get the note's text
        let note = await driver
          .findElement(By.xpath('//*[@id="items"]/div/p'))
          .getText();

        //assert that the note's text is the same as the input text "Hello Selenium"    
        assert.equal(note, "Hello Selenium");
        console.log("TEST PASSED");
      } finally {
        //close the browser
        await driver.quit();
      }
    });
  });
});