/* eslint-disable security/detect-object-injection */
// externals
import React from "react";

// storybook
import { storiesOf } from "@storybook/react";

// components
import { AppIcon, CancelIcon, DragIcon, DoneIcon, EditIcon } from "@atoll/shared";
import { SingleIconContainer, SideBySideIconContainers } from "../../common";

// common
import "../../storybook";

const invertibleIcons = {
    AppIcon,
    DragIcon
};

const icons = {
    ...invertibleIcons,
    CancelIcon,
    DoneIcon,
    EditIcon
};

const iconNames = ["AppIcon", "CancelIcon", "DragIcon", "DoneIcon", "EditIcon"];

const getComponent = (iconName: string, isInverted: boolean) => {
    const icon = icons[iconName];
    if (isInverted) {
        return React.createElement(icon, { invertColors: true }, null);
    }
    return React.createElement(icon, null, null);
};

const isInvertibleIcon = (iconName) => {
    return !!invertibleIcons[iconName];
};

iconNames.forEach((iconName) => {
    const icon = getComponent(iconName, false);
    if (isInvertibleIcon(iconName)) {
        const invertedIcon = getComponent(iconName, true);
        storiesOf("Atoms|Icons", module).add(iconName, () => <SideBySideIconContainers icon={icon} invertedIcon={invertedIcon} />);
    } else {
        storiesOf("Atoms|Icons", module).add(iconName, () => <SingleIconContainer icon={icon} />);
    }
});
