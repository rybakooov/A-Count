//! PRICE PAGE
$(document).ready( function(){

    const onlyMoscow = ['Доставка документов', 'РКО онлайн'];

    $(document).on('click', '.PriceHead-Tabs__Tab:not(.PriceHead-Tabs__Tab_active)', function (){
        $('.PriceHead-Tabs__Tab_active').removeClass('PriceHead-Tabs__Tab_active');
        $(this).addClass('PriceHead-Tabs__Tab_active');

        $('.PriceTable-Aside__El_hide').each(function (){
            $(this).removeClass('PriceTable-Aside__El_hide');
        })
        $('.PriceTable-Content-Row_hide').each(function (){
            $(this).removeClass('PriceTable-Content-Row_hide');
        })
        if($(this).html() !== 'Москва и МО'){
            for(let str in onlyMoscow){
                console.log(onlyMoscow[str])
                //let index = $(`.PriceTable-Aside__El:contains(${onlyMoscow[str]})`).index() + 1;
                $(`.PriceTable-Aside__El:contains(${onlyMoscow[str]})`).addClass('PriceTable-Aside__El_hide')
                $(`.PriceTable-Content-Row[data-contentrow="${onlyMoscow[str]}"]`).addClass('PriceTable-Content-Row_hide');
            }
        }
    })

    const all = {
        titleList: ['Старт', 'Комфорт', 'Развитие', 'Стабильность', 'Надёжность', 'Перспектива'],
        tables: [{
            title: 'Цена',
            rows: {
                'Цена для Москвы и МО': ['10 000 ₽', '16 500 ₽', '24 000 ₽', '38 500 ₽', '58 000 ₽', '77 000 ₽'],
                'Цена для Республики Крым': ['5 000 ₽', '8 500 ₽', '12 000 ₽', '20 000 ₽', '58 000 ₽', '29 000 ₽'],
            }
        },{
            title: 'Услуги',
            rows: {
                'Ведение бухгалтерского учета': [true, true, true, true, true, true],
                'Ведение налогового учета': [true, true, true, true, true, true],
                'Обработка документации онлайн': ['До 30', 'До 50', 'До 80', 'До 150', 'До 300', '∞'],
                'Расчет заработной платы': ['3+', '5+', '10+', '20+', '30+', '40+'],
                'Аккаунт-менеджер': ['Дежурный', 'Выделенный', 'Персональный', 'Персональный', 'Персональный', 'Персональный'],
                'Представительство в ИФНС, ПФР, ФСС': [true, true, true, true, true, true],
                'Доставка документов': ['3', '5', '5', '7', '10', '∞'],
                'Личный кабинет': [true, true, true, true, true, true],
                'РКО онлайн': [true, true, true, true, true, true]
            }
        },{
            title: 'Консультация и поддержка',
            rows: {
                'Налоговый консалтинг': ['3', '5', '8', '10', '12', '12'],
                'Консультации по налогообложению': ['3', '5', '8', '10', '12', '12'],
                'Общеэкономический консалтинг': ['3', '5', '8', '10', '12', '12'],
                'Управленческий анализ': ['—', '—', '5', '5', '7', '7'],
                'Аудиторская поддержка': ['—', '—', '—', true, true, true],
                'Оценочный анализ': ['—', '—', '—', true, true, true],
            }
        }]
    };


    const SVG = '<svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.36364L4.75 9L13 1" stroke="#00BDAA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';


    const entryEl = $('.PriceTable .container');

    function CreateTable(_data){
        for(let TABLE in _data.tables){
            entryEl.append(`<div class="PriceTable-Item" data-table="${TABLE}">
                                <Aside class="PriceTable-Aside">
                                    <p class="PriceTable-Aside__Head">${_data.tables[TABLE].title}</p>
                                </Aside>
                                <section class="PriceTable-Content">
                                    <div class="PriceTable-Content-HeadRow"></div>
                                </section>
                            </div>`);
            let asideEl = $(`.PriceTable-Item[data-table="${TABLE}"] .PriceTable-Aside`);
            let contentEl = $(`.PriceTable-Item[data-table="${TABLE}"] .PriceTable-Content`);
            if(TABLE == 0){
            }
            for(let RowTitle in _data.tables[TABLE].rows){

                asideEl.append(`<p class="PriceTable-Aside__El">${RowTitle}</p>`);
                contentEl.append(`<div class="PriceTable-Content-Row" data-contentRow="${RowTitle}"></div>`);
                let contentRowEl = contentEl.find(`.PriceTable-Content-Row[data-contentRow="${RowTitle}"]`);
                for (let contentItem in _data.tables[TABLE].rows[RowTitle]) {

                    if(_data.tables[TABLE].rows[RowTitle][contentItem] == true){
                        contentRowEl.append(`<p class="PriceTable-Content-Row__El">${SVG}</p>`);
                    } else {
                        contentRowEl.append(`<p class="PriceTable-Content-Row__El">${_data.tables[TABLE].rows[RowTitle][contentItem]}</p>`);
                    }
                }
            }
        }

        entryEl.prepend(`<div class="PriceTable-Heading"><div class="PriceTable-Heading-Right"></div></div>`)
        for(let HeadingTitles in _data.titleList){
            entryEl.find('.PriceTable-Heading-Right').append(`<p class="PriceTable-Heading-Right__El">${_data.titleList[HeadingTitles]}</p>`);
        }
    }

    CreateTable(all);
});
//! PRICE PAGE END
