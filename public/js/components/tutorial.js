(function(app){

    app.define("plugins.tutorial.podbor");

    app.plugins.tutorial.podbor = [
        function(){
            return {
                figure: "square",
                target: "section-packages-select",
                position: "down",
                padding: 20,
                title: "Выбор готовых наборов",
                text: 'Вы можете выбрать готовые наборы компонентов. Все наборы прошли тщательный отбор и сохраняют отличный баланс между ценой и предложением.'
            }
        },
        function(){
            return {
                figure: "square",
                target: "product-item[data-product='ledribbon']",
                position: "right",
                padding: 10,
                title: "Светодиодная лента",
                text: 'Мы вам предлагаем пройти обзор по интерфейсу. Это займет не более одной минуты. Перед вами один из трех и основной компонент набора, светодиодная лента. Фото, описание, класс и указание цены за метр. Чтобы перейти на следующий шаг нажмите "Далее".'
            }
        },
        function(){
            return {
                figure: "circle",
                target: "product-item[data-product='ledribbon'] .product__select",
                position: "right",
                padding: 20,
                title: "Открыть предложения",
                text: "Открываем предложения светодиодных лент. Мы подготовили для вас несколько вариантов для каждого из компонентов. Сейчас ваши действия не активны, но после прохождения обзора вы сможете все выбрать."
            }
        },
        function(){
            return {
                figure: "square",
                target: "product-item[data-product='power']",
                position: "left",
                padding: 30,
                actions: {
                    toggle: function($target){
                        $Product.ledribbon.tags["products-list"].toggle();
                    }
                },
                title: "Предложения",
                text: 'Предложения поделены на группы: "LUX", "Норма" и "Эконом". Вы можете выбрать любое предложение ориентируясь на свой бюджет. На самом деле вариантов гораздо больше, вы сможете настроить требуемые параметры и предложения сразу адаптируются под ваши требования.'
            }
        },
        function(){
            return {
                figure: "circle",
                target: "product-item[data-product='power'] .connect__control",
                position: "left",
                padding: 30,
                activeZone: true,
                title: "Управление освещением",
                text: "Если вам не требуется управлять своим будущим освещением, просто нажмите на эту кнопку."
            }
        },
        function(){
            return {
                figure: "square",
                target: "control-light",
                position: "right",
                width: 380,
                height: 170,
                offset: {
                    top: -67
                },
                actions: {
                    toggle: function($target){
                        $Control.light.toggle();
                    }
                },
                title: "Тип освещенности",
                text: 'Варианты освещенности вашей подстветки, это: "монохромная", "мультицветная" или "бегущий огонь".'
            }
        },
        function(){
            return {
                figure: "square",
                target: "control-length",
                position: "right",
                width: 400,
                height: 170,
                offset: {
                    top: -67
                },
                actions: {
                    toggle: function($target){
                        $Control.length.toggle();
                    }
                },
                title: "Длина ленты",
                text: "Один из наиболее важных параметров. Измерьте требуемую длину для светодиодной ленты. Изменив, длину вы получите новые предложения по всем компонентам, максимально отвечающим вашим новым требованиям."
            }
        },
        function(){
            return {
                figure: "square",
                target: "control-color",
                position: "right",
                width: 620,
                height: 170,
                offset: {
                    top: -67
                },
                actions: {
                    toggle: function($target){
                        $Control.color.toggle();
                    }
                },
                title: "Цвет освещения",
                text: "Вы можете выбрать нужный вам цвет вашего освещения."
            }
        },             
        function(){
            return {
                figure: "square",
                target: "control-humidity",
                position: "right",
                width: 380,
                height: 170,
                offset: {
                    top: -67
                },
                actions: {
                    toggle: function($target){
                        $Control.humidity.toggle();
                    }
                },
                title: "Влагозащищенность",
                text: "Выбор влагозащищенности ваших компонентов от брызгов воды или попадания под струю воды."
            }
        },
        function(){
            return {
                figure: "square",
                target: ".section__control .total",
                position: "right",
                padding: 20,
                title: "Итоговая цена",
                text: "Итоговая цена за весь выбранный комплект."
            }
        },
        function(){
            return {
                figure: "circle",
                target: ".control .button__ok",
                position: "right",
                padding: 15,
                title: 'Кнопка "Все ОК!"',
                text: "После того, как вы закончите свой выбор, нажмите на эту кнопку, чтобы отправить предзаказ и связаться с нашим менеджером для дальнейшей консультации.\n Приятного Вам освещения!"
            }
        },
        function(){
            return {
                figure: "circle",
                target: "section-menu .menu__item[data-item='email']",
                position: "left",
                title: "Отправить расчет",
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
        },
        function(){
            return {
                figure: "circle",
                target: "section-menu .menu__item[data-item='order']",
                position: "left",
                title: "Отправить предзаказ",
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
        },
        function(){
            return {
                figure: "circle",
                target: "section-menu .menu__item[data-item='payment']",
                position: "left",
                title: "Оплатить заказ",
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
        },
        function(){
            return {
                figure: "circle",
                target: "section-menu .menu__item[data-item='callback']",
                position: "left",
                title: "Заказать звонок",
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
        }
        // function(){
        //     return {
        //         figure: "circle",
        //         target: "section-menu .menu__item[data-item='votes']",
        //         position: "left",
        //         title: "Оценить сервис",
        //         text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        //     }
        // }
    ];

})(app);
