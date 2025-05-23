export function textformat(template, ...templateParams) {
    let processedTemplate = template;
    for (let i = 0, len = templateParams.length; i < len; i++) {
        processedTemplate = processedTemplate.replace(new RegExp('\\{' + (+i + 1) + '\\}', 'g'), templateParams[i]);
    }
    return processedTemplate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZvcm1hdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNoNS1jb3JlL3V0aWxpdHktZnVuY3Rpb25zL3RleHRmb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JBLE1BQU0sVUFBVSxVQUFVLENBQUMsUUFBZ0IsRUFBRSxHQUFHLGNBQXFCO0lBQ2pFLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0lBRWpDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdkQsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMvRztJQUVELE9BQU8saUJBQWlCLENBQUM7QUFDN0IsQ0FBQyJ9