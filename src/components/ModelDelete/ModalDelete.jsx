import React from 'react'
import styles from './style.module.scss'

const ModalDelete = ({ onChange }) => {
    return (
        <div className={styles.main}>
            <div id="order_modal" className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => onChange(false)}></button>
                    <div className="modal-body">

                        <form action="" method="get">
                            <div className="form_info text-center">
                                <div className="form_title">Удалить чат ?</div>
                                <div className="form_description">
                                    Этот элемент будет удалён <br /> <span>Вы точно этого хотите?</span>
                                </div>
                            </div>
                            <div className="form_action">
                                <button type="button" className="del_cancel_btn" data-bs-dismiss="modal" onClick={() => onChange(false)}>Отмена</button>
                                <button type="button" onClick={() => onChange(true)}>Удалить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal__fade1">

            </div>
        </div>
    )
}

export default ModalDelete