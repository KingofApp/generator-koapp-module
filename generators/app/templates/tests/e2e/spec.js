describe('openweathermap controller', function(){
  beforeEach(function() {
    browser.driver.manage().window().setSize(400, 666);
    browser.get('http://localhost:8080/#/menu-abcd/<%- moduleName %>');
  });

  it('should load module', function() {
    expect(element(by.css('.<%= varModuleName %>'))).toBeDefined();
  });

  it('should load the greeting text', function(){
    expect(element(by.id('hi'))).toBeDefined();
  });

  it('should display the right translation for the greeting text', function() {
    element(by.id('hi')).getText().then(function(text){
      var hiOptions = ["Hello World!", "Hola Mundo!"];
      expect(hiOptions).toContain(text);
    });
  });
});
