// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.
// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.
// Реализуйте геттер allBooks, который возвращает текущий список книг.
// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.
// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.
// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.
// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

class Library {
    #books = [];
    constructor(books = []) {
        let set = new Set(books);
        if (set.size !== books.length) {
            throw new Error('Наша библиотека не нуждается в дубликатах');
        }
        this.#books = books;
    }
    get allBooks() {
        let list = '';
        this.#books.forEach(book => {
            list += book + '\n\r';
        });
        return list;
    }
    addBook(title) {
        let flag = false;
        this.#books.forEach(book => {
            if (book === title) {
                flag = true;
                throw new Error('Наша библиотека не нуждается в дубликатах');
            }
        });
        if (!flag) {
            this.#books.push(title);
        }
    }
    removeBook(title) {
        let flag = false;
        this.#books.forEach((value, index) => {
            if (value === title) {
                flag = true;
                delete this.#books[index];
                return `Книга ${title} успешно удалена`;
            }
        });
        if (!flag) {
            throw new Error("Книги с таким названием нет в списке");
        }
    }
    hasBook(title) {
        let flag = false;
        this.#books.forEach(book => {
            if (book === title) {
                flag = true;
            }
        });
        return flag;
    }
}

let lib = new Library;

lib.addBook("Война и мир");
lib.addBook("Преступление и наказание");
lib.addBook("Бездна");
lib.addBook("Амазония");
lib.addBook("Айсберг");
lib.addBook("Ключ судного дня");

console.log(lib.allBooks);
lib.removeBook("Айсберг");
console.log(lib.allBooks);
console.log(lib.hasBook("Айсберг")); 
console.log(lib.hasBook("Бездна"));