import { Logger } from '../logger/index';
export function getLogger(appender, overrideGlobalConsole, logFilter) {
    const logger = Logger.getInstance(appender, logFilter);
    appender.configObserver(logger, !!logFilter);
    if (overrideGlobalConsole) {
        console.log = logger.log;
        console.error = logger.error;
        console.info = logger.info;
        console.warn = logger.warn;
    }
    return logger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY2g1LWxvZ2dlci91dGlsaXR5L2dldExvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFJekMsTUFBTSxVQUFVLFNBQVMsQ0FBQyxRQUEwQixFQUFFLHFCQUErQixFQUFFLFNBQTZCO0lBRWxILE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZELFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUc3QyxJQUFJLHFCQUFxQixFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN6QixPQUFPLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDN0IsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztLQUM5QjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMifQ==