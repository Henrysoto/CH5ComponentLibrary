export class Ch5Config {
    static loadConfig(newConfig) {
        const preparedConfig = this._defaultConfig;
        if (newConfig.hasOwnProperty('attributes')) {
            if (newConfig.attributes.hasOwnProperty('id')) {
                preparedConfig.attributes.id = newConfig.attributes.id;
            }
            if (newConfig.attributes.hasOwnProperty('component')) {
                preparedConfig.attributes.component = newConfig.attributes.component;
            }
        }
        if (newConfig.hasOwnProperty('templatevariables')) {
            if (newConfig.templatevariables.hasOwnProperty('id')) {
                preparedConfig.templatevariables.id = newConfig.templatevariables.id;
            }
        }
        Ch5Config._config = preparedConfig;
    }
    static setAttributeForId(elementId, attributeName, attributeValue) {
        if (!Ch5Config._config.attributes.id.hasOwnProperty(elementId)) {
            Ch5Config._config.attributes.id[elementId] = {};
        }
        Ch5Config._config.attributes.id[elementId][attributeName.toLowerCase()] = attributeValue;
    }
    static setAttributeForComponent(componentName, attributeName, attributeValue) {
        const lcCompName = componentName.toLowerCase();
        if (!Ch5Config._config.attributes.component.hasOwnProperty(lcCompName)) {
            Ch5Config._config.attributes.component[lcCompName] = {};
        }
        Ch5Config._config.attributes.component[lcCompName][attributeName.toLowerCase()] = attributeValue;
    }
    static setTemplateVarsForId(elementId, tempVarsItems) {
        if (!Ch5Config._config.templatevariables.id.hasOwnProperty(elementId)) {
            Ch5Config._config.templatevariables.id[elementId] = [];
        }
        Ch5Config._config.templatevariables.id[elementId] = tempVarsItems;
    }
    static getConfig() {
        return Ch5Config._config;
    }
    static getAttributesForId(elementId) {
        const idAttrs = Ch5Config._config.attributes.id;
        if (idAttrs.hasOwnProperty(elementId)) {
            return idAttrs[elementId];
        }
        return {};
    }
    static getAttributesForComponent(componentName) {
        const attrs = Ch5Config._config.attributes.component;
        componentName = componentName.toLowerCase();
        if (attrs.hasOwnProperty(componentName)) {
            return attrs[componentName];
        }
        return {};
    }
    static getAttributesForElement(cr) {
        let idAttrs = {};
        const componentName = cr.tagName.toLowerCase();
        const componentAttrs = Ch5Config.getAttributesForComponent(componentName);
        if (cr.hasAttribute('id')) {
            const elId = cr.getAttribute('id');
            if (null !== elId) {
                idAttrs = Ch5Config.getAttributesForId(elId);
            }
        }
        const attrs = Object.assign(Object.assign({}, componentAttrs), idAttrs);
        return attrs;
    }
    static getTemplateVarsForElementById(elementId) {
        const tplVars = Ch5Config._config.templatevariables.id;
        if (tplVars.hasOwnProperty(elementId)) {
            return tplVars[elementId];
        }
        return [];
    }
    static getTemplateVarsForElement(cr) {
        let tplVars = [];
        if (cr.hasAttribute('id')) {
            const elId = cr.getAttribute('id');
            if (null !== elId) {
                tplVars = Ch5Config.getTemplateVarsForElementById(elId);
            }
        }
        return tplVars;
    }
}
Ch5Config._defaultConfig = {
    "attributes": {
        "id": {},
        "component": {}
    },
    "templatevariables": {
        "id": {}
    }
};
Ch5Config._config = Ch5Config._defaultConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2g1LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb21tb24vY2g1LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQ0EsTUFBTSxPQUFPLFNBQVM7SUFrQlgsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFxQjtRQUMxQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBRTNDLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN4QyxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMzQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQzthQUMxRDtZQUNELElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ2xELGNBQWMsQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2FBQ3hFO1NBQ0o7UUFDRCxJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUMvQyxJQUFJLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xELGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQzthQUN4RTtTQUNKO1FBRUQsU0FBUyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7SUFDdkMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFpQixFQUFFLGFBQXFCLEVBQUUsY0FBc0I7UUFDNUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDNUQsU0FB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