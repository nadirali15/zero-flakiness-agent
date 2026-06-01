import { Page } from '@playwright/test';
import { Anthropic } from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';
dotenv.config();

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export class SmartPage {
  constructor(public page: Page) {}

  async smartClick(brittleSelector: string): Promise<void> {
    try {
      // Attempt standard interaction first
      await this.page.click(brittleSelector, { timeout: 4000 });
    } catch (error) {
      console.warn(`⚠️ [AI Agent] Selector failed: "${brittleSelector}". Invoking Claude self-healing...`);
      
      // Extract contextual DOM snapshot from active browser state
      const domSnapshot = await this.page.evaluate(() => document.body.innerHTML);

      // Query Claude for a resilient user-centric locator blueprint
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-latest',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: `The locator "${brittleSelector}" failed. Analyze this DOM snippet and return ONLY a valid, highly resilient Playwright locator string using user-facing attributes (e.g., page.getByRole('button', { name: 'Submit' })). Do not include markdown code blocks or explanations:\n\n${domSnapshot.slice(0, 6000)}`
        }]
      });

      const healedLocator = response.content[0].text.trim();
      console.log(`✅ [AI Agent] Healing successful! Executing: ${healedLocator}`);
      
      // Dynamically execute the healed locator string context
      await this.page.evaluate((locatorStr) => {
        eval(locatorStr).click();
      }, healedLocator);
    }
  }
}