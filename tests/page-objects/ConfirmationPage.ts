import { expect, type Page, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ConfirmationPage extends BasePage {
  heading: Locator;

  constructor(page: Page) {
    super(page, "Confirmation page");
    this.heading = page.getByRole("heading", { level: 1 });
  }

  async verifyPage() {
    await this.verifyPhaseBannerIsPresent();
    await expect(this.heading).toContainText("Application complete");
    return this;
  }
}
