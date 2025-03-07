import SnipeableComponent from "layoutSystems/common/snipeable/SnipeableComponent";
import { get } from "lodash";
import React from "react";
import { EVAL_ERROR_PATH } from "utils/DynamicBindingUtils";
import type { BaseWidgetProps } from "widgets/BaseWidgetHOC/withBaseWidgetHOC";
import { WidgetNameLayer } from "../../common/widgetName/WidgetNameLayer";
import { AutoLayoutWidgetComponent } from "../common/widgetComponent/AutoLayoutWidgetComponent";
import FlexComponent from "../common/FlexComponent";
import { FlexVerticalAlignment, LayoutDirection } from "../utils/constants";
import { AutoResizableLayer } from "../common/resizer/AutoResizableLayer";
import DraggableComponent from "layoutSystems/common/draggable/DraggableComponent";

/**
 * AutoLayoutEditorWidgetOnion
 *
 * Component that wraps the BaseWidget implementation of a Widget with Editor specific wrappers
 * needed in Auto Layout.
 *
 * Editor specific wrappers are wrappers added to perform actions in the editor.
 * - FlexComponent: provides dimensions of a widget in auto-layout layout system.
 * - SnipeableComponent: provides ability to snipe a widget(Makes sure the widget is focused on Hover and allows the widget to be snipped on clicking on it)
 * - DraggableComponent: provides DnD html apis to make the widget draggable.
 * - WidgetNameLayer: provides the widget name in editing mode and also show error state if there are any.
 * - AutoResizableLayer: provides the resize handles required to set dimension for a widget.
 * - AutoLayoutWidgetComponent: provides layer to auto update dimensions based on content/ add skeleton widget on loading state
 *
 * @returns Enhanced Widget
 */

export const AutoLayoutEditorWidgetOnion = (props: BaseWidgetProps) => {
  return (
    <FlexComponent
      alignment={props.alignment}
      componentHeight={props.componentHeight}
      componentWidth={props.componentWidth}
      direction={props.direction || LayoutDirection.Horizontal}
      flexVerticalAlignment={
        props.flexVerticalAlignment || FlexVerticalAlignment.Bottom
      }
      focused={props.focused}
      isMobile={props.isMobile || false}
      isResizeDisabled={props.resizeDisabled}
      parentColumnSpace={props.parentColumnSpace}
      parentId={props.parentId}
      renderMode={props.renderMode}
      responsiveBehavior={props.responsiveBehavior}
      selected={props.selected}
      widgetId={props.widgetId}
      widgetName={props.widgetName}
      widgetType={props.type}
    >
      <SnipeableComponent type={props.type} widgetId={props.widgetId}>
        <DraggableComponent
          bottomRow={props.bottomRow}
          isFlexChild
          leftColumn={props.leftColumn}
          parentColumnSpace={props.parentColumnSpace}
          parentId={props.parentId}
          parentRowSpace={props.parentRowSpace}
          resizeDisabled={props.resizeDisabled}
          rightColumn={props.rightColumn}
          topRow={props.topRow}
          type={props.type}
          widgetId={props.widgetId}
        >
          <WidgetNameLayer
            componentWidth={props.componentWidth}
            detachFromLayout={props.detachFromLayout}
            disablePropertyPane={props.disablePropertyPane}
            evalErrorsObj={get(props, EVAL_ERROR_PATH, {})}
            parentId={props.parentId}
            topRow={props.topRow}
            type={props.type}
            widgetId={props.widgetId}
            widgetName={props.widgetName}
          >
            <AutoResizableLayer {...props}>
              <AutoLayoutWidgetComponent {...props}>
                {props.children}
              </AutoLayoutWidgetComponent>
            </AutoResizableLayer>
          </WidgetNameLayer>
        </DraggableComponent>
      </SnipeableComponent>
    </FlexComponent>
  );
};
