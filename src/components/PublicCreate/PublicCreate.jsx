import React from 'react'


const PublicCreate = () => {
    return (
        <div>

            <div className="public_block show" id="public_create">
                <form className="public_create_form">
                    <label for="name">
                        Название
                        <input type="text" name="name" id="name" placeholder="Пример: Перевод текста" />
                    </label>

                    <label for="description" className="description desc">
                        Описание
                        <input type="text" name="description" id="description"
                            placeholder="Пример: Переведёт текст на указанный язык" />
                    </label>

                    <label for="description" className="description mob">
                        Описание
                        <input type="text" name="name" id="name" placeholder="Пример: Перевод текста" />
                    </label>

                    <label for="template_content">
                        Содержимое шаблона
                        <textarea name="template_content" id="template_content" cols="30" rows="5"
                            placeholder="Пример: Переведи [TEXT2] язык следующий текст: [TEXT ]"></textarea>
                    </label>
                    <p className="tmp_b_description">Подробно о том, как составлять шаблон, можно прочитать <a
                        href="#"> в этой инструкции</a></p>

                    <label className="input_fields" for="input_fields">
                        Поля ввода
                        <input type="text" name="input_fields" id="input_fields"
                            placeholder="Пример: Перевод текста" />
                    </label>

                    <button type="submit" className="public_create_btn">Сохранить</button>
                </form>

            </div>
        </div>
    )
}

export default PublicCreate