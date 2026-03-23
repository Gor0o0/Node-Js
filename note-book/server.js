// -=-=-=-=| Сервер |=-=-=-=- //


// -=-= Модули | Node =-=- //
const http = require("http");
const fs = require("fs").promises;    // fs (fileSystem) - аналог библиотеки OC
const path = require("path");        // path - нужен чтоб обращаться по путям

// -=-= Модули | Наши =-=- //
const fileManager = require("./utils/fileManager");
const helper = require("./utils/helper");


let notes = fileManager.loadData();

// -= API | обработка запросов
const server = http.createServer(async (req, res) => {
    const { url, method } = req;

    // -= Root Routers
    if (url === '/' && method === 'GET') {    //> т.е. что если пользователь просто постучался к нам в сайт
        const html = await fs.readFile(path.join(__dirname, "public/index.html"), "utf-8");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
        return;
    }
    if (url === '/api/app.js' && method === 'GET') {
        const js = await fs.readFile(path.join(__dirname, "api/app.js"), "utf-8");
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(js);
        return;
    }

    // -= API Routers
    if (url === "/api/notes" && method === 'GET') {
        res.writeHead(200, { 'Content-Type': "application/json" });
        res.end(JSON.stringify(notes));
        return;
    }

    if (url === "/api/notes" && method === 'POST') {
        let body = "";
        req.on("data", (chunk) => body += chunk); //> req что-то получаем а потом res сохраняем
        req.on("end", async() => {
            const {title, content} = JSON.parse(body);
            const newNote = {
                id: notes.length + 1, // костыльно
                title: title,
                content: content,
                date: helper.formatDate()
            };
            notes.push(newNote) //> push как в git - сохранить
            fileManager.saveData(notes)
            res.writeHead(200, { 'Content-Type': "application/json" });
            res.end(JSON.stringify({ success: true }));
            return;
        });
        alert(`Note `) ///////////
      
    }

    return;
});

server.listen(3000, () => {
    console.log("Server started: http://localhost:3000")
})