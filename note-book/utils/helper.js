// -=-=-=-= Дополнительный штуки =-=-=-=-

const reindexIds = () => {      //> функция рефакторинга
    return notes.map((note, index) => ({ ...note, id: index +1}) )
};

const formatDate = (format_date = new Date) => {
    return format_date.toLocaleDateString();
};

module.exports = {reindexIds, formatDate}   //> открывае для глобального использования