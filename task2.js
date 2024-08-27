// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.
// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.
// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.
// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

function addDataToLocalStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
}

function LastCommentId() {
    let getDataLS;
    if (localStorage.getItem('newData')) {
        getDataLS = JSON.parse(localStorage.getItem('newData'));
    }
    else {
        getDataLS = JSON.parse(localStorage.getItem('data'));
    }
    getDataLS.forEach(data => {
        for (let i = 0; i < data.reviews.length; i++) {
            let id = data.reviews[i].id;
            if (!localStorage.getItem('id')) {
                localStorage.setItem('id', id);
            }
            if (Number(id) > Number(localStorage.getItem('id'))) {
                localStorage.setItem('id', id);
            }
        }
    });
}

addDataToLocalStorage(initialData);
const divEl = document.querySelector('.task2');

initialData.forEach(item => {
    divEl.insertAdjacentHTML('beforeend', ` 
        <div class="product">
            <div class="block">
                <div class="block__product">
                    <h3 class="block__title">${item.product}</h3>
                </div>
                <button class="block__reviewBtn">Оставить отзыв</button>
            </div>
            <div class="review-block">
                <form action="" class="form d-none">
                    <textarea name="" class="form__text" cols="30"  rows="10" placeholder="Напишите отзыв"></textarea>
                    <button class="form__sendBtn" type="submit">Отправить   отзыв</button>
                </form>
                <div class="container" data-title="${item.product}"></div>
            </div>
            <div class="line"></div>
        </div>
     `)
}
)
LastCommentId();

function renderComments(data) {
    const containerEls = document.querySelectorAll('.container');
    let getDataLS = JSON.parse(localStorage.getItem(data));
    getDataLS.forEach(data => {
        containerEls.forEach(el => {
            for (let i = 0; i < data.reviews.length; i++) {
                const title = el.getAttribute("data-title");
                if (title == data.product) {
                    el.insertAdjacentHTML('beforeend', `
                <p class="postedText">${data.reviews[i].text}</p>
            `)
                }
            }
        })
    });
}

const reviewBtns = divEl.querySelectorAll('.block__reviewBtn');

reviewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const parentEl = btn.closest(".product")
        const formEl = parentEl.querySelector('.form');
        formEl.style.display = 'flex';
    });
});


function addComment() {
    divEl.addEventListener('click', ({ target }) => {
        let getDataLS;
        if (!target.classList.contains('form__sendBtn')) {
            return;
        }
        if (localStorage.getItem('newData')) {
            getDataLS = JSON.parse(localStorage.getItem('newData'));
        }
        else {
            getDataLS = JSON.parse(localStorage.getItem('data'));
        }

        const formEl = target.closest(".form")
        const textEl = formEl.querySelector('.form__text');
        try {
            const comment = textEl.value;
            if (comment == '') {
                alert("Вы не заполнили поле для отзыва");
                return;
            }
            if (comment.length < 50 || comment.length > 500) {
                throw new Error("Ошибка! Количество вводимых символов должно быть не менее 50  и не более 500")
            }
            const reviewBlockEl = target.closest(".review-block");
            const containerEl = reviewBlockEl.querySelector('.container');
            const title = containerEl.getAttribute("data-title");

            let oldCommentId = Number(localStorage.getItem("id"));

            let newComment = {
                id: oldCommentId + 1,
                text: comment
            }

            getDataLS.forEach(item => {
                if (title === item.product) {
                    item.reviews.push(newComment);
                }
            });
            localStorage.setItem('newData', JSON.stringify(getDataLS));
        } catch (error) {
            alert(error.message);
        }
    });

}
addComment();

if (localStorage.getItem('newData')) {
    renderComments('newData')
}
else {
    renderComments('data');
}

