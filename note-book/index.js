// -=-=-=-= Инициализация =-=-=-=-
const readline = require('readline');    //> Аналог импорта
const helper = require("./utils/helper");    //> Для персональных библиотек нужно указывать путь
const ConsoleDecorator = require("./utils/decorator");  //> с большой буквы чтоб отметить для себя что это класс    


const rl = readline.createInterface({   //> доставать производные | вытягивание методов из библиотеки
    input: process.stdin,
    output: process.stdout
});

const PROJ_NAME = "NODE-NOTE"
let welcome = `Hello it's |${PROJ_NAME}|`;    // let изменяемая

//! console.log(welcome)   //> Аналог принта

let notes = [];

// -=-=-=-= Функционал =-=-=-=-

const welcomeApp = () => {
    ConsoleDecorator.drawLine(50, 3);
    console.log(`Приветствуем в приложе ${PROJ_NAME}`)
    showMenu();
};

const addNode = () => {     //> Аналог fun для бэкэнда, function так же существует но не оч подходит | в fun кстати в конце не обязательно ставить ; т.к. это уже замкнутый участок кода
    rl.question("Enter new note name: ",(title) => {    //> question - "мы хотим что-то спросить"
        rl.question("Enter description: ",(content) =>{
            const newNote = {
                id: notes.length +1, // костыльно
                //! id: new Date().toLocaleString(), // id = текущей дате, но слишком длинный

                title: title,
                content: content,
                date: helper.formatDate()
            }

            notes.push(newNote) //> push как в git - сохранить
            console.log(`Всего заметок ${notes.length}`);
            showMenu();
        })
    })   
}; 

const showNotes = () => {
    if(notes.length === 0){
        console.log("|Nothing Here|")
    }   // if не закрывается ";" она ставится только в случае return
    ConsoleDecorator.showAllFormatNotes(notes);
    showMenu();
};

const showMenu = () => {    //> "=>" подобие лямбды
    console.log(welcome);
    console.log(`|0-Exit|1-Add|2-Show|3-Delete|`)

    rl.question('Choice action | 1-3 or 0 to exit: ', (choice) => {
        switch(choice){     //> свичи для работы с чем-то конкретным, что-то типо is/when если верно понял
            case '1':
                addNode();
                break;
            case '2':
                showNotes();
                break;
            case '3':
                deleteNote();
                break;
            case '0':
                rl.close();      //> "закрытие вопроса"
                break;
            default:
                showMenu();
                break;
        }
    });
};

const deleteNote = () => {
    if(notes.length === 0){
        console.log("No Notes to delete");
        showMenu();
        return;
    }
    notes.forEach((note) => {
        console.log('>>> Your Notes <<<');
        console.log(`[${note.id}] * ${note.title}`);
    });
    rl.question('Enter id to delete (enter 0 to cancel): ', (choice) => {
        let num = parseInt(choice);

        if(num === 0){
            console.log("Cancel")
        }
        else if(num > 0 && num <= notes.length){     // && - и
            let del = notes.splice(num, -1)
            notes = helper.reindexIds(notes);
            console.log(`Note ${num} is deleted`)
        }
        else{
            console.log(`No notes with that name [${num}]`)
        }
        showMenu();
    });
}

welcomeApp();
