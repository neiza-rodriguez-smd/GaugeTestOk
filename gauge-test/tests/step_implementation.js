/* globals gauge*/
"use strict";
const path = require('path');
const { openBrowser, write, closeBrowser, goto, click, press, $, into, screenshot, text, focus, textBox,  toRightOf } = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({ headless: headless })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
  const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'], 
    `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({ path: screenshotFilePath });
    return path.basename(screenshotFilePath);
};


step("Goto sharemedata page", async function() {
	await goto("https://beta.sharemedata.com/#/login",{timeout:60000});
});

step("Login", async function() {
    await write("neiza.rodriguez.cruz@gmail.com",into(textBox({id:"email"})));
    await write("ch3ng3m3",into(textBox({id:"password"})));
    await click("Entrar");
});

step("Choose patient", async function() {
	await click($("//span[@class='patients-link icon-address-book-o pointer']"));
    await click("Elija un paciente");
    await focus(textBox({placeholder:"Encuentre un paciente..."}));
    //await write("1Alejandra Aguirre");
    await write("Hubert Gutierrez");
    await press('Enter');    
});

step("Create Default Record", async function() {
	await focus(textBox({id:"new-record"}));
    await write("Record 1");
    await write("Aspirina",into(textBox({class:"form-control ng-valid ng-star-inserted ng-dirty ng-touched"})));
    await write("3",into(textBox({class:"form-control ng-untouched ng-pristine ng-valid ng-star-inserted"})));
    await write("Tomar cada día",into(textBox({class:"form-control ng-untouched ng-pristine ng-valid ng-star-inserted"})));
    await click($("//span[@id='record-option-save']"));
});

step("Discard Default Record", async function() {
	await focus(textBox({id:"new-record"}));
    await write("Record 1");
    await click($("//span[@id='record-option-cancel']"));
    await click("Descartar");
});