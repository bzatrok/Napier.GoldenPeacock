//https://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
//https://gist.github.com/cuibonobo/03e295658dce159cac1ea30ea6819043

function TemplateEngine(tpl, data) {
    var re = /<%([^%>]+)?%>/g,
        code = 'var r=[];\n',
        cursor = 0, match;
    var add = function(line, js) {
        js? code += 'r.push(' + line + ');\n' :
            code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
    }
    var match;
    while(match = re.exec(tpl)) {
        add(tpl.slice(cursor, match.index));
        add(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}