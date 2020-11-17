import {panelRegistry} from "@furo/route/src/lib/panelRegistry.js";

// import panels

import "./person/person-person-update-panel.js"
import "./task/task-task-update-panel.js"

// -- register panels

panelRegistry.registerType("person.PersonEntity", {
     "edit" : "person-person-update-panel"
 });

panelRegistry.registerType("task.TaskEntity", {
     "edit" : "task-task-update-panel"
 });

