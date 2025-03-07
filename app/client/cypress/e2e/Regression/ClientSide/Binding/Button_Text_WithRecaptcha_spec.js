const testdata = require("../../../../fixtures/testdata.json");
import * as _ from "../../../../support/Objects/ObjectsCore";

describe(
  "excludeForAirgap",
  "Binding the Button widget with Text widget using Recpatcha v3",
  function () {
    before(() => {
      _.agHelper.AddDsl("buttonRecaptchaDsl");
    });

    it("1. Validate the Button binding with Text Widget with Recaptcha token with empty key", function () {
      _.agHelper.ClickButton("Submit");
      _.agHelper
        .GetText(_.locators._widgetInCanvas("textwidget") + " span")
        .should("be.empty");
      _.entityExplorer.SelectEntityByName("Button1");
      _.agHelper.SelectDropdownList("Google reCAPTCHA version", "reCAPTCHA v2");
      _.agHelper.ClickButton("Submit");
      _.agHelper
        .GetText(_.locators._widgetInCanvas("textwidget") + " span")
        .should("be.empty");
      _.agHelper.SelectDropdownList("Google reCAPTCHA version", "reCAPTCHA v3");
    });

    it("2. Validate the Button binding with Text Widget with Recaptcha Token with v2Key & upward compatibilty doesnt work", function () {
      _.entityExplorer.SelectEntityByName("Button1");
      _.propPane.UpdatePropertyFieldValue(
        "Google reCAPTCHA key",
        testdata.v2Key,
      );
      _.agHelper.ClickButton("Submit");
      _.agHelper.Sleep();
      _.agHelper
        .GetText(_.locators._widgetInCanvas("textwidget") + " span")
        .should("be.empty");
      _.entityExplorer.SelectEntityByName("Button1");
      _.agHelper.SelectDropdownList("Google reCAPTCHA version", "reCAPTCHA v2");
      _.agHelper.ClickButton("Submit");
      _.agHelper.Sleep();
      _.agHelper
        .GetText(_.locators._widgetInCanvas("textwidget") + " span")
        .should("not.be.empty");
      _.agHelper.SelectDropdownList("Google reCAPTCHA version", "reCAPTCHA v3");
      _.agHelper.ClickButton("Submit");
      _.agHelper.Sleep();
    });

    it("3. Validate the Button binding with Text Widget with Recaptcha Token with v3Key & v2key for backward compatible", function () {
      _.entityExplorer.SelectEntityByName("Button1");
      _.propPane.UpdatePropertyFieldValue(
        "Google reCAPTCHA key",
        testdata.v3Key,
      );
      _.agHelper.SelectDropdownList("Google reCAPTCHA version", "reCAPTCHA v3");
      _.agHelper.ClickButton("Submit");
      _.agHelper.Sleep();
      cy.get("body").then(($ele) => {
        if (
          $ele.find(
            _.locators._specificToast(
              "Google Re-Captcha token generation failed!",
            ),
          ).length ||
          $ele
            .find(_.locators._widgetInCanvas("textwidget") + " span")
            .text() == ""
        ) {
          _.agHelper.ClickButton("Submit");
        }
      });
      _.agHelper
        .GetText(_.locators._widgetInCanvas("textwidget") + " span")
        .should("not.be.empty");
      _.entityExplorer.SelectEntityByName("Button1");
      _.agHelper.SelectDropdownList("Google reCAPTCHA version", "reCAPTCHA v2");
      _.agHelper.ClickButton("Submit");
      _.agHelper.AssertContains("Google Re-Captcha token generation failed!");
    });

    it("4. Validate the Button binding with Text Widget with Recaptcha Token with invalid key (after using valid key)", function () {
      _.propPane.DeleteWidgetFromPropertyPane("Text1");
      _.entityExplorer.SelectEntityByName("Button1");
      _.propPane.UpdatePropertyFieldValue(
        "Google reCAPTCHA key",
        testdata.invalidKey,
      );
      _.agHelper.ClickButton("Submit"); //for version 3
      _.agHelper.WaitUntilToastDisappear(testdata.errorMsg);
      _.entityExplorer.SelectEntityByName("Button1");
      _.agHelper.SelectDropdownList("Google reCAPTCHA version", "reCAPTCHA v2");
      _.agHelper.ClickButton("Submit");
      _.agHelper.WaitUntilToastDisappear(testdata.errorMsg);
    });
  },
);
