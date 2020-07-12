export const generateResx = (name: string, translate: string): string => {
    let build = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
    build += "<root>\n"
    build += `<data name="${name}" xml:space="preserve">\n`
    build += `<value>${translate}</value>\n`
    build += "</data>\n"
    build += "</root>\n"
    return build;
};

