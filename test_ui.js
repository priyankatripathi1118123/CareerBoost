const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log("Navigating to http://localhost:5173");
    await page.goto('http://localhost:5173');
    
    // Check if we are on login page (it should say "PrepAI Sign In")
    const title = await page.locator('h2').innerText();
    console.log("Page title:", title);
    
    if (title === 'PrepAI Sign In') {
      console.log("On Login page. Clicking Sign Up...");
      await page.click('text=Sign Up');
      
      const signupTitle = await page.locator('h2').innerText();
      console.log("Signup title:", signupTitle);
      
      console.log("Filling signup form...");
      await page.fill('input[type="text"]', 'E2E Test User');
      await page.fill('input[type="email"]', 'e2e' + Date.now() + '@test.com');
      await page.fill('input[type="password"]', 'password123');
      
      console.log("Submitting form...");
      await page.click('button[type="submit"]');
      
      // Wait for navigation or change
      await page.waitForTimeout(2000);
      
      const afterSubmitTitle = await page.locator('h2').innerText();
      console.log("After submit title:", afterSubmitTitle);
      
      if (afterSubmitTitle === 'PrepAI Sign In') {
        console.log("SUCCESS: Redirected to Sign In page.");
      } else {
        console.log("FAILED: Did not redirect to Sign In page.");
      }
    } else {
      console.log("Not on Login page, maybe already logged in?");
      await page.click('text=Sign Out');
    }
  } catch (err) {
    console.error("Error during UI test:", err);
  } finally {
    await browser.close();
  }
})();
