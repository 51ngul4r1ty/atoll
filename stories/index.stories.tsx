import React from "react";

import { addDecorator, addParameters, storiesOf, forceReRender } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withRootAttribute } from "storybook-addon-root-attribute";

import { SimpleButton } from "@atoll/shared";
import { SimpleText } from "@atoll/shared";
import { HomeButton } from "@atoll/shared";
import { HamburgerIcon } from "@atoll/shared";
import { TabStrip } from "@atoll/shared";
import { BacklogItemCard, BacklogItemTypeEnum } from "@atoll/shared";

addDecorator(withRootAttribute);
addParameters({
    rootAttribute: {
        root: "html",
        attribute: "class",
        defaultState: {
            name: "Default",
            value: "theme-default"
        },
        states: [
            {
                name: "Dark",
                value: "theme-dark"
            }
        ]
    }
});

storiesOf("General", module).add("Font Sizes", () => (
    <div>
        <h1>Font Sizes</h1>
        <ul>
            <li>
                <SimpleText size="xsmall">Extra Small</SimpleText>
            </li>
            <li>
                <SimpleText size="small">Small</SimpleText>
            </li>
            <li>
                <SimpleText size="medium">Medium</SimpleText>
            </li>
            <li>
                <SimpleText size="large">Large</SimpleText>
            </li>
            <li>
                <SimpleText size="xlarge">Extra Large</SimpleText>
            </li>
        </ul>
    </div>
));

storiesOf("Buttons/HomeButton", module)
    .add("HomeButton (default)", () => <HomeButton onClick={action("clicked")} />)
    .add("HomeButton (hover)", () => <HomeButton forceStateHover onClick={action("clicked")} />)
    .add("HomeButton (active)", () => <HomeButton forceStateActive onClick={action("clicked")} />)
    .add("HomeButton (focus)", () => <HomeButton forceStateFocus onClick={action("clicked")} />);

storiesOf("Buttons/SimpleButton", module).add("SimpleButton", () => (
    <SimpleButton icon={<HamburgerIcon />} onClick={action("clicked")}>
        Menu
    </SimpleButton>
));

let activeTabId = "plan";

storiesOf("Tabs/TabStrip", module).add("TabStrip", () => (
    <div>
        <TabStrip
            activeTab={activeTabId}
            tabs={[
                { id: "plan", caption: "Plan" },
                { id: "sprint", caption: "Sprint" },
                { id: "review", caption: "Review" }
            ]}
            onChange={(tabId) => {
                activeTabId = tabId;
                console.log(`TAB CHANGE TO ${tabId}`);
                forceReRender();
            }}
        />
    </div>
));

storiesOf("Cards/BacklogItemCard", module)
    .add("BacklogItemCard (story)", () => (
        <div>
            <BacklogItemCard itemId="123" itemType={BacklogItemTypeEnum.Story} titleText="Example story" />
        </div>
    ))
    .add("BacklogItemCard (bug)", () => (
        <div>
            <BacklogItemCard itemId="456" itemType={BacklogItemTypeEnum.Bug} titleText="Example bug" />
        </div>
    ));
